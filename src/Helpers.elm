module Helpers exposing
    ( cmdIf
    , generateColorForNewPlayer
    , msToDisplayTime
    , initialGameState
    , updateGameState
    , isGameFinished
    , legToList
    , getCompletedLegs
    , gameStateToList
    , unwantedNamespaces
    , decodeTitle
    , encodeTitle
    , allPlayers
    , legParts
    , numSteps
    , window
    , strToSeed
    )

import Array exposing (Array)
import Bitwise
import Random
import Element exposing (Color, rgb255, rgb, toRgb)
import Dict
import Types exposing (..)
import List.Extra
import Random.Array
import Url
import Tuple


decodeTitle : String -> Maybe Title
decodeTitle = Url.percentDecode >> Maybe.map (String.replace "_" " ")

encodeTitle : Title -> String
encodeTitle = String.replace " " "_" >> Url.percentEncode

{-| guard a Cmd with a boolean flag
if the flag is False, then No-op
-}
cmdIf : Bool -> Cmd msg -> Cmd msg
cmdIf flag cmd = if flag then cmd else Cmd.none

colorPool : Array Color
colorPool =
    Array.fromList
        [ rgb255 222 120 132
        , rgb255 181 4 24
        , rgb255 235 167 89
        , rgb255 180 93 217
        , rgb255 153 207 91
        , rgb255 100 192 232
        , rgb255 223 176 245
        ]

randomColor : Random.Generator Color
randomColor = let float = Random.float 0 0.75 in Random.map3 rgb float float float


{-| given a list of player colors in use, generate an unused color
-}
generateColorForNewPlayer : List Color -> Random.Seed -> Color
generateColorForNewPlayer playerColors seed_ =
    let
        seed = case playerColors of
            [] -> seed_
            some -> some
                |> List.map (toRgb >> .red >> String.fromFloat)
                |> List.sort >> String.concat >> strToSeed 

        unusedColors = Array.filter
            (\c -> not <| List.member c playerColors)
            colorPool

    -- try and pick out an unused color from the pool
    -- otherwise randomly generate a color
    in case Random.step (Random.Array.sample unusedColors) seed of
        (Just c, _) -> c
        _ -> Tuple.first <| Random.step randomColor seed

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

strToSeed : String -> Random.Seed
strToSeed s =
    let
        hash =
            String.foldl (\c h -> (h |> Bitwise.shiftLeftBy 5) + h + Char.toCode c) 5381 s
    in
    Random.initialSeed hash


msToDisplayTime : Int -> {min : Int, sec : Int, ms : Int}
msToDisplayTime ms =
    let
        mins = ms // 60000
        secs = (ms // 1000) - (60*mins)
        msleft = ms - secs*1000 - mins*60000
    in {min=mins, sec=secs, ms=msleft}


{-| ignore the wikipedia pages from these namespaces
-}
unwantedNamespaces =
    [ "File", "Special", "Wikipedia", "Category", "Talk", "Help", "Template", "Template_talk", "Portal" ]



{-| give a sliding window of the given list of size two

    window [1,2,3,4] = [(1,2), (2,3), (3,4)]
-}
window : List a -> List (a, a)
window xs = case xs of
    first :: second :: rest ->
        List.Extra.scanl (\item (a, b) -> (b, item)) (first, second) rest
    _ -> []

