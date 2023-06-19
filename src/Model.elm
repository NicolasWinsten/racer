module Model exposing (..)

import Time
import Either exposing (Either(..))
import Random exposing (Seed)
import Types exposing (..)
import WikiGraph exposing (WikiGraphState)
import Toast exposing (Toasts)

{- Model and Msg types, along with some other helper types -}

{-| settings for the welcome screen
-}
type alias WelcomeOpts =
    { inputJoinId : String
    , inputName : String
    , uuid : Maybe PeerId
    , seed : Seed
    , displayPages : (Maybe PagePreview, Maybe PagePreview)
    }

{-| additional parameters for the lobby
-}
type alias LobbyOpts = { numDestinationsInput : Int }

type Phase
    -- user is at the welcome screen, choosing username or typing in joinId
    = Welcome WelcomeOpts
    -- user is in the pregame lobby waiting for host to start
    -- host can reroll for new destinations or change the number of destinations
    | Lobby Lobby LobbyOpts
    -- user is currently in game and viewing a wikipedia article
    | InGame (Either Title (Page Msg)) InProgressGame
        { startTime : Time.Posix
        , currentTime : Time.Posix
        , displayToc : Bool
        }
        WikiGraphState
    | PostGameReview InProgressGame WikiGraphState

type alias Model = {phase : Phase, toasts : Toasts} 


{-| types of messages sent to other players P2P

TODO move this to PeerPort
-}
type PeerMsg
    -- send lobby info when making changes to the lobby, or to joining players
    = LobbyInfoMessage
        { players : PlayerList InLobbyAttributes
        , destinations : List PagePreview
        }
    -- send gamestate info to players to start the game
    | GameStateMessage
        { players : PlayerList InGameAttributes
        , destinations : List PagePreview
        }
    | PlayerReachedTitle PeerId Title Int   -- uuid, wikipage title, time in milliseconds it took to reach
    | PeerConnected PeerId String       -- uuid, username
    | PeerDisconnected PeerId           -- uuid
    | HostLost      -- connection to host lost
    | Error String  -- error with peerJS

type Msg
    = LoadedPage Title (Result String (Page Msg)) Time.Posix -- requested title, content node of that page
    | LoadedDestinationPreview Title (Result String PagePreview)
    | LoadedWelcomePreview (Result String PagePreview)
    | ClickedLink Title
    | ClickedJoinGame
    | ClickedHostGame
    | ClickedStartGame
    | ClickedNewGame
    | RefreshLobby
    | ReadyToStartGame Time.Posix
    | GiveUp
    | OnInputWelcomeParams { name : String, joinId : String }
    -- host can adjust the the number of destinations while in lobby
    | OnInputLobbyParams { numDestinations : Int }
    -- some ticks for updating the display pages and time display
    | Tick Time.Posix
    | WikiGraphMsg WikiGraph.WikiGraphMsg
    | PeerMsg PeerMsg
    | ToastMsg Toast.ToastMsg
    | CopyToClipboard String
    | DisplayToc Bool
    | NoOp
