module Types exposing (..)

import Element exposing (Color)
import Random exposing (Seed)
import Dict exposing (Dict)
import List.Extra
import Html exposing (Html)
import Either exposing (Either(..))

{-| wikipedia page article title
-}
type alias Title = String


type alias Section = { level : Int, anchor : String}

{-| loaded page that a user can view and click links on
-}
type alias Page msg = {title : Title, content : Html msg, sections : List Section } -- TODO don't store Node, store Html


type alias PagePreview =
    { title : Title
    , thumbnail : Maybe {src : String, width : Float, height : Float}
    , description : Maybe String
    , shortdescription : Maybe String
    }

{-| sequence of steps made trying to reach a goal title
-}
type alias Leg = { previousPages : List Title, currentPage : Title, goal : Title }

{-| a game with multiple goal titles where each path from one destination to the next is a leg
-}
type alias GameState =
    { previousLegs : List Leg          -- completed paths between destination titles
    , currentLeg : Leg                  -- current path being worked on
    , remainingDestinations : List Title
    , finishTime : Maybe Int  -- number of milliseconds taken to finish the game
    }

-- TODO better model:
{-
type CompletedLeg = (Title, List Title, Title)

type InCompleteLeg = {previousPages : List Title, currentPage : Title, goal : Title}

type alias IncompleteGame =
    { previousLegs : List CompletedLeg
    , currentLeg : IncompleteLeg
    , remainingDestinations : List Title
    }

type alias CompleteGame = { legs : List CompletedLeg, finishTime : Int }

type GameState
    = Finished CompleteGame
    | UnFinished IncompleteGame
    | DNF IncompleteGame Int (time)

-}

{-| each player has a unique id
-}
type alias PeerId = String

type alias Player a = { a | name : String, color : Color }

type alias PlayerList a = Dict PeerId (Player a) 

{-| informations pertaininig to a user's game
-}
type alias GameInfo b =
    { uuid : Maybe PeerId
    , seed : Seed
    , destinations : List PagePreview
    , numDestinations : Int
    , amHost : Bool
    , players : PlayerList b
    , self : Player b
    }

{-| extra attributes players have while in lobby
-}
type alias InLobbyAttributes = {}

{-| extra attributes players have while in game
-}
type alias InGameAttributes = {gameState : GameState, connected : Bool}

{-| lobby state
-}
type alias Lobby = GameInfo InLobbyAttributes

{-| game state in progress
-}
type alias InProgressGame = GameInfo InGameAttributes


{-
    Some common functions operating on our basic types
-}

{-| retrieve list of all the players in the game including yourself
-}
allPlayers : GameInfo b -> List (Player b)
allPlayers game = game.self :: Dict.values game.players

{-|update the given leg of a wiki path

if the given title has been visited, then backtrack back to it by popping off pages from the visited list
-}
updateLeg : Title -> Leg -> Leg
updateLeg newPage leg = case List.Extra.dropWhile (not << (==) newPage) leg.previousPages of
    [] -> -- page hasn't been seen
        if newPage == leg.currentPage then leg -- if it's the same title as the one we're on then do nothing
        else
            { previousPages = leg.currentPage :: leg.previousPages, currentPage = newPage, goal = leg.goal}
    backtrackedPage :: previousPages -> 
        { previousPages=previousPages, currentPage=newPage, goal = leg.goal}

{-| update the gamestate with a new title to add to the path
-}
updateGameState : Title -> GameState -> GameState
updateGameState title game =
    let
        newLeg = updateLeg title game.currentLeg
    in
    if newLeg.currentPage == newLeg.goal then
        case game.remainingDestinations of
            (nextGoal :: rem) ->
                { game
                | previousLegs=newLeg :: game.previousLegs
                , currentLeg={previousPages=[], currentPage=title, goal=nextGoal}
                , remainingDestinations=rem
                }
            [] -> { game | currentLeg=newLeg }
    else { game | currentLeg=newLeg }

isGameFinished : GameState -> Bool
isGameFinished game =
    game.currentLeg.currentPage == game.currentLeg.goal && List.isEmpty game.remainingDestinations


{-|convert a leg to full sequence of titles representing the path taken
-}
legToList : Leg -> List Title
legToList leg = leg.currentPage :: leg.previousPages |> List.reverse

{-| deconstruct the leg into its starting title, the destination title,
and the list of titles in between connecting them

-}
legParts : Leg -> (Title, List Title, Title)
legParts {previousPages, currentPage, goal} = case List.reverse previousPages of
    (start :: previousSteps) ->
        if currentPage == goal then (start, previousSteps, goal)
        else (start, previousSteps ++ [currentPage], goal)
    [] ->
        (currentPage, [], goal)

gameStateToList : GameState -> List Title
gameStateToList game =
    let removeAdjacentDupes xs = case xs of
            (x1 :: x2 :: rest) ->
                if x1 == x2 then removeAdjacentDupes (x2 :: rest)
                else x1 :: removeAdjacentDupes (x2 :: rest)
            butt -> butt
    in game.currentLeg :: game.previousLegs
        |> List.reverse
        |> List.concatMap legToList
        |> removeAdjacentDupes

{-| return the destinations that have been reached
-}
getMetDestinations : GameState -> List Title
getMetDestinations ({previousLegs, currentLeg} as game) = currentLeg :: previousLegs
    |> List.map (\leg -> let (start, _, _) = legParts leg in start)
    |> (++) (if isGameFinished game then [currentLeg.currentPage] else [])

{-| return a list of the completed legs (paths between two destinations) from a player's game
-}
getCompletedLegs : GameState -> List Leg
getCompletedLegs state = List.reverse <|
    if state.currentLeg.currentPage == state.currentLeg.goal then
        state.currentLeg :: state.previousLegs
    else
        state.previousLegs

{-|construct an initial game state given a list of destinations
(the list of destinations must contain at least two titles or else return Nothing)
-}
initialGameState : List Title -> Maybe GameState
initialGameState destinations = case destinations of
    start :: second :: remaining -> Just <|
        { previousLegs=[]
        , currentLeg = {previousPages=[], currentPage=start, goal=second}
        , remainingDestinations=remaining
        , finishTime = Nothing
        }
    _ -> Nothing

{-| get the total number of steps from a player's game
-}
numSteps : GameState -> Int
numSteps {previousLegs, currentLeg} =
    let stepsInLeg leg = List.length leg.previousPages
    in stepsInLeg currentLeg + List.sum (List.map stepsInLeg previousLegs)
