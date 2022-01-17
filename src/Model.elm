module Model exposing (..)

import Dict exposing (Dict)
import Http
import PageFetch
import PeerPort
import Time



{- Model and Msg types, along with some other helper types -}


type alias Destination =
    PageFetch.PageContent


type LoadingDestination
    = Loading String
    | Loaded Destination --TODO add scenario for an error loading that page


extractLoadedDestinations : List LoadingDestination -> List Destination
extractLoadedDestinations loads =
    case loads of
        (Loaded page) :: rest ->
            page :: extractLoadedDestinations rest

        _ :: rest ->
            extractLoadedDestinations rest

        [] ->
            []


destIsLoaded : LoadingDestination -> Bool
destIsLoaded dest =
    case dest of
        Loaded _ ->
            True

        _ ->
            False


doneLoading : List LoadingDestination -> Bool
doneLoading =
    List.all destIsLoaded



{- replace the Loading item in the list with its Loaded page -}


replaceWithLoaded : Destination -> List LoadingDestination -> List LoadingDestination
replaceWithLoaded dest loadingDests =
    case loadingDests of
        (Loading title) :: rest ->
            if dest.title == title then
                Loaded dest :: rest

            else
                Loading title :: replaceWithLoaded dest rest

        first :: rest ->
            first :: replaceWithLoaded dest rest

        [] ->
            []


type alias Peer =
    { uuid : Int, username : String, lastDest : String, time : Int, path : List String, isHost : Bool, finished : Bool, currentTitle : String }


emptyPeer : Peer
emptyPeer =
    { uuid = 0, username = "", lastDest = "", time = 0, path = [], isHost = False, finished = False, currentTitle = "" }


type alias Options =
    { uuid : Int, username : String, numDestinations : Int, seedStr : String, isHost : Bool, peerId : String, joinId : String }


changeUsername options string =
    ChangeOptions { options | username = string }


changeNumDestinations options num =
    ChangeOptions { options | numDestinations = Maybe.withDefault 3 <| String.toInt num }


changeSeed options seedStr =
    ChangeOptions { options | seedStr = seedStr }


changeJoinId options id =
    ChangeOptions { options | joinId = id }


type alias WikiLadder =
    List Destination


type Msg
    = GotPage String (Result Http.Error Destination) -- title, content node of that page
    | GotDescription String (Result Http.Error Destination) -- short description and image for a page
    | ClickedLink String -- link title
    | ClickedJoinOrHost { isHost : Bool }
    | Refresh
    | StartGame
    | GiveUp
    | ChangeOptions Options
    | ChangeOptsWhileInPreview { seed : String, numDests : Int }
    | GoBack
    | Tick Time.Posix
    | PeerMsg PeerPort.PeersMsg
    | GotUUID Int
    | ClickedNewGame
    | ToggleReviewPlayer Int --uuid of player to highlight in Review window
    | NoOp


type Window
    = InPage Destination
    | Fetching String
    | PreGame
    | Preview
    | Review (List Int) --uuids of players to compare
    | Bad String


type alias GameState =
    { path : WikiLadder, remainingDests : WikiLadder, pastDests : WikiLadder, time : Int }


type alias Model =
    { window : Window
    , gameState : GameState
    , dests : WikiLadder
    , loadingDests : List LoadingDestination
    , options : Options
    , peers : Dict Int Peer
    , seedChange : String
    , numDestsChange : Int
    , gameStarted : Bool
    }
