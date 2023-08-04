module Types exposing (..)

import Element exposing (Color)
import Random exposing (Seed)
import Dict exposing (Dict)
import List.Extra
import Html exposing (Html)
import Either exposing (Either(..))
import List.Nonempty as Nonempty exposing (Nonempty(..))
import Set as Set exposing (Set)
import Maybe.Extra
import Time

{-| wikipedia page article title
-}
type alias Title = String

{-| ignore the wikipedia pages from these namespaces
-}
unwantedNamespaces =
    [ "File", "Special", "Wikipedia", "Category", "Talk", "Help", "Template", "Template talk", "Wikipedia talk", "Portal", "Wikt" ]

isArticleNamespace : String -> Bool
isArticleNamespace title = List.all (\ns -> not <| String.startsWith (ns ++ ":") title) unwantedNamespaces

-- TODO make this a hierarchical type rather than indexed 
type alias Section = { level : Int, anchor : String}

{-| loaded page that a user can view and click links on
-}
type alias Page msg = {title : Title, sections : List Section, content : Html msg}


type alias PagePreview =
    { title : Title
    , thumbnail : Maybe {src : String, width : Float, height : Float}
    , description : Maybe String
    , shortdescription : Maybe String
    }

{-| a destination list has at least two destination titles (a start page and at least one goal page)
-}
type DestinationList = DestinationList PagePreview PagePreview (List PagePreview)

destinationListLength (DestinationList _ _ rest) = List.length rest + 2 

destinationsToList (DestinationList first second remaining) = first :: second :: remaining

{-| sequence of steps made trying to reach a goal title
-}
type alias Leg = { start : Title, steps : List Title, goal : Title }

type CompleteLeg = Complete Leg
type IncompleteLeg = Incomplete Leg

legOfComplete (Complete leg) = leg
legOfIncomplete (Incomplete leg) = leg

getStart : Either IncompleteLeg CompleteLeg -> Title
getStart = Either.unpack
    (legOfIncomplete >> .start)
    (legOfComplete >> .start)


getGoal : Either IncompleteLeg CompleteLeg -> Title
getGoal = Either.unpack
    (legOfIncomplete >> .goal)
    (legOfComplete >> .goal)

getSteps : Either IncompleteLeg CompleteLeg -> List Title
getSteps = Either.unpack
    (legOfIncomplete >> .steps)
    (legOfComplete >> .steps)

currentPageOfLeg : Either IncompleteLeg CompleteLeg -> Title
currentPageOfLeg leg = case leg of
    Left (Incomplete {start, steps}) ->
        List.Extra.last steps |> Maybe.withDefault start
    Right (Complete {goal}) -> goal


initLeg : Title -> Title -> IncompleteLeg
initLeg start goal = Incomplete {start=start, steps=[], goal=goal}


getCurrentLeg : Either IncompletePath CompletePath -> Either IncompleteLeg CompleteLeg
getCurrentLeg = Either.unpack
    (.currentLeg >> Left)
    (.legs >> Nonempty.last >> Right)

currentPage : Either IncompletePath CompletePath -> Title
currentPage = getCurrentLeg >> currentPageOfLeg

type alias IncompletePath =
    { previousLegs : List CompleteLeg
    , currentLeg : IncompleteLeg
    , touchedTitles : Set Title
    , remainingDestinations : List Title
    }

type alias CompletePath = { touchedTitles : Set Title, legs : Nonempty CompleteLeg}

type GameState
    = Finished { path : CompletePath, time : Int }
    | Unfinished { path : IncompletePath, startTime : Time.Posix }
    | DNF { path : IncompletePath, time : Int }


getPath : GameState -> Either IncompletePath CompletePath
getPath game = case game of
    Unfinished {path} -> Left path
    Finished {path} -> Right path
    DNF {path} -> Left path

currentLegFromGameState : GameState -> Either IncompleteLeg CompleteLeg
currentLegFromGameState = getPath >> getCurrentLeg

currentPageFromGameState : GameState -> Title
currentPageFromGameState = getPath >> currentPage

getTouchedTitles : Either IncompletePath CompletePath -> Set Title
getTouchedTitles = Either.unpack .touchedTitles .touchedTitles

{-| each player has a unique id
-}
type alias PeerId = String

type alias Player a = { a | name : String, color : Color }

type alias PlayerList a = Dict PeerId (Player a) 

type alias LoadingDestinationList = List PagePreview

{-| informations pertaininig to a user's game
-}
type alias GameInfo self players destinations =
    { uuid : Maybe PeerId
    , seed : Seed
    , destinations : destinations
    , numDestinations : Int
    , amHost : Bool
    , players : PlayerList players
    , self : Player self
    }

{-| lobby state
-}
type alias Lobby = GameInfo {} {}
    (Either LoadingDestinationList DestinationList)


{-| game state in progress
-}
type alias InProgressGame = GameInfo
    {path : Maybe (IncompletePath, Time.Posix)}    -- self
    {gameState : Maybe GameState, connected : Bool}   -- other players
    DestinationList

