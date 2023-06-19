module WikiGraph exposing (WikiGraphState, WikiGraphMsg, onMsg, update, subscription, init, view, reheat, badState)

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
import Maybe.Extra
import Basics.Extra
import Dict.Extra


import TypedSvg exposing (circle, rect, g, line, svg, image)
import TypedSvg.Attributes as A
import TypedSvg.Attributes.InPx as AInPx
import TypedSvg.Core exposing (Svg, text, attribute)
import TypedSvg.Types exposing (..)
import Dict.Extra
import Html.Events exposing (onMouseEnter)
import Html.Events exposing (onMouseLeave)
import Maybe.Extra
import TypedSvg.Types exposing (FontWeight(..))
import Zoom
import Color exposing (Color)

-- We also keep a wikigraph during gameplay in order to visualize the routes taken by the players

{-| unique id for each node in the wikigraph

must satisfy comparable typeclass
-}
type alias NodeId =
    ( Title    -- title of this node's page
    , Title    -- title of the destination trying to be reached from this node
    -- if a player visits the same page in different legs during the game,
    -- we'll consider them different nodes
    -- note: if nodeId is (a,b) where a==b then it is a destination node
    
    , Int -- each node has a sister label node that helps layout labels
      -- this will be 1 if it is a label node
    )


type NodeData
  = Destination Title
  | PathNode {title : Title, goal : Title}  -- node in path linking destinations together
  | Label NodeId

{-| convert a node to a comparable type
-}
nodeId : NodeData -> NodeId
nodeId n = case n of
  Destination title ->      (title,"",0)
  PathNode {title, goal} ->    (title, goal, 0)
  Label (title, goal, _) -> (title, goal, 1)

type alias Node = Force.Entity NodeId { data : NodeData, visitors : Set PeerId }

-- edges are keyed by their source and target nodes
type alias EdgeId = (NodeId, NodeId)

type alias Edge =
    { source : NodeId
    , target : NodeId
    , visitors : Set PeerId   -- the players that have traveled this edge
    }

type alias WikiGraph =
  { nodes : Dict NodeId Node
  , edges : Dict EdgeId Edge
  , looseEnds : Dict PeerId NodeId        -- nodes at the tip of player paths that aren't linked up to any destination
  , destinations : List PagePreview       -- destination titles of the game
  , playerLocations : Dict PeerId NodeId  -- current locations of players
  , labelAnchors : Dict NodeId (Pos {})
  }

-- use WikiGraphState in the model to track the force simulation state
type alias WikiGraphState =
  { graph : WikiGraph
  , sim : Force.State NodeId
  , svgZoomPan : Zoom.Zoom
  , highlightedNode : Maybe NodeId
  }

getNode : NodeId -> WikiGraph -> Maybe Node
getNode id graph = Dict.get id graph.nodes

getEdge : EdgeId -> WikiGraph -> Maybe Edge
getEdge id graph = Dict.get id graph.edges

newNode : Pos a -> NodeData -> Node
newNode {x,y} data = 
    { x = x
    , y = y
    , vx = 0.0
    , vy = 0.0
    , id = nodeId data
    , visitors = Set.empty
    , data = data
    }

titleOf : NodeId -> Title
titleOf (title,_,_) = title

goalOf : NodeId -> Title
goalOf (_,goal,_) = goal

isLabelNode : NodeId -> Bool
isLabelNode (_,_,flag) = flag == 1

isDestinationNode : NodeId -> Bool
isDestinationNode id = id == nodeId (Destination <| titleOf id)

mkLabelId : NodeId -> NodeId
mkLabelId (title,goal,_) = (title,goal,1)

{-| create the corresponding label node for a given node

either use the given inital position or use the given node's position with some added noise
-}
mkLabelNode : Maybe (Pos {}) -> Node -> Node
mkLabelNode pos n =
  let
    (title, _, _) = n.id
    (noisex, seed) = Random.step (Random.float 0 10) (strToSeed title)
    (noisey, _) = Random.step (Random.float 0 10) seed
    initialPos = {x=n.x + noisex, y=n.y + noisey}
  in newNode (Maybe.withDefault initialPos pos) (Label n.id)


