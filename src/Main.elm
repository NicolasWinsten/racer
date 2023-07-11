port module Main exposing (main)

import Browser
import Browser.Dom
import Dict
import Helpers exposing (..)
import Model exposing (..)
import Types exposing (..)
import PageFetch
import PeerPort
import Random
import Task
import Time
import Views exposing (view)
import Articles
import Either exposing (Either(..))
import Random.List
import WikiGraph
import Toast
import PeerPort exposing (PeerMsg(..))
import Browser.Events
import PathFinder
import Log
import Platform.Cmd as Cmd
import WikiGraph

{-| retrieve the content of a wikipedia page along with the current time when it is loaded
-}
getPage : Title -> Cmd Msg
getPage title = (PageFetch.getPage ClickedLink title)
    |> Cmd.map (ReceivedMsgThatNeedsTime << LoadedPage title)

{-| retrieve summary of a wikipedia article (thumbnail, description)
to be displayed in the game lobby (and sent to the other players if hosting)
-}
getPreview : Title -> Cmd Msg
getPreview title = PageFetch.getPreview title
    |> Cmd.map (LoadedDestinationPreview title)

{-| load the preview of an example title at the welcome screen
-}
getWelcomePreview : Title -> Cmd Msg
getWelcomePreview title = PageFetch.getPreview title
    |> Cmd.map LoadedWelcomePreview

{-| scroll back up to top of page
-}
goBackToTop : Cmd Msg
goBackToTop =
    Task.perform (\_ -> NoOp) (Browser.Dom.setViewport 0 0)

{-| number of rounds of force calculations to perform for wikigraph layout
while in game

it is low so as to not effect gameplay
-}
forceItersWhileInGame = 50

{-| number of rounds of force calculations to perform for wikigraph layout
while in post game review
-}
forceItersPostGame = 2000

{-| copy the given string to the user's clipboard
-}
port copyToClipboard : String -> Cmd msg

{-| create a message containing information about the lobby
 (we send this to any players that want to join or if the lobby settings have changed)
-}
lobbyInfoMessage : Lobby -> PeerPort.PeerMsg
lobbyInfoMessage lobby = PeerPort.LobbyInfoMessage
    { players = lobbyPlayers lobby 
    , destinations = Either.toMaybe lobby.destinations
    }

{-| create a message containing the information of a game in progress.
This is sent whenever a new game is started or to any late-joining players
-}
gameStateMessage : Either InProgressGame PostGame -> PeerPort.PeerMsg
gameStateMessage game = PeerPort.GameStateMessage <| case game of
    Left ingame -> 
        { players = inGamePlayers ingame
        , destinations = ingame.destinations
        }
    Right postgame -> 
        { players = postGamePlayers postgame
        , destinations = postgame.destinations
        }


{-| create the lobby state from the lobby info sent by the host,
will return Nothing if the lobby info does not mention you
-}
receiveLobbyInfo : {a | uuid : Maybe PeerId, seed : Random.Seed}
    -> PeerPort.LobbyMessage
    -> Maybe Lobby
receiveLobbyInfo {uuid, seed} {players, destinations} = uuid
    |> Maybe.andThen (\id -> Dict.get id players)
    |> Maybe.map (\self ->
        { uuid=uuid
        , seed=seed
        , destinations=Either.fromMaybe [] destinations
        -- remove yourself from the host's player list
        , players=uuid
            |> Maybe.map (\id -> Dict.remove id players)
            |> Maybe.withDefault players
        , numDestinations=Maybe.map destinationListLength destinations
            |> Maybe.withDefault 0
        , amHost=False
        , self=self
        }
    )

{-| create a game state from the info sent by the host,
will return nothing if the lobby info does not mention you
-}
receiveGameInfo : {a | uuid : Maybe PeerId, seed : Random.Seed}
    ->  PeerPort.GameMessage
    -> Maybe (Either InProgressGame PostGame)