type alias PostGame = GameInfo
    {path : Either IncompletePath CompletePath, time : Int}
    {gameState : Maybe GameState, connected : Bool}
    DestinationList

{-
    Some common functions operating on our basic types
-}

{-| retrieve list of all the players in the game including yourself
-}
lobbyPlayers : Lobby -> PlayerList {}
lobbyPlayers lobby = case lobby.uuid of
    Just uuid -> Dict.insert uuid lobby.self lobby.players
    Nothing -> lobby.players


{-| retrieve list of all the players in the game including yourself
-}
inGamePlayers : InProgressGame -> PlayerList {gameState : Maybe GameState, connected : Bool}
inGamePlayers game =
    let self = let {color, name, path} = game.self in
            { color=color, name=name, connected=True
            , gameState=Maybe.map
                (\(currentPath, startTime) -> Unfinished {path=currentPath, startTime=startTime})
                path
            }
    in case game.uuid of
        Just uuid -> Dict.insert uuid self game.players
        Nothing -> game.players

{-| retrieve list of all the players in the game including yourself
-}
postGamePlayers : PostGame -> PlayerList {gameState : Maybe GameState, connected : Bool}
postGamePlayers game =
    let
        self = let {color, name, time, path} = game.self in
            case path of
                Left incomplete ->
                    {color=color, name=name, gameState=Just <| DNF {path=incomplete, time=time}, connected=True}
                Right complete ->
                    {color=color, name=name, gameState=Just <| Finished {path=complete, time=time}, connected=True}
    in case game.uuid of
        Just uuid -> Dict.insert uuid self game.players
        Nothing -> game.players

allPlayerColors : GameInfo a b c -> List Color
allPlayerColors {players, self} =
    self.color :: List.map .color (Dict.values players)

allPlayerColorsInLobby : Lobby -> List Color
allPlayerColorsInLobby {players, self} = self.color :: List.map .color (Dict.values players)


updatePlayer : PeerId -> (Maybe (Player b) -> Maybe (Player b)) -> GameInfo a b c -> GameInfo a b c
updatePlayer uuid updater game = {game | players=Dict.update uuid updater game.players}


playerConnectToLobby : {uuid : PeerId, name : String, color : Color} -> Lobby -> Lobby
playerConnectToLobby {uuid, name, color} lobby =
    updatePlayer uuid (\_ -> Just {name=name, color=color}) lobby

playerConnect : {uuid : PeerId, name : String, color : Color}
    -> GameInfo a {gameState : Maybe GameState, connected : Bool} c
    -> GameInfo a {gameState : Maybe GameState, connected : Bool} c
playerConnect {uuid, name, color} game = updatePlayer uuid
    (\entry -> case entry of
        Just player -> Just {player | connected=True}
        Nothing -> Just {name=name, color=color, gameState=Nothing, connected=True}
    )
    game

disconnectPlayer : PeerId
    -> GameInfo a { b | connected : Bool } c
    -> GameInfo a { b | connected : Bool } c
disconnectPlayer id = updatePlayer id
    (Maybe.map <| \player -> {player | connected=False})

removePlayer : PeerId -> GameInfo a b c -> GameInfo a b c
removePlayer id = updatePlayer id (always Nothing)

{-|update the given leg of a wiki path

if the given title has been visited, then backtrack back to it by popping off pages from the visited list
-}
updateLeg : Title -> IncompleteLeg -> Either IncompleteLeg CompleteLeg
updateLeg newPage (Incomplete {start, steps, goal}) =
    -- going back to the start page will bring you back to initial leg state
    if newPage == start then Left (initLeg start goal)
    -- finding the goal page will complete the leg
    else if newPage == goal then Right (Complete {start=start, steps=steps, goal=goal})
    else
    -- if the new page has already been visited then backtrack to it
    case List.Extra.dropWhileRight (not << (==) newPage) steps of
        [] -> -- page hasn't been seen
            Left
            <| Incomplete {start=start, steps=steps++[newPage], goal=goal}
        path -> 
            Left <| Incomplete {start=start, steps=path, goal=goal}

setCurrentLeg : IncompleteLeg -> IncompletePath -> IncompletePath
setCurrentLeg leg path = {path | currentLeg=leg}

pushCompleteLeg : CompleteLeg -> List CompleteLeg -> Nonempty CompleteLeg
pushCompleteLeg leg previousLegs = Nonempty leg (List.reverse previousLegs) |> Nonempty.reverse


finishLeg : CompleteLeg -> IncompletePath -> Either IncompletePath CompletePath
finishLeg (Complete leg) path = case path.remainingDestinations of
    nextGoal :: remaining -> Left <|
        {path 
        | previousLegs=path.previousLegs ++ [Complete leg]
        , currentLeg=initLeg leg.goal nextGoal
        , remainingDestinations=remaining
        }
    [] -> Right {touchedTitles=path.touchedTitles, legs=pushCompleteLeg (Complete leg) path.previousLegs}