mkEdge : NodeId -> NodeId -> Edge
mkEdge source target = {source=source, target=target, visitors=Set.empty}

-- node centroid will be placed in middle of these dimensions
dimensions = {width=1000, height=500}

center = {x=dimensions.width/2, y=dimensions.height/2}


{-| initialize a wikigraph with the destination nodes
-}
initWikiGraph : List PagePreview -> WikiGraph
initWikiGraph dests =
    let
        destNodes = List.map (.title >> Destination) dests
          |> List.foldl
              (\dest (x, dict) ->
                Dict.insert (nodeId dest) (newNode {x=x,y=center.y} dest) dict
                |> Tuple.pair (x+100)
              )
            (0, Dict.empty)
          |> Tuple.second
    in
    { nodes = destNodes, edges = Dict.empty
    , looseEnds = Dict.empty
    , destinations = dests
    , playerLocations = Dict.empty
    , labelAnchors = Dict.empty
    }


{-| update the wiki graph when a player moves from one title to another
-}
updateWikiGraph : PeerId -> NodeId -> NodeId -> WikiGraph -> WikiGraph
updateWikiGraph player source reached graph =
  let
    edgeId = (source, reached)

    -- get the node that this player was last seen on
    -- so a their node can be placed near it
    lastPos = getNode source graph
      |> Maybe.map (\n -> {x=n.x, y=n.y})
      |> Maybe.withDefault center
      |> \pos ->
        -- add a little noise so it doesn't break the force layout
        -- by laying one node directly on another
        let str = player ++ titleOf source ++ titleOf reached
            (noisex, seed) = Random.step (Random.float 1 10) (strToSeed str)
            (noisey, _) = Random.step (Random.float -10 10) seed
        in {x=pos.x+noisex,y=pos.y+noisey}

    -- create a new node or update the existing node's visitor list
    updatedNode = getNode reached graph
      |> Maybe.withDefault (newNode lastPos <| PathNode {title=titleOf reached, goal=goalOf reached})
      |> \node -> {node | visitors=Set.insert player node.visitors}

    -- update the set of loose end nodes if the player has landed on a new untouched page
    newLooseEnds =
      if isDestinationNode reached then
        Dict.remove player graph.looseEnds
      else if Maybe.Extra.isNothing (getNode reached graph) then
        Dict.insert player reached graph.looseEnds
      else
        graph.looseEnds
    
  in
    { graph |
      playerLocations=Dict.insert player reached graph.playerLocations
      -- update the touched nodes that the player touched them
      , nodes=Dict.insert reached updatedNode graph.nodes
          |> Dict.update source (Maybe.map (\s -> {s | visitors=Set.insert player s.visitors}))
      -- update visitor list of the edge
      , edges=Dict.update edgeId
          (\e -> case e of
            Just edge -> Just {edge | visitors=Set.insert player edge.visitors}
            Nothing -> Just <| let edge = mkEdge source reached in {edge | visitors=Set.singleton player}
          )
          graph.edges
      , looseEnds=newLooseEnds
    }

mkDestinationDummyLinks : WikiGraph -> List EdgeId
mkDestinationDummyLinks graph =
    -- if we have destination nodes that nobody's reaching for,
    -- then we need to add dummy links between that destination and the previous one,
    -- so the destination nodes don't run off
      let
        isReachingFor titleNode goalTitle = case titleNode of
          PathNode {goal} -> goal == goalTitle
          _ -> False

        -- if there's no nodes going for a destination then it needs a dummy link to hold it
        isDangling destTitle = graph.nodes
          |> Dict.Extra.any (\_ {data} -> isReachingFor data destTitle)
          |> not

      in window graph.destinations
        |> List.filterMap
          (\(d1, d2) ->
            if isDangling d2.title then Just
              ( nodeId (Destination d1.title)-- connect up the dangling destination node
              , nodeId (Destination d2.title)-- with the destination before it
              )
            else Nothing
          )