receiveGameInfo {uuid, seed} {players, destinations} =
    let setSelf self = 
            { uuid=uuid
            , seed=seed
            , destinations=destinations
            -- remove yourself from the host's player list
            , players=uuid
                |> Maybe.map (\id -> Dict.remove id players)
                |> Maybe.withDefault players
            , numDestinations=destinationListLength destinations
            , amHost=False
            , self=self
            }
    in
    uuid
    |> Maybe.andThen (\id -> Dict.get id players)
    |> Maybe.map (\self -> case self.gameState of
        Just (Unfinished {path, startTime}) -> 
            Left <| setSelf {color=self.color, name=self.name, path=Just (path, startTime)}
        Just (Finished {path, time}) ->
            Right <| setSelf {color=self.color, name=self.name, path=Right path, time=time}
        Just (DNF {path, time}) ->
            Right <| setSelf {color=self.color, name=self.name, path=Left path, time=time}
        Nothing ->
            Left <| setSelf {color=self.color, name=self.name, path=Nothing}
    )

{-| convert lobby information to game information to start the game
-}
lobbyToGame : Lobby -> DestinationList -> InProgressGame
lobbyToGame lobby destinations =
    let mkPlayer {name, color} = {name=name, color=color, gameState=Nothing, connected=True}
    in
    { uuid=lobby.uuid
    , seed=lobby.seed
    , destinations=destinations
    , numDestinations=destinationListLength destinations
    , amHost=lobby.amHost
    , players=Dict.map (\id player -> mkPlayer player) lobby.players
    , self={name=lobby.self.name, color=lobby.self.color, path=Nothing}
    }

{-
helper functions to manipulate (Model, Cmd Msg)
-}

type alias ModelCmd = (Model, Cmd Msg)

{-| append a snackbar message to display
-}
withToast : (String -> Toast.ToastMsg) -> String -> ModelCmd -> ModelCmd
withToast toaster message (model, cmds) =
    ({model | toasts=Toast.update (toaster message) model.toasts}, cmds)

-- withToasts : (String -> Toast.ToastMsg) -> List String -> ModelCmd -> ModelCmd
-- withToasts toaster messages model = List.foldl (withToast toaster) model messages
andCmd : Cmd Msg -> ModelCmd -> ModelCmd
andCmd cmd (model, otherCmds) = (model, Cmd.batch [otherCmds, cmd])

withLog : String -> ModelCmd -> ModelCmd
withLog info model = andCmd (Log.info info) model

andCmdWithTime : Cmd TimeDependentMsg -> ModelCmd -> ModelCmd
andCmdWithTime cmd = andCmd (Cmd.map ReceivedMsgThatNeedsTime cmd)

withPhase : Phase -> Model -> ModelCmd
withPhase phase model = ({model | phase=phase}, Cmd.none)

setPhase : Phase -> ModelCmd -> ModelCmd
setPhase phase (model, cmds) = withPhase phase model |> andCmd cmds

applyUpdate : Msg -> ModelCmd -> ModelCmd
applyUpdate msg (model, cmds) = update msg model |> andCmd cmds

{-| only issue the command if the guard is true
-}
guardCmd : Bool -> Cmd Msg -> ModelCmd -> ModelCmd
guardCmd guard cmd = when guard (andCmd cmd)

{-| handle another player's move by updating the wikigraph and the player's gamestate
-}
applyPlayerMove : PeerId -> Either IncompleteLeg CompleteLeg -> Time.Posix -> Phase -> Phase
applyPlayerMove player leg time phase = case phase of
    InGame page game opts wikigraph computer ->
        let (newGame, newPath) = updatePlayerGameState player time leg game
        in InGame page newGame opts (WikiGraph.update player newPath forceItersWhileInGame wikigraph) computer
    
    PostGameReview game wikigraph computer ->
        let (newGame, newPath) = updatePlayerGameState player time leg game
        in PostGameReview newGame (WikiGraph.update player newPath forceItersPostGame wikigraph) computer

    _ -> phase

setAiModel : PathFinder.Model -> Phase -> Phase
setAiModel ai phase = case phase of
    Welcome options -> Welcome {options | pathfinder=ai}
    InGame page game opts wikigraph _ -> InGame page game opts wikigraph ai
    PostGameReview game wikigraph _ -> PostGameReview game wikigraph ai
    Lobby lobby opts -> Lobby lobby opts

