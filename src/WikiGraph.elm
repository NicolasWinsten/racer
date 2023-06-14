module WikiGraph exposing (WikiGraph, WikiGraphState, Node, NodeId, Edge, update, subscription, init, Pos, width, height)

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

-- node centroid will be placed in middle of these dimensions
width = 1000
height = 500

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
  , looseEnds : Dict PeerId NodeId        -- nodes at the tip of player paths that aren't linked up to any destination
  , destinations : List PagePreview       -- destination titles of the game
  , playerLocations : Dict PeerId NodeId  -- current locations of players
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
preferredDestPositions {destinations} =
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
          , looseEnds = Dict.empty
          , destinations = dests
          , playerLocations = Dict.empty
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

    -- create a new node or update the existing node's visitor list
    updatedNode = getNode reached graph
      |> Maybe.withDefault (newNode lastPos reached)
      |> \node -> {node | visitors=Set.insert player node.visitors}

    -- create a new edge or update the existing edge's visitor list
    updatedEdge = getEdge edgeId graph
      |> Maybe.withDefault {source=source, target=reached, visitors=Set.empty}
      |> \edge -> {edge | visitors=Set.insert player edge.visitors}

    -- update the set of loose end nodes if the player has landed on a new untouched page
    newLooseEnds =
      let isDestination = Tuple.first reached == Tuple.second reached
      in
      if isDestination then
        Dict.remove player graph.looseEnds
      else if Maybe.Extra.isNothing (getNode reached graph) then
        Dict.insert player reached graph.looseEnds
      else
        graph.looseEnds
    
  in
    { graph |
      playerLocations=Dict.insert player reached graph.playerLocations
      , nodes=List.filter (.id >> (/=) reached) graph.nodes
          |> List.Extra.updateIf
              (\{id} -> id == source)
              (\sourceNode -> {sourceNode | visitors=Set.insert player sourceNode.visitors})
          |> (::) updatedNode
      , edges=updatedEdge :: List.filter (\e -> (e.source, e.target) /= edgeId) graph.edges
      , looseEnds=newLooseEnds
    }

mkDestinationDummyLinks : WikiGraph -> List EdgeId
mkDestinationDummyLinks graph =
    -- if we have destination nodes that nobody's reaching for,
    -- then we need to add dummy links between that destination and the previous one,
    -- so the destination nodes don't run off
      let
        -- if there's no nodes going for a destination then it needs a dummy link to hold it
        isDangling destTitle = graph.nodes
          |> List.any (\{id} -> let (title, goal) = id in title /= goal && goal == destTitle)
          |> not
      in window graph.destinations
        |> List.filterMap
          (\(d1, d2) ->
            if isDangling d2.title then Just
              ( (d1.title,d1.title)-- connect up the dangling destination node
              , (d2.title,d2.title)-- with the destination before it
              )
            else Nothing
          )

{-| construct new force layout simulation for the graph
-}
newSimulation : Int -> WikiGraph -> Force.State NodeId
newSimulation numIterations graph =
  let
    -- we want the player's current node to be visually reaching for the next destination
    -- so add dummy links between player nodes and their goal
    dummyLinks = List.map
      (\(title, goal) -> {
        source=(title,goal),
        target=(goal,goal),
        distance=60,
        strength=Just 0.05
      })
      (Dict.values graph.looseEnds)

    edgeLinks = graph.edges
      |> List.map (\{source, target} -> {
        source=source,
        target=target,
        distance=30,
        strength=Nothing
      })
    
    -- have to link up destination nodes so they don't fly away
    danglingDestLinks = mkDestinationDummyLinks graph
      |> List.map (\(source, target) -> {
        source=source,
        target=target,
        distance=30,
        strength=Nothing
      })

    forces =
      [ Force.customLinks 1 <| danglingDestLinks ++ dummyLinks ++ edgeLinks
      , Force.manyBody <| List.map .id graph.nodes
      , Force.center (width/2) (height/2)
      ]
  in Force.iterations numIterations (Force.simulation forces)


{-| initialize the wikigraph with the destination list
-}
init : List PagePreview -> WikiGraphState
init destinations =
  let graph = initWikiGraph destinations
  in (graph, newSimulation 10 graph)

{-| update the wikigraph when a player moves from one title to another
-}
update : PeerId -> GameState -> Int -> WikiGraphState -> WikiGraphState
update player {previousLegs, currentLeg} numIterations (wikigraph, sim) =
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
        in (newGraph, newSimulation numIterations newGraph)
      Nothing ->
          -- no new edge, but update player location because they're on a destination
          ( {wikigraph | playerLocations=Dict.insert player (reachedTitle, reachedTitle) wikigraph.playerLocations}
          , sim
          )

tickWikiGraphSim : WikiGraphState -> WikiGraphState
tickWikiGraphSim (graph, sim) =
  let (newState, refinedNodes) = Force.tick sim graph.nodes
      originalPos nodeId = List.Extra.find (\{id} -> id == nodeId) graph.nodes
        |> Maybe.map (\{x,y} -> {x=x,y=y}) >> Maybe.withDefault {x=0, y=0}

      newNodes = refinedNodes
        |> List.Extra.updateIf isDestinationNode
          (\({id} as n) ->
            -- the destination nodes can slide along the x-axis to accommodate long player paths
            -- otherwise they are fixed on the y-axis
            let {y} = originalPos id in { n | y=y }
          )
  in ({graph | nodes=newNodes}, newState)

{-| step through the force simulation and return an updated wikigraph
-}
subscription : WikiGraphState -> Sub WikiGraphState
subscription (graph, sim) =
    if Force.isCompleted sim then Sub.none
    else Browser.Events.onAnimationFrame (\_ -> tickWikiGraphSim (graph, sim))