{-| construct new force layout simulation for the graph
-}
newSimulation : Int -> WikiGraph -> Force.State NodeId
newSimulation numIterations graph =
  let

    linkDistance = 30

    configLink distance strength (source,target) =
      {source=source,target=target,distance=distance,strength=strength}

    -- we want the player's current node to be visually reaching for the next destination
    -- so add dummy links between player nodes and their goal
    dummyLinks = List.map
      (\id -> configLink (linkDistance*3) (Just 0.01) (id, nodeId (Destination <| goalOf id)))
      (Dict.values graph.looseEnds)

    edgeLinks = Dict.keys graph.edges
      |> List.map (configLink linkDistance Nothing)
    
    -- have to link up destination nodes so they don't fly away
    danglingDestLinks = mkDestinationDummyLinks graph
      |> List.map (configLink (linkDistance*3) Nothing) 

    -- to layout the labels for each node nicely, we have an extra "label node" for each real node
    labelEdges = Dict.keys graph.nodes
      |> List.map (\id -> configLink linkDistance Nothing (id, mkLabelId id))
    labelNodes = List.map .target labelEdges

    forces =
      [ Force.customLinks 5 <| danglingDestLinks ++ dummyLinks ++ edgeLinks ++ labelEdges
      , Force.manyBody <| Dict.keys graph.nodes ++ labelNodes
      , Force.center center.x center.y
      ]
  in Force.iterations numIterations (Force.simulation forces)


{-| initialize the wikigraph with the destination list
-}
init : List PagePreview -> WikiGraphState
init destinations =
  let graph = initWikiGraph destinations
    --TODO put an extent on the zoom's scale and pan
      initZoom : Zoom.Zoom
      initZoom = Zoom.init dimensions
  in
  { graph=graph
  , sim=newSimulation 10 graph
  , svgZoomPan = initZoom
  , highlightedNode=Nothing
  }

{-| update the wikigraph when a player moves from one title to another
-}
update : PeerId -> GameState -> Int -> WikiGraphState -> WikiGraphState
update player {previousLegs, currentLeg} numIterations ({graph} as wgstate) =
    let
        -- each node is keyed by its title and the leg it was found on
        -- so we need to do some work to figure out the correct node ids
        -- for the player's most recent move

        -- retrieve the last node of the last leg
        lastLegNode = List.head previousLegs
          |> Maybe.map legParts
          |> Maybe.map
            (\(start,steps,goal) -> case List.reverse steps of
              [] -> Destination start
              (step :: _) -> PathNode {title=step, goal=goal}
            )

        onNewLeg = List.isEmpty currentLeg.previousPages

        reachedNode =
          let {currentPage, goal} = currentLeg
          in nodeId <|
            if currentPage == goal || onNewLeg then Destination currentPage
            else PathNode {title=currentPage, goal=goal} 

        -- unless we are at the starting node, figure out the node that led to the current one
        sourceNodeId = Maybe.map nodeId <| case currentLeg.previousPages of
            -- player reached a destination and so we're starting a new leg
            [] -> lastLegNode
            -- player just moved from a destination
            [previousPage] -> Just (Destination previousPage)

            (previousPage :: _ :: _) -> Just <| PathNode {title=previousPage, goal=currentLeg.goal}

    in case sourceNodeId of
      Just id -> 
        let newGraph = updateWikiGraph player id reachedNode graph
        in {wgstate | graph=newGraph, sim = newSimulation numIterations newGraph}
      Nothing ->
          -- no new edge, but update player location because they're on a destination
          { wgstate | graph={graph | playerLocations=Dict.insert player reachedNode graph.playerLocations}}