getAiModel : Phase -> Maybe PathFinder.Model
getAiModel phase = case phase of
    Welcome options -> Just options.pathfinder
    InGame _ _ _ _ ai -> Just ai
    PostGameReview _ _ ai -> Just ai
    Lobby _ _ -> Nothing

getWikiGraph : Phase -> Maybe WikiGraph.WikiGraphState
getWikiGraph phase = case phase of
    Welcome options -> options.wikigraph
    InGame _ _ _ wikigraph _ -> Just wikigraph
    PostGameReview _ wikigraph _ -> Just wikigraph
    _ -> Nothing

setWikiGraph : WikiGraph.WikiGraphState -> ModelCmd -> ModelCmd
setWikiGraph wg (({phase}, _) as model) =
    let
        newphase = case phase of
            Welcome options -> Welcome {options | wikigraph=Just wg}
            InGame page game opts _ computer -> InGame page game opts wg computer
            PostGameReview game _ computer -> PostGameReview game wg computer
            Lobby _ _ -> phase
    in setPhase newphase model
    



wrapAICmd : Cmd PathFinder.Msg -> ModelCmd -> ModelCmd
wrapAICmd cmd model = andCmdWithTime (Cmd.map PathFinderRequest cmd) model

{-| begin running the computer path finder on the given titles
-}
startAIPathfinder : Title -> Title -> ModelCmd -> ModelCmd
startAIPathfinder start goal (({phase}, _) as model) =
    let (ai, cmds) = PathFinder.pathFind start goal
    in model
        |> setPhase (setAiModel ai phase)
        |> wrapAICmd cmds

-- getPlayers : ModelCmd -> Maybe (GameInfo a b c)
getPlayers ({phase}, _) = case phase of
    Lobby _ _ -> Nothing
    InGame _ game _ _ _ -> Just (inGamePlayers game)
    PostGameReview game _ _ -> Just (postGamePlayers game)
    Welcome _ -> Nothing


-- updateWikiGraph : (WikiGraphState -> WikiGraphState) -> ModelCmd -> ModelCmd
-- updateWikiGraph f (({phase}, _) as model) =
--     case Maybe.map f (getWikiGraph phase) of
--         Just newGraph -> model
--             |> setWikiGraph newGraph
--         Nothing -> model

{-| update the model based on the last move of the computer, and signal peers of the computer move
-}
handleAiMove : Either IncompleteLeg CompleteLeg -> Time.Posix -> ModelCmd -> ModelCmd
handleAiMove leg time (({phase}, _) as model) =
    let -- signal peers about the computer move
        handleDuringGame = model
            |> setPhase (applyPlayerMove "computer" leg time phase)
            |> andCmd (PeerPort.broadcast <| PeerPort.PlayerLegUpdate "computer" leg time)
            |> when (Either.isRight leg) restartPathFinder

        -- if the computer finished the current leg, start the pathfinder on the next leg
        restartPathFinder modelcmd =
            let nextleg = getPlayers modelcmd
                    |> Maybe.andThen (getPlayerPath "computer")
                    |> Maybe.map getCurrentLeg
            in case nextleg of
                Just (Left (Incomplete {start, goal})) ->
                    startAIPathfinder start goal modelcmd
                _ -> modelcmd

    in case phase of
        -- the AI made a move on the Welcome Screen
        Welcome options ->
            let computerPath = initPath (getStart leg) (getGoal leg) []
                    |> updatePathWithLeg leg
                wg = Maybe.map (WikiGraph.update "computer" computerPath forceItersPostGame)
                        options.wikigraph
            in model
                |> setPhase (Welcome {options | wikigraph=wg })

        InGame _ _ _ _ _ -> handleDuringGame

        PostGameReview _ _ _ -> handleDuringGame

        Lobby _ _ -> model

{-| let the given ai pathfinder work for a bit and then record the progress
-}
workAiModel : PathFinder.Model -> ModelCmd -> ModelCmd
workAiModel ai (({phase}, _) as model) =
    let (newAi, cmds) = PathFinder.work 10 ai
    in model
        |> setPhase (setAiModel newAi phase)
        |> wrapAICmd cmds


