module WikiGraph exposing (WikiGraphState, update, subscription, init, view)

{-| A WikiGraph structure is kept to visualize the paths taken by the players.

The WikiGraph will draw a node-link diagram of the player paths where each edge
is colored with the players that traversed it.  The graph is given a force-directed layout
and is drawn with svg
-}

import Types exposing (..)
import Dict exposing (Dict)
import Set exposing (Set)
import List.Extra
import Random
import Helpers exposing (..)
import Force
import Browser.Events

import Color
import TypedSvg exposing (circle, g, line, svg, image)
import TypedSvg.Attributes exposing (class, fill, stroke, viewBox, transform, target, id)
import TypedSvg.Attributes.InPx exposing (cx, cy, r, strokeWidth, x1, x2, y1, y2, width, height)
import TypedSvg.Core exposing (Svg, text, attribute)
import TypedSvg.Types exposing (Paint(..), Transform(..))
import TypedSvg.Attributes

type alias NodeId =
    ( Title    -- title of this node's page
    , Title    -- title of the destination trying to be reached from this node
    -- if a player visits the same page in different legs during the game,
    -- we'll consider them different nodes
    -- note: if nodeId is (a,b) where a==b then it is a destination node
    )

type alias Node = Force.Entity NodeId { visitors : Set PeerId }

isDestinationNode : Node -> Bool
isDestinationNode {id} = let (title, goal) = id in title == goal 

-- edges are keyed by their source and target nodes
type alias EdgeId = (NodeId, NodeId)

type alias Edge =
    { source : NodeId
    , target : NodeId
    , visitors : Set PeerId   -- the players that have traveled this edge
    }

type alias WikiGraph =
  { nodes : List Node
  , edges : List Edge
  , looseEnds : Set NodeId                -- nodes at the tip of paths that aren't linked up to any destination
  , destinations : List PagePreview             -- destination titles of the game
  , playerLocations : Dict PeerId NodeId  -- current locations of players
  , width : Float
  , height : Float
  }

getNode : NodeId -> WikiGraph -> Maybe Node
getNode id graph = List.Extra.find (.id >> (==) id) graph.nodes

getEdge : EdgeId -> WikiGraph -> Maybe Edge
getEdge id graph = List.Extra.find (\{source, target} -> (source, target) == id) graph.edges

type alias Pos = { x : Float, y : Float}


newNode : Pos -> NodeId -> Node
newNode {x,y} id_ =
    { x = x
    , y = y
    , vx = 0.0
    , vy = 0.0
    , id = id_
    , visitors = Set.empty
    }

-- preferred positions of the destination nodes
preferredDestPositions : WikiGraph -> List Pos
preferredDestPositions {width, height, destinations} =
    let
      numDests = List.length destinations
      gapSize = width / toFloat numDests
    in List.range 0 (numDests - 1)
      |> List.map
        (\i -> {x = (toFloat i)*gapSize + gapSize/2, y = height/2})


{-| initialize a wikigraph with the destination nodes
-}
initWikiGraph : List PagePreview -> WikiGraph
initWikiGraph dests =
    let
        -- identify detination type nodes by keying them with -1 in the graph
        graph =
          { nodes = [], edges = []
          , looseEnds = Set.empty
          , destinations = dests
          , playerLocations = Dict.empty
          , width = 1000
          , height = 500
          } 
        destNodes = List.Extra.zip dests (preferredDestPositions graph)
          |> List.map (\({title}, pos) -> newNode pos (title, title))
    in
    { graph | nodes=destNodes}


{-| update the wiki graph when a player moves from one title to another
-}
updateWikiGraph : PeerId -> NodeId -> NodeId -> WikiGraph -> WikiGraph
updateWikiGraph player source reached graph =
  let
    edgeId = (source, reached)

    -- get the node that this player was last seen on
    lastPos = getNode source graph
      |> Maybe.map (\n -> {x=n.x, y=n.y})
      |> Maybe.withDefault {x=0, y=0}
      |> \pos ->
        let (noise, _) = Random.step (Random.float 0 1) (strToSeed player)
        in {x=pos.x+noise,y=pos.y+noise}  -- add a little noise so it doesn't break the force layout

    updatedNode = getNode reached graph
      |> Maybe.withDefault (newNode lastPos reached)
      |> \node -> {node | visitors=Set.insert player node.visitors}

    updatedEdge = getEdge edgeId graph
      |> Maybe.withDefault {source=source, target=reached, visitors=Set.empty}
      |> \edge -> {edge | visitors=Set.insert player edge.visitors}

    -- update the set of loose end nodes if the player has landed on a new untouched page
    newLooseEnds = Set.remove source <| case getNode reached graph of
      Just _ -> graph.looseEnds
      Nothing ->
        let isDestination = Tuple.first reached == Tuple.second reached
        in if isDestination then graph.looseEnds else Set.insert reached graph.looseEnds
  in
    { graph |
      playerLocations=Dict.insert player reached graph.playerLocations
      , nodes=updatedNode :: List.filter (.id >> (/=) reached) graph.nodes
      , edges=updatedEdge :: List.filter (\e -> (e.source, e.target) /= edgeId) graph.edges
      , looseEnds=newLooseEnds
    }