{-|
-}
tickWikiGraphSim : WikiGraphState -> WikiGraphState
tickWikiGraphSim ({graph, sim} as wgstate) =
  let
    -- add in label nodes to the sim
    labelNodes = Dict.toList graph.nodes
      |> List.map
        (\(id, n) -> mkLabelNode (Dict.get id graph.labelAnchors) n)

    -- rotate all nodes such that starting node and destination node are level
    getDest title = getNode (nodeId <| Destination title) graph
    start = List.head graph.destinations |> Maybe.andThen (.title >> getDest)
    end = List.reverse graph.destinations |> List.head |> Maybe.andThen (.title >> getDest)

    -- take the line from the starting node to the last destination node
    -- to get the degrees to rotate the graph by
    degrees = case (start, end) of
      (Just source, Just target) -> -(angleOf <| subtract target source)
      _ -> 0
    
    pivot = Maybe.map (\{x,y} -> {x=x, y=y}) start
      |> Maybe.withDefault {x=0, y=0}

    (newState, refinedNodes) = Force.tick sim (Dict.values graph.nodes ++ labelNodes)
      -- rotate each node around the starting node so that it reads left to right
      |> Tuple.mapSecond ( List.map (rotate degrees pivot) )

    -- sift out the label dummy nodes
    (labels, nodes) = List.partition (.id >> isLabelNode) refinedNodes
    
    nodeOfLabel l = case l of
      Label id -> Just id
      _ -> Nothing

    -- update the label positions
    labelPosMap = labels
      |> List.filterMap
        (\{x,y,data} -> Maybe.map (Basics.Extra.flip Tuple.pair {x=x,y=y}) (nodeOfLabel data))
      |> Dict.fromList

  in
  {wgstate | graph={graph | nodes=Dict.Extra.fromListBy .id nodes, labelAnchors=labelPosMap}, sim=newState}

{-| start the force layout algorithm again
-}
reheat : Int -> WikiGraphState -> WikiGraphState
reheat iters ({graph} as wg) = {wg | sim=newSimulation iters graph}



type WikiGraphMsg
  = HoveredWikiGraphNode (Maybe NodeId)
  | ZoomPan Zoom.OnZoom
  | ForceLayout WikiGraphState

{-| update the WikiGraphState according to the msg
-}
onMsg : WikiGraphMsg -> WikiGraphState -> WikiGraphState
onMsg msg wg = case msg of
  HoveredWikiGraphNode id -> {wg | highlightedNode=id}
  ZoomPan zoomMsg -> {wg | svgZoomPan=Zoom.update zoomMsg wg.svgZoomPan}
  ForceLayout graph -> graph


{-| step through the force simulation and return an updated wikigraph
-}
subscription : WikiGraphState -> Sub WikiGraphMsg
subscription wg =
    let forceLayoutTick =
          if Force.isCompleted wg.sim then Sub.none
          else Browser.Events.onAnimationFrame
            (\_ -> ForceLayout <| tickWikiGraphSim wg)
        
        -- fire event when user drags or mousewheels on the svg
        zoomSub = Zoom.subscriptions wg.svgZoomPan ZoomPan

    in Sub.batch [forceLayoutTick, zoomSub]
      

type alias ColorMap = Dict PeerId Color

{-| set the alpha channel of a color
-}
setAlpha : Float -> Color.Color -> Color.Color
setAlpha a color =
  let {red,green,blue} = Color.toRgba color
  in Color.rgba red green blue a

hideAlpha = 0.1



{-| for each edge in the wikigraph, color it according to all the players that have used it
-}
svgEdge : WikiGraphState -> ColorMap -> Edge -> Svg WikiGraphMsg
svgEdge {graph} colormap edge =
  let
      source = getNode edge.source graph
          |> Maybe.map (\{x,y} -> {x=x, y=y})
          |> Maybe.withDefault {x=0,y=0}  -- will not happen

      target = getNode edge.target graph
          |> Maybe.map (\{x,y} -> {x=x, y=y})
          |> Maybe.withDefault {x=0,y=0}  -- will not happen

      colors = Set.toList edge.visitors
        |> List.filterMap (\player -> Dict.get player colormap)
  in
      coloredPath colors source target