{-| transition to the gameplay by loading the start page or the last page you were on

signal peers that game has started (if hosting)
-}
startGame : InProgressGame -> Model -> ModelCmd
startGame game model =
    let
        -- notify connected players to begin the game (if you're the host)
        startGameSignal = PeerPort.broadcast (gameStateMessage (Left game))

        (DestinationList start firstGoal _) = game.destinations
        -- fetch the page you're supposed to be on
        pageToGoTo = case game.self.path of
            Just (path, _) -> currentPage (Left path)
            Nothing -> start.title

        phase = InGame (Left pageToGoTo) game
            { currentTime=Nothing
            , displayToc=False
            }
            -- TODO have host provide initial wikigraph for late joining players
            (WikiGraph.init game.destinations {width=1000, height=500})
            PathFinder.dead

    in model
        |> withPhase phase
        |> andCmd (Cmd.batch [goBackToTop, getPage pageToGoTo])
        |> withToast Toast.infoMessage "Race!"
        |> when game.amHost (startAIPathfinder start.title firstGoal.title)
        |> guardCmd game.amHost startGameSignal 

finishGame : InProgressGame -> Either IncompletePath CompletePath -> Int -> PostGame
finishGame ({self} as game) path time =
    { uuid=game.uuid
    , seed=game.seed
    , destinations=game.destinations
    , numDestinations=game.numDestinations
    , amHost=game.amHost
    , players=game.players
    , self={color=self.color, name=self.name, path=path, time=time}
    }

giveUp : InProgressGame -> Time.Posix -> PostGame
giveUp ({self} as game) now = case self.path of
    Just (path, startTime) ->
        finishGame game (Left path) (Time.posixToMillis now - Time.posixToMillis startTime)
    Nothing -> finishGame game (Left <| initPathFromDestinationList game.destinations) 0

{- *scarface voice* say hello to my enormous update function -}
update : Msg -> Model -> ModelCmd
update msg ({phase} as model) =
    let doNothing = (model, Cmd.none)
    in
    case msg of
        -- changing inputs on the welcome screen
        OnInputWelcomeParams {name, joinId} -> case phase of
            Welcome options -> model
                |> withPhase (Welcome {options | inputJoinId=joinId, inputName=name})

            _ -> doNothing

        -- host is changing the number of destinations in the lobby
        OnInputLobbyParams {numDestinations} -> case phase of
            Lobby lobby opts -> model 
                |> withPhase (Lobby lobby {opts | numDestinationsInput=numDestinations})

            _ -> doNothing

        -- host clicked start game, get the current time and transition to gameplay
        ClickedStartGame -> case model.phase of
            Lobby lobby _ -> case lobby.destinations of
                Right destinations -> startGame (lobbyToGame lobby destinations) model

                Left _ -> doNothing
                    |> withToast Toast.infoMessage "Cannot start game without all destination pages loaded"

            _ -> doNothing

        -- host loaded a page preview for one of the destinations
        LoadedDestinationPreview _ (Ok page) -> case phase of
            Lobby lobby options -> case lobby.destinations of
                Left loadedList -> -- loaded one of the destination pages
                -- this msg should only be received by the host user
                    let
                        -- shuffle the destination list so the order isn't based on API response time
                        (destinationList, newSeed) = 
                            Random.step (Random.List.shuffle (page :: loadedList)) lobby.seed

                        doneLoading = List.length destinationList == lobby.numDestinations

                        -- if we have loaded the required number of destinations, signal the peers
                        updatedLobby = case destinationList of
                            first :: second :: remaining ->
                                let 
                                    setDestinationList =
                                        if doneLoading then
                                            Right (DestinationList first second remaining)
                                        else Left destinationList
                                in {lobby | destinations=setDestinationList, seed=newSeed}
                            _ ->
                                {lobby | destinations=Left destinationList, seed=newSeed}
                        
                    in model
                        |> withPhase (Lobby updatedLobby options)
                        |> guardCmd (lobby.amHost && doneLoading)
                            (PeerPort.broadcast (lobbyInfoMessage updatedLobby))
                
                -- destination list is already fully loaded, so we shouldn't be getting this message
                Right _ -> doNothing
                    |> withToast Toast.infoMessage ("loaded preview for " ++ page.title)

            _ -> doNothing

        LoadedDestinationPreview title (Err err) -> doNothing
            |> withToast Toast.errorMessage ("Request for destination title " ++ title ++ " failed: " ++ err)
        
        -- loaded a page preview for the welcome screen
        LoadedWelcomePreview pageResult -> case pageResult of
            Ok page -> case phase of
                Welcome ({displayPages} as opts) ->
                    let newDisplayPages = (Tuple.second displayPages, Just page)
                    in case newDisplayPages of
                        (Just left, Just right) -> model
                            |> withPhase (Welcome {opts | displayPages=newDisplayPages})
                            |> when (left.title /= right.title) (startAIPathfinder left.title right.title)
                            |> when (left.title /= right.title)
                                (setWikiGraph <| WikiGraph.init (DestinationList left right []) {width=1000, height=400})
                            
                        _ -> withPhase (Welcome {opts | displayPages=newDisplayPages}) model

                _ -> doNothing

            Err err ->
                withToast Toast.errorMessage err <| doNothing


        -- loaded page after clicking a link in game
        -- update the game state, signal peers about reaching the new title
        MsgWithTime (LoadedPage _ (Ok page)) time -> case phase of
            InGame _ game opts wikigraph computer ->
                let
                    self = game.self
                    timeSinceGameStart = case self.path of
                        Just (_, startTime) -> Time.posixToMillis time - Time.posixToMillis startTime
                        Nothing -> 0

                    -- update the current path and the current leg
                    (extendedLeg, extendedPath) = case self.path of
                        Just (path, _) -> let leg = updateLeg page.title path.currentLeg in
                            (leg, updatePathWithLeg leg path)
                        Nothing ->
                            let initialPath = initPathFromDestinationList game.destinations
                                leg = updateLeg page.title initialPath.currentLeg
                            in (leg, updatePathWithLeg leg initialPath)

                    -- signal other players of your move
                    legUpdateMsg = case game.uuid of
                        Just uuid -> PeerPort.broadcast
                            <| PlayerLegUpdate uuid extendedLeg time
                        Nothing -> Cmd.none
                    
                    cmd = Cmd.batch [goBackToTop, legUpdateMsg]

                    myid = Maybe.withDefault "player1" game.uuid
                    
                in case extendedPath of
                    -- we completed the path, move on to post game review
                    Right complete -> model
                        |> withPhase ( PostGameReview
                            (finishGame game (Right complete) timeSinceGameStart)
                            (WikiGraph.update myid extendedPath forceItersPostGame wikigraph)
                            computer
                        )
                        |> andCmd cmd
                        |> withToast Toast.infoMessage "You finished!"
                    Left incomplete ->
                        let startTime = Maybe.map Tuple.second self.path
                                |> Maybe.withDefault time 
                        in model
                            |> withPhase (
                                InGame (Right page)
                                { game | self={ self | path=Just (incomplete, startTime)} }
                                { opts | currentTime=Just time }
                                (WikiGraph.update myid extendedPath forceItersWhileInGame wikigraph)
                                computer
                            ) |> andCmd cmd

            _ -> doNothing

        MsgWithTime (LoadedPage title (Err err)) _ -> doNothing
            |> withToast Toast.errorMessage ("Request for title " ++ title ++ " failed: " ++ err)

        ClickedLink title -> case phase of
            InGame _ game opts wikigraph computer -> model
                |> withPhase (InGame (Left title) game opts wikigraph computer)
                |> andCmd (getPage title)

            _ -> doNothing

        Tick time -> case phase of
            -- update the display pages on the welcome screen
            Welcome opts ->
                let (newTitle, newSeed) = Articles.generateTitleList 1 opts.seed
                    fetchExamplePage = Maybe.map getWelcomePreview (List.head newTitle)
                        |> Maybe.withDefault Cmd.none
                in model
                    |> withPhase (Welcome {opts | seed=newSeed})
                    |> andCmd fetchExamplePage

            -- update the current time
            InGame page game opts wikigraph computer -> model
                |> withPhase (InGame page game { opts | currentTime=Just time } wikigraph computer)

            _ -> doNothing

        NoOp -> doNothing

        -- reroll the destination list
        RefreshLobby -> case phase of
            Lobby lobby opts ->
                let
                    chosenNum = opts.numDestinationsInput
                    
                    (destinationTitles, newSeed) = Articles.generateTitleList chosenNum lobby.seed

                    fetchDestinationPreviews = Cmd.batch <| List.map getPreview destinationTitles
                in model
                    |> withPhase
                        (Lobby {lobby | seed=newSeed, numDestinations=chosenNum, destinations=Left []} opts)
                    |> andCmd fetchDestinationPreviews

            _ -> doNothing

        ClickedJoinGame -> case phase of
            Welcome {inputJoinId, inputName} ->
                let noName = String.isEmpty inputName
                    noJoinId = String.isEmpty inputJoinId
                in doNothing
                    |> when noName (withToast Toast.infoMessage "You must give username!")
                    |> when noJoinId (withToast Toast.infoMessage "You have to provide the host's game ID to join their game")
                    |> when (not (noName || noJoinId))
                        (andCmd (PeerPort.connectToHost {hostId=inputJoinId, name=inputName})
                            >> withToast Toast.infoMessage "Attempting to join game..."
                        )
                 
            _ -> doNothing
        
        ClickedHostGame -> case phase of
            Welcome {inputName, uuid, seed} ->
                if inputName == "" then
                    withToast Toast.infoMessage "You must give username!" doNothing
                else
                    let
                        newLobby = Lobby
                            { players=Dict.singleton "computer" {color=computerColor, name="computer"}
                            , destinations=Left []
                            , numDestinations=4
                            , self={name=inputName, color=generateColorForNewPlayer [] seed}
                            , uuid=uuid
                            , seed=seed
                            , amHost=True
                            }
                            { numDestinationsInput=4 }
                    in model
                        |> withPhase newLobby
                        |> applyUpdate RefreshLobby
                        |> andCmd PeerPort.hostGame
                        |> withToast Toast.infoMessage "Attempting to host game..."

            _ -> doNothing

        -- a player made a move, update their position
        -- update game state, update wikigraph
        PeerMsg (PlayerLegUpdate uuid leg time) -> model
            |> withPhase (applyPlayerMove uuid leg time model.phase)
        
        -- new player connected
        -- update peers list
        -- if host, send them lobby/game information
        PeerMsg (PeerConnected uuid username) ->
            let
                newColor game = generateColorForNewPlayer (allPlayerColors game) game.seed
                addPlayer game = playerConnect
                    {uuid=uuid, name=username, color=newColor game} game
                
                -- if you are host and game has already started, send the new player the whole game state and player list
                sendGameInfo game = PeerPort.directedMessage uuid (gameStateMessage game)

            in withToast Toast.infoMessage (username ++ " joined the game") <|
            case phase of
                Lobby lobby opts ->
                    let
                        updatedLobby = playerConnectToLobby
                            {uuid=uuid, name=username, color=newColor lobby} lobby
                        -- if host, send lobby information back to the new player
                        sendLobbyInfo = PeerPort.directedMessage uuid (lobbyInfoMessage updatedLobby)
                    in model
                        |> withPhase (Lobby updatedLobby opts)
                        |> guardCmd (lobby.amHost) sendLobbyInfo
                
                InGame page game opts wikigraph computer ->
                    let updatedGame = addPlayer game
                    in model
                        |> withPhase (InGame page updatedGame opts wikigraph computer)
                        |> guardCmd (game.amHost) (sendGameInfo <| Left updatedGame)
                    
                PostGameReview game wikigraph computer ->
                    let updatedGame = addPlayer game
                    in model
                        |> withPhase (PostGameReview updatedGame wikigraph computer)
                        |> guardCmd (game.amHost) (sendGameInfo <| Right updatedGame)

                _ -> doNothing

        PeerMsg (PeerDisconnected uuid) ->
            let
                toast players = case Dict.get uuid players of
                    Just player ->
                        withToast Toast.infoMessage (player.name ++ " has left the game")
                    Nothing ->
                        withToast Toast.infoMessage "Unkown player left the game... spooky."
            in case phase of
                Lobby lobby opts -> model
                    |> withPhase (Lobby (removePlayer uuid lobby) opts)
                    |> toast lobby.players

                InGame page game opts wikigraph computer -> model
                    |> withPhase (InGame page (disconnectPlayer uuid game) opts wikigraph computer)
                    |> toast game.players

                PostGameReview game wikigraph computer -> model
                    |> withPhase (PostGameReview (disconnectPlayer uuid game) wikigraph computer)
                    |> toast game.players

                _ -> doNothing

        PeerMsg HostLost ->
            let
                -- mark all players disconnected
                disconnectPlayers game = List.foldl disconnectPlayer game (Dict.keys game.players)
            in withToast Toast.errorMessage "Connection to host lost..." <|
            case phase of
                InGame page game opts wikigraph computer -> model
                    |> withPhase (InGame page (disconnectPlayers game) opts wikigraph computer)

                PostGameReview game wikigraph computer -> model
                    |> withPhase (PostGameReview (disconnectPlayers game) wikigraph computer)

                Lobby lobby _ -> model
                    |> withPhase (
                        Welcome
                        {inputJoinId="", inputName=lobby.self.name, seed=lobby.seed
                        , uuid=lobby.uuid, displayPages=(Nothing, Nothing)
                        , wikigraph=Nothing, pathfinder=PathFinder.dead
                        }
                    )
                    
                _ -> doNothing

        -- receiving a game state message from the host means to enter in-game phase
        PeerMsg (GameStateMessage game) ->
            let
                wikigraph = WikiGraph.init game.destinations {width=1000, height=500}

                newGame opts = case receiveGameInfo opts game of
                    Just (Left g) -> startGame g model
                        |> withToast Toast.infoMessage "You joined the game"
                    
                    Just (Right g) -> 
                        withPhase (PostGameReview g wikigraph PathFinder.dead) model
                    
                    Nothing -> doNothing
                        |> withToast Toast.errorMessage "Malformed game info sent by host"

            in case phase of
                Welcome opts -> newGame opts
                Lobby lobby _ -> newGame lobby
                _ -> doNothing
                    |> withToast Toast.errorMessage "Received game invite at erroneous time"
        
        -- host has sent lobby info
        -- either means you're just joining the lobby or the destination pages have changed
        PeerMsg (LobbyInfoMessage lobbyMessage) ->
            let newGame opts = receiveLobbyInfo opts lobbyMessage
                    |> Maybe.map (\lobby -> Lobby lobby {numDestinationsInput=lobby.numDestinations})
                    |> Maybe.withDefault phase
            in case phase of
                Welcome opts -> withPhase (newGame opts) model
                    |> withToast Toast.infoMessage "You joined the lobby"
                Lobby opts _ -> withPhase (newGame opts) model
                    |> withToast Toast.infoMessage "Destination pages changed"
                InGame _ opts _ _ _ -> withPhase (newGame opts) model
                    |> withToast Toast.infoMessage "Host wants a new game"
                PostGameReview opts _ _ -> withPhase (newGame opts) model
                    |> withToast Toast.infoMessage "Host wants a new game"

        PeerMsg (Error err) -> doNothing
            |> withToast Toast.errorMessage ("P2P error: " ++ err)

        -- TODO send message to other players on give up
        ClickedGiveUp -> case phase of
            InGame _ game {currentTime} wikigraph computer ->
                let time = Maybe.withDefault (Time.millisToPosix 0) currentTime
                in model
                    |> withPhase
                        (PostGameReview (giveUp game time) (WikiGraph.reheat forceItersPostGame wikigraph) computer)
                    |> withLog "YOU SHOULD BE SENDING A MESSAGE ON GIVE UP"

            _ -> doNothing

        -- host clicks new game
        ClickedNewGame -> case phase of
            PostGameReview game _ _ -> 
                if game.amHost then
                    let
                        lobby =
                            { uuid=game.uuid
                            , seed=game.seed
                            , destinations=Right game.destinations
                            , numDestinations=game.numDestinations
                            , amHost=game.amHost
                            , players= Dict.filter (\_ player -> player.connected) game.players
                                |> Dict.map (\_ {name,color} -> {name=name, color=color})
                            , self={name=game.self.name, color=game.self.color}
                            }
                    in model
                        |> withPhase (Lobby lobby {numDestinationsInput=game.numDestinations})
                        |> andCmd (PeerPort.broadcast (lobbyInfoMessage lobby))
                
                else doNothing
                    |> withToast Toast.infoMessage "Only the host can start a new game"

            _ -> doNothing
        
        CopyToClipboard str -> (model, copyToClipboard str)

        -- display the current page's sections
        DisplayToc toggle -> case phase of
            InGame page game opts wikigraph computer ->
                withPhase
                (InGame page game {opts | displayToc=toggle} wikigraph computer)
                model
            
            _ -> doNothing
                

        -- updated force layout on wikigraph or the user is manipulating the graph's svg
        WikiGraphMsg wikigraphMsg -> case getWikiGraph model.phase of
            Just graph -> setWikiGraph (WikiGraph.onMsg wikigraphMsg graph) (model, Cmd.none)
            Nothing -> doNothing
            
        
        ToastMsg toastMsg ->
            ({ model | toasts=Toast.update toastMsg model.toasts}, Cmd.none)

        ReceivedMsgThatNeedsTime nakedMsg ->
            (model, Task.perform (MsgWithTime nakedMsg) Time.now )

        -- AI has a msg
        MsgWithTime (PathFinderRequest aiInternalMsg) time ->
            case Maybe.map (PathFinder.update aiInternalMsg) (getAiModel model.phase) of
                Just (ai, aiLeg, aiCmds) -> model
                    |> withPhase (setAiModel ai model.phase)
                    |> Maybe.withDefault identity
                        (Maybe.map (\leg -> handleAiMove leg time) aiLeg)
                    |> wrapAICmd aiCmds
                    
                Nothing -> doNothing

        AnimationFrame time ->
            let doAiWork = Maybe.map workAiModel (getAiModel model.phase)
                    |> Maybe.withDefault identity

            in doAiWork (model, Cmd.none)
                    
            
{-| subscribe to animation frames if the ai pathfinder has work to do
    or the wikigraph force layout has work to do
-}
animationFrame : Model -> Sub Msg
animationFrame model =
    let aiCanWork = Maybe.map (PathFinder.workToBeDone) (getAiModel model.phase)
            |> Maybe.withDefault False
    in if aiCanWork then Browser.Events.onAnimationFrame AnimationFrame
    else Sub.none

subscriptions : Model -> Sub Msg
subscriptions model =
    let wikiGraphSub = Maybe.map (WikiGraph.subscription >> Sub.map WikiGraphMsg)
            (getWikiGraph model.phase)
            |> Maybe.withDefault Sub.none

        displayPageRotationTime = 30000
        oneSecond = 1000

        baseSubs = Sub.batch
            [ Sub.map ToastMsg Toast.subscription -- snackbar messages
            , Sub.map PeerMsg PeerPort.receiveData
            , animationFrame model
            , wikiGraphSub
            ]
    in
    case model.phase of
    -- ticks on welcome to request more example titles
    Welcome _ -> Sub.batch
            [ Time.every displayPageRotationTime Tick, baseSubs]

    -- ticks while in game to update the time display
    InGame _ _ _ _ _ -> Sub.batch [ Time.every oneSecond Tick, baseSubs]

    _ -> baseSubs


{-| we expect an integer for an initial seed
and a unique agent id generated by the peerJS server
-}
type alias Flags = {seed : Int, peerId : Maybe PeerId}

initModel : Flags -> ( Model, Cmd Msg )
initModel {seed, peerId} =
    let (previewTitles, newSeed) = Articles.generateTitleList 2 (Random.initialSeed seed)
        phase = Welcome
            { inputJoinId=""
            , inputName=""
            , uuid=peerId
            , seed=newSeed
            , displayPages=(Nothing, Nothing)
            , wikigraph=Nothing
            , pathfinder=PathFinder.dead
            }

        getDisplayPages = Cmd.batch <| List.map getWelcomePreview previewTitles

        initToast = case peerId of
            Just id -> Toast.infoMessage ("Your player ID is " ++ id)
            Nothing -> Toast.errorMessage "Failed to connect to brokering server. Refresh maybe?"

        model = { phase=phase, toasts=Toast.update initToast Toast.init }
    in ( model , getDisplayPages)

main : Program Flags Model Msg
main =
    Browser.element
        { init = initModel
        , view = view
        , update = update
        , subscriptions = subscriptions
        }