initPath : Title -> Title -> List Title -> IncompletePath
initPath first second remaining =
    { previousLegs=[]
    , currentLeg=initLeg first second
    , remainingDestinations=remaining
    , touchedTitles=Set.singleton first
    }

initPathFromDestinationList : DestinationList -> IncompletePath
initPathFromDestinationList (DestinationList first second remaining) =
    initPath first.title second.title (List.map .title remaining)

{-| replace the path's current leg, or progress to the next goal
-}
updatePathWithLeg : Either IncompleteLeg CompleteLeg -> IncompletePath -> Either IncompletePath CompletePath
updatePathWithLeg progress path =
    let
        touchTitles titles somePath =
            { somePath | touchedTitles=List.foldl Set.insert somePath.touchedTitles titles}
    in case progress of
        Left (Incomplete leg) -> setCurrentLeg (Incomplete leg) path
            |> touchTitles (leg.start :: leg.steps)
            |> Left
        Right (Complete leg) -> touchTitles (leg.start :: leg.goal :: leg.steps) path
            |> finishLeg (Complete leg)


updateGameStateWithLeg : Either IncompleteLeg CompleteLeg -> Time.Posix -> GameState -> GameState
updateGameStateWithLeg leg now game =
    case game of
        Unfinished {path, startTime} ->
            case updatePathWithLeg leg path of
                Left incomplete -> Unfinished {path=incomplete, startTime=startTime}
                Right complete -> Finished {path=complete, time=Time.posixToMillis now - Time.posixToMillis startTime}
        _ -> game



{-| given a player's current leg, update their gamestate
-}
updatePlayerGameState : PeerId -> Time.Posix -> Either IncompleteLeg CompleteLeg
    -> GameInfo b {a | gameState : Maybe GameState} DestinationList
    ->
    ( GameInfo b {a | gameState : Maybe GameState} DestinationList
    , Either IncompletePath CompletePath
    )
updatePlayerGameState id time leg game =
    let 
        -- use this default gamestate if this is the first 
        default = updateGameStateWithLeg leg time <|
            Unfinished {path=initPathFromDestinationList game.destinations, startTime=time}

        newGame = updatePlayer id
            (Maybe.map (\player ->
                    { player
                    | gameState=Maybe.Extra.or
                        (Maybe.map (updateGameStateWithLeg leg time) player.gameState)
                        (Just default)
                    }
                )
            )
            game
    in (newGame, getPlayerPath id newGame.players |> Maybe.withDefault (getPath default))

getPlayerPath : PeerId -> PlayerList {a | gameState : Maybe GameState}
    -> Maybe (Either IncompletePath CompletePath)
getPlayerPath id players = Dict.get id players
    |> Maybe.andThen (.gameState >> Maybe.map getPath)

isGameComplete : GameState -> Bool
isGameComplete game = case game of
    Finished _ -> True
    _ -> False

{-| return if the given destination title has been met in the path
-}
metDestination : Title -> IncompletePath -> Bool
metDestination title {previousLegs, currentLeg} =
    let touched {start, goal} = start == title || goal == title
    in  (legOfIncomplete currentLeg |> .start |> (==) title)
        || List.any (legOfComplete >> touched) previousLegs

{-| return a list of the completed legs (paths between two destinations) from a player's game
-}
getCompletedLegs : GameState -> List CompleteLeg
getCompletedLegs state = Either.unpack
    .previousLegs
    (.legs >> Nonempty.toList)
    (getPath state)


{-| get the total number of steps from a player's game
-}
numSteps : GameState -> Int
numSteps game =
    let incompleteLegSteps (Incomplete {steps}) = List.length steps
        completeLegSteps (Complete {steps}) = List.length steps + 1
    in case getPath game of
        Right path ->
            List.sum <| List.map completeLegSteps <| Nonempty.toList path.legs
        Left path ->
            List.sum (List.map completeLegSteps path.previousLegs) + incompleteLegSteps path.currentLeg


type alias Pos a = {a | x : Float, y : Float}

subtract : Pos a -> Pos b -> Pos {}
subtract a b = {x=a.x - b.x, y=a.y - b.y}

dist : Pos a -> Pos b -> Float
dist a b = sqrt <| (a.x - b.x)*(a.x - b.x) + (a.y - b.y)*(a.y - b.y)

angleOf : Pos a -> Float
angleOf {x,y} = (atan2 y x) * 180 / pi

rotate : Float -> Pos a -> Pos b -> Pos b
rotate degrees pivot vec =
    let radians = degrees * pi / 180
    in
    { vec
    | x=pivot.x + (cos radians)*(vec.x - pivot.x) - (sin radians)*(vec.y - pivot.y)
    , y=pivot.y + (sin radians)*(vec.x - pivot.x) + (cos radians)*(vec.y - pivot.y)
    }