{-| Create a svg group that draws a colored line from one x,y point to another

-}
coloredPath : List Color -> Pos a -> Pos b -> Svg msg
coloredPath colors source target =
    let
        portionThickness : Float
        portionThickness = 3
        mkLine i color =
            line
                [ AInPx.strokeWidth portionThickness
                , A.stroke <| Paint <| color
                , AInPx.x1 0
                , AInPx.y1 <| (toFloat i)*portionThickness + portionThickness/2
                , AInPx.x2 100
                , AInPx.y2 <| (toFloat i)*portionThickness + portionThickness/2
                ]
                []
        -- scale the path to match the distance between points
        scale = Scale (dist source target / 100) 1

        totalThickness = (toFloat <| List.length colors)*portionThickness
        -- start line at the source point centered on middle of line
        translate = Translate source.x (source.y - totalThickness/2)

        degrees = angleOf <| subtract target source
        -- rotate the line to match vector from source to target
        rotation = Rotate degrees source.x source.y

    in g [ A.class ["links"], A.transform [rotation, translate, scale] ]
        <| List.indexedMap mkLine colors


{-| render a destination node as its thumbnail in a circle
-}
mkPictureNode : {url : String, width : Float, height : Float} -> Pos a -> Float -> Title -> Svg msg
mkPictureNode img {x,y} radius title =
  let id = encodeTitle title
        |> String.replace "(" "lp"
          >> String.replace ")" "rp"
          >> String.replace "%" "pc"
      sizeAttr =
        if img.width > img.height then
          AInPx.height (radius*2)
        else
          AInPx.width (radius*2)
      imgObj = image
        [ A.href img.url
        , AInPx.x 0
        , AInPx.y 0
        , sizeAttr
        ]
        []

      bg = TypedSvg.pattern
        [ A.id <| id ++ "-pattern"
        , A.patternUnits TypedSvg.Types.CoordinateSystemUserSpaceOnUse
        , AInPx.height (radius*2)
        , AInPx.width (radius*2)
        ]
        [ imgObj ]
      
      circ = circle
          [ AInPx.cx radius, AInPx.cy radius, AInPx.r radius
          , attribute "fill" <| "url(#" ++ id ++ "-pattern)"
          , A.stroke <| Paint Color.black
          , AInPx.strokeWidth 2
          ] 
          []
    in g [A.transform [Translate (x - radius) (y - radius)]] [TypedSvg.defs [] [bg], circ]


