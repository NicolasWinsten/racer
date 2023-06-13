module WikiGraph exposing (WikiGraph, WikiGraphState, Node, NodeId, Edge, update, subscription, init, Pos, setHighlightedNode)

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

-- We also keep a wikigraph during gameplay in order to visualize the roots taken by the players

{-| unique id for each node in the wikigraph
-}
type alias NodeId =
    ( Title    -- title of this node's page
    , Title    -- title of the destination trying to be reached from this node
    -- if a player visits the same page in different legs during the game,
    -- we'll consider them different nodes
    -- note: if nodeId is (a,b) where a==b then it is a destination node
    )

type alias Node = Force.Entity NodeId { visitors : Set PeerId }

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
  , destinations : List PagePreview       -- destination titles of the game
  , playerLocations : Dict PeerId NodeId  -- current locations of players
  , highlightedNode : Maybe NodeId
  , width : Float
  , height : Float
  }

-- use WikiGraphState in the model to track the force simulation state
type alias WikiGraphState = (WikiGraph, Force.State NodeId)

isDestinationNode : Node -> Bool
isDestinationNode {id} = let (title, goal) = id in title == goal 

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
          , highlightedNode = Nothing
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
      |> Maybe.withDefault {x=10, y=0}
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
        strength=Just 0.1
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
  in Force.iterations 500 (Force.simulation forces)


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




setHighlightedNode : Maybe NodeId -> WikiGraphState -> WikiGraphState
setHighlightedNode node (graph, sim) = ({graph | highlightedNode=node}, sim)
