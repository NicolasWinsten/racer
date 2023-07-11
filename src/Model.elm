module Model exposing (..)

import Time
import Either exposing (Either(..))
import Random exposing (Seed)
import Types exposing (..)
import WikiGraph exposing (WikiGraphState)
import Toast exposing (Toasts)
import PeerPort
import PathFinder

{- Model and Msg types, along with some other helper types -}

{-| settings for the welcome screen
-}
type alias WelcomeOpts =
    { inputJoinId : String
    , inputName : String
    , uuid : Maybe PeerId
    , seed : Seed
    , displayPages : (Maybe PagePreview, Maybe PagePreview)
    , wikigraph : Maybe WikiGraphState
    , pathfinder : PathFinder.Model
    }


type Phase
    -- user is at the welcome screen, choosing username or typing in joinId
    = Welcome WelcomeOpts
    -- user is in the pregame lobby waiting for host to start
    -- host can reroll for new destinations or change the number of destinations
    | Lobby Lobby { numDestinationsInput : Int }
    -- user is currently in game and viewing a wikipedia article
    | InGame (Either Title (Page Msg)) InProgressGame
        { currentTime : Maybe Time.Posix
        , displayToc : Bool
        }
        WikiGraphState
        PathFinder.Model
    -- user has finished the game
    | PostGameReview PostGame WikiGraphState PathFinder.Model

type alias Model = {phase : Phase, toasts : Toasts} 


{-| these are the msgs that I want to stamp with the time received
-}
type TimeDependentMsg
    = PathFinderRequest PathFinder.Msg
    | LoadedPage Title (Result String (Page Msg))

type Msg
    = LoadedDestinationPreview Title (Result String PagePreview)
    | LoadedWelcomePreview (Result String PagePreview)
    | ClickedLink Title
    | ClickedJoinGame
    | ClickedHostGame
    | ClickedStartGame
    | ClickedNewGame
    | RefreshLobby
    | ClickedGiveUp
    | OnInputWelcomeParams { name : String, joinId : String }
    | OnInputLobbyParams { numDestinations : Int }
    | Tick Time.Posix
    | WikiGraphMsg WikiGraph.WikiGraphMsg
    | AnimationFrame Time.Posix
    | PeerMsg PeerPort.PeerMsg
    | ToastMsg Toast.ToastMsg
    | CopyToClipboard String
    | DisplayToc Bool
    | ReceivedMsgThatNeedsTime TimeDependentMsg
    | MsgWithTime TimeDependentMsg Time.Posix
    | NoOp