{-| draw a simple node circle, color it according to any players currently on it
-}
svgNode : WikiGraphState -> ColorMap -> Node -> Svg WikiGraphMsg
svgNode {graph, highlightedNode} colormap node =
  let playercolor = graph.playerLocations
        |> Dict.Extra.find (\player nodeid -> nodeid == node.id)
        |> Maybe.andThen (\(player, _) -> Dict.get player colormap)

      transparent = False -- TODO use this to highlight a particular player path

      fillcolor = Maybe.withDefault Color.black playercolor
        |> \c -> if transparent then setAlpha hideAlpha c else c

      playerIsHere = Maybe.Extra.isJust playercolor

      destinationPreview = case node.data of
        Destination title -> List.Extra.find (.title >> (==) title) graph.destinations
        _ -> Nothing
        
      isDestination = Maybe.Extra.isJust destinationPreview

      radius =
        if isDestination then 10
        else if playerIsHere then 5
        else 3

      -- the labels' angles are determined by the force layout using dummy nodes
      labelAnchor = Dict.get node.id graph.labelAnchors
        |> Maybe.withDefault {x=0,y=0}

      labelDegrees = angleOf <| subtract labelAnchor node

      labelUpsideDown = labelAnchor.x < node.x
      labelTransform =
        if not labelUpsideDown then
          [Translate node.x node.y, Rotate labelDegrees 0 0, Translate (radius+3) 0]
        else
          [Translate node.x node.y, Rotate (labelDegrees - 180) 0 0, Translate -(radius+3) 0]

      nodeTitle = case node.data of
        Destination title -> title
        PathNode {title} -> title
        Label _ -> "label"
      
      clampedLabel =
        let maxChars = 20
        in
        if String.length nodeTitle <= maxChars
          || highlightedNode == Just node.id
        then
          nodeTitle
        else
          String.left maxChars nodeTitle ++ "..."

      labelText = -- TODO add option to highlight and display titles of particular player
        if not transparent then
          TypedSvg.text_
          [ A.fontFamily ["sans-serif"]
          , AInPx.fontSize 10
          , A.transform labelTransform
          , A.fontWeight
              <| if isDestination then FontWeightBold else FontWeightNormal
          , A.textAnchor <| if labelUpsideDown then AnchorEnd else AnchorStart
          , A.dominantBaseline DominantBaselineMiddle
          , onMouseEnter (HoveredWikiGraphNode <| Just node.id)
          , onMouseLeave (HoveredWikiGraphNode Nothing)
          ]
          [text clampedLabel]
        else
          text ""

      nodeCircle = case Maybe.andThen .thumbnail destinationPreview of
        Just src ->
          mkPictureNode {url=src.src, width=src.width, height=src.height} node radius nodeTitle
        Nothing ->
          circle
            [ AInPx.r radius
            , A.fill <| Paint fillcolor
            , AInPx.cx node.x
            , AInPx.cy node.y
            , onMouseEnter (HoveredWikiGraphNode <| Just node.id) -- TODO hovering over node highlights that player's path
            , onMouseLeave (HoveredWikiGraphNode Nothing)
            ]
            [ TypedSvg.title [] [ text nodeTitle ]]

      link = TypedSvg.a
        [ A.href ("https://en.wikipedia.org/wiki/" ++ encodeTitle nodeTitle)
        , A.target "_blank"
        ]

  in g [A.class ["node"]]
    [ link [nodeCircle]
    , link [labelText]
    ]

view : WikiGraphState -> Dict PeerId { red : Float, green : Float, blue : Float, alpha : Float} -> Svg WikiGraphMsg
view ({graph, svgZoomPan} as wikigraph) colors =
    let
        colormap = Dict.map (\_ {red,green,blue} -> Color.rgb red green blue) colors

        nodeElements = Dict.values graph.nodes
            |> List.map (svgNode wikigraph colormap)
            |> g [A.class ["nodes"]]
        edgeGroups = Dict.values graph.edges
            |> List.map (svgEdge wikigraph colormap)
    in
    -- the svg element has fixed dimensions
    -- if we want it to be resizable then we would need to update the Zoom with the new dimensions
    -- by subscribing to OnResize and 
    svg
      [ AInPx.width dimensions.width
      , AInPx.height dimensions.height
      ]
      [ rect
        ([ A.width <| TypedSvg.Types.Percent 100
        , A.height <| TypedSvg.Types.Percent 100
        , A.fill <| Paint <| Color.rgb255 235 236 229
        ]
          ++ Zoom.events svgZoomPan ZoomPan -- dragging and mousewheel are registered on background rect
        )
        []
        -- the actual zoom and pan transforms are done on the drawn content
      , g [Zoom.transform svgZoomPan] (edgeGroups ++ [nodeElements])
      ]

badState : WikiGraphState -> Maybe String
badState wg =
  let
    badNode = wg.graph.nodes
      |> Dict.Extra.find (\_ {x,y} -> isNaN x || isNaN y)
      |> Maybe.map Tuple.first

    badLabel = wg.graph.labelAnchors
      |> Dict.Extra.find (\_ {x,y} -> isNaN x || isNaN y)
      |> Maybe.map Tuple.first
    
  in case (badNode, badLabel) of
    (Just node, _) ->Just <| "Bad position found for node " ++ titleOf node
    (_, Just node) -> Just <| "Bad label node position for node " ++ titleOf node
    _ -> Nothing