{-| construct new force layout simulation for the graph
-}
newSimulation : WikiGraph -> Force.State NodeId
newSimulation graph =
  let

    dummyLinks = Set.toList graph.looseEnds
      |> List.map (\(title, goal) -> {
        source=(title,goal),
        target=(goal,goal),
        distance=60,
        strength=Nothing
      })

    edgeLinks = graph.edges
      |> List.map (\{source, target} -> {
        source=source,
        target=target,
        distance=30,
        strength=Nothing
      })

    forces =
      [ Force.customLinks 1 <| dummyLinks ++ edgeLinks
      , Force.manyBody <| List.map .id graph.nodes
      ]
  in Force.iterations 300 (Force.simulation forces)



type alias WikiGraphState = (WikiGraph, Force.State NodeId)

{-| initialize the wikigraph with the destination list
-}
init : List PagePreview -> WikiGraphState
init destinations =
  let graph = initWikiGraph destinations
  in (graph, newSimulation graph)

{-| update the wikigraph when a player moves from one title to another
-}
update : PeerId -> GameState -> WikiGraphState -> WikiGraphState
update player {previousLegs, currentLeg} (wikigraph, sim) =
    let
        -- each node is keyed by its title and the leg it was found on
        -- so we need to do some work to figure out the correct node ids
        -- for the player's most recent move
        lastLegNode = case List.head previousLegs of
            Just leg -> List.head leg.previousPages
                |> Maybe.map (\previous -> (previous, leg.goal))
            Nothing -> Nothing
        reachedTitle = currentLeg.currentPage

        edge = case currentLeg.previousPages of
            -- player reached a destination and so we're starting a new leg
            [] -> Maybe.map (\source -> Tuple.pair source (reachedTitle, reachedTitle)) lastLegNode
            -- player just moved from a destination
            [previousPage] -> Just <| Tuple.pair (previousPage, previousPage) (reachedTitle, currentLeg.goal)

            (previousPage :: _ :: _) -> Just <| Tuple.pair (previousPage, currentLeg.goal) (reachedTitle, currentLeg.goal)
    in case edge of
      Just (source, target) -> 
        let newGraph = updateWikiGraph player source target wikigraph
        in (newGraph, newSimulation newGraph)
      Nothing -> (wikigraph, sim)

tickWikiGraphSim : WikiGraphState -> WikiGraphState
tickWikiGraphSim (graph, sim) =
  let (newState, refinedNodes) = Force.tick sim graph.nodes
      -- don't update the positions of the destination nodes to keep them fixed
      destinations = List.filter isDestinationNode graph.nodes
  in ({graph | nodes=destinations ++ List.filter (not << isDestinationNode) refinedNodes}, newState)

{-| step through the force simulation and return an updated wikigraph
-}
subscription : WikiGraphState -> Sub WikiGraphState
subscription (graph, sim) =
    if Force.isCompleted sim then Sub.none
    else Browser.Events.onAnimationFrame (\_ -> tickWikiGraphSim (graph, sim))


type alias ColorMap = Dict PeerId Color.Color

svgEdge : WikiGraph -> ColorMap -> Edge -> Svg msg
svgEdge {nodes} colormap edge =
  let
      source = List.Extra.find (\n -> n.id == edge.source) nodes
          |> Maybe.withDefault (newNode {x=0,y=0} ("",""))    -- will not happen

      target = List.Extra.find (\n -> n.id == edge.target) nodes
          |> Maybe.withDefault (newNode {x=0,y=0} ("",""))    -- will not happen

      colors = Set.toList edge.visitors
        |> List.filterMap (\player -> Dict.get player colormap)
  in
      coloredPath colors source.x source.y target.x target.y

{-| Create a svg group that draws a colored line from one x,y point to another

-}
coloredPath : List Color.Color -> Float -> Float -> Float -> Float -> Svg msg
coloredPath colors sourceX sourceY targetX targetY =
    let
        portionThickness : Float
        portionThickness = 3
        mkLine i color =
            line
                [ strokeWidth portionThickness
                , stroke <| Paint <| color
                , x1 0
                , y1 <| (toFloat i)*portionThickness + portionThickness/2
                , x2 100
                , y2 <| (toFloat i)*portionThickness + portionThickness/2
                ]
                []
        dist = sqrt <| (sourceX - targetX)*(sourceX - targetX) + (sourceY - targetY)*(sourceY - targetY)
        -- scale the path to match the distance between points
        scale = Scale (dist/100) 1

        totalThickness = (toFloat <| List.length colors)*portionThickness
        -- start line at the source point
        translate = Translate sourceX (sourceY - totalThickness/2)

        -- compute x,y vector from source to target point
        (x_,y_) = (targetX - sourceX, targetY - sourceY)
        degrees = (atan2 y_ x_) * 180 / pi
        -- rotate the line to match vector from source to target
        rotation = Rotate degrees sourceX sourceY

    in g [ class ["links"], transform [rotation, translate, scale] ]
        <| List.indexedMap mkLine colors


{-| render a destination node as its thumbnail in a circle
-}
svgDestinationNode : Node -> PagePreview -> Svg msg
svgDestinationNode {x,y,id} {thumbnail} = 
  let (title, _) = id
      idTitle = encodeTitle title
        |> String.replace "(" "lp"
          >> String.replace ")" "rp"
          >> String.replace "%" "pc"
      size = 10
  in
  case thumbnail of
    Just picture ->
      let
          sizeAttr =
            if picture.width > picture.height then
              height (size*2)
            else
              width (size*2)
          img = image
            [ TypedSvg.Attributes.xlinkHref picture.src
            , TypedSvg.Attributes.InPx.x 0
            , TypedSvg.Attributes.InPx.y 0
            --, height 50, width 50
            , sizeAttr
            ]
            []

          bg = TypedSvg.pattern
            [ TypedSvg.Attributes.id <| idTitle ++ "-pattern"
            --, TypedSvg.Attributes.InPx.x 0
            --, TypedSvg.Attributes.InPx.y 0
            , TypedSvg.Attributes.patternUnits TypedSvg.Types.CoordinateSystemUserSpaceOnUse
            , height (size*2), width (size*2)
            ]
            [ img ]
          
          circ = circle
              [ cx size, cy size, r size
              , attribute "fill" <| "url(#" ++ idTitle ++ "-pattern)"
              , stroke <| Paint Color.black
              , strokeWidth 2
              ] 
              [TypedSvg.title [] [ text title ]]
      in g [transform [Translate (x - size) (y - size)]] [TypedSvg.defs [] [bg], circ]
    
    Nothing -> circle [cx x, cy y, r size, fill <| Paint <| Color.darkRed] [TypedSvg.title [] [ text title ]]


{-| draw a simple node circle
-}
svgNode : Node -> Svg msg
svgNode node = circle
    [ r 2.5
    , fill <| Paint Color.black
    , stroke <| Paint <| Color.rgba 0 0 0 0
    , strokeWidth 7
    -- , onMouseDown node.id
    , cx node.x
    , cy node.y
    ]
    [ TypedSvg.title [] [ text <| Tuple.first node.id ] ]

view : WikiGraphState -> Dict PeerId { red : Float, green : Float, blue : Float, alpha : Float} -> Svg msg
view (graph, _) colors =
    let
        colormap = Dict.map (\_ {red,green,blue} -> Color.rgb red green blue) colors

        mkNode node = case List.Extra.find (.title >> (==) (Tuple.first node.id)) graph.destinations of
          Just preview -> svgDestinationNode node preview
          Nothing -> svgNode node

        nodeElements = graph.nodes
            |> List.map mkNode
            |> g [class ["nodes"]]
        edgeGroups = graph.edges
            |> List.map (svgEdge graph colormap)
    in
    svg [ viewBox 0 0 graph.width graph.height ] (edgeGroups ++ [nodeElements])