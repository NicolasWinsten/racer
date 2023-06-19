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




{-| retrieve the content of a wikipedia page along with the current time when it is loaded
-}
getPage : Title -> Cmd Msg
getPage title = PageFetch.getPage title
    -- I want a timestamp even if the request fails
    -- so I convert getPage from Task String Page to Task x (Result String Page)
    |> Task.map Ok
    |> Task.onError (Err >> Task.succeed)
    |> Task.andThen (\page -> Task.map (LoadedPage title page) Time.now)
    |> Task.perform identity

{-| retrieve summary of a wikipedia article (thumbnail, description)
to be displayed in the game lobby (and sent to the other players if hosting)
-}
getPreview : Title -> Cmd Msg
getPreview title = PageFetch.getPreview title
    |> Task.attempt (LoadedDestinationPreview title)

{-| load the preview of an example title at the welcome screen
-}
getWelcomePreview : Title -> Cmd Msg
getWelcomePreview title = PageFetch.getPreview title
    |> Task.attempt LoadedWelcomePreview

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
forceItersPostGame = 3000

{-| copy the given string to the user's clipboard
-}
port copyToClipboard : String -> Cmd msg

{-| create a message containing information about the lobby
 (we send this to any players that want to join or if the lobby settings have changed)
-}
lobbyInfoMessage : Lobby -> PeerMsg
lobbyInfoMessage {players, destinations, self, uuid} = LobbyInfoMessage
    { players = Dict.map (\_ {name, color} -> {name=name, color=color}) players
        |> Dict.insert (Maybe.withDefault "ERROR" uuid) self
    , destinations = destinations
    }

{-| create a message containing the information of a game in progress.
This is sent whenever a new game is started or to any late-joining players
-}
gameStateMessage : InProgressGame -> PeerMsg
gameStateMessage {players, destinations, self, uuid} = GameStateMessage
    { players = Dict.insert (Maybe.withDefault "ERROR" uuid) self players
    , destinations = destinations
    }

{-| update your game info with the host's game info
(update the player list and destination list)
Will return Nothing if the new info doesn't mention you
-}
updateGameInfo myInfo newInfo =
    case Maybe.andThen (\id -> Dict.get id newInfo.players) myInfo.uuid of
        Just self -> Just <|
            { uuid=myInfo.uuid
            , seed=myInfo.seed
            , destinations=newInfo.destinations
            -- remove yourself from the host's player list ss
            , players=Maybe.map (\id -> Dict.remove id newInfo.players) myInfo.uuid
                |> Maybe.withDefault newInfo.players
            , numDestinations=List.length newInfo.destinations
            , amHost=False
            , self=self
            }
        Nothing -> Nothing

{-| convert lobby information to game information to start the game

each player needs to be annotated with their progress
-}
lobbyToGameState : Lobby -> Maybe InProgressGame
lobbyToGameState lobby = case initialGameState (List.map .title lobby.destinations) of
    Just gameState ->
        let
            mkPlayer {name, color} = {name=name, color=color, gameState=gameState, connected=True}

            newGameInfo =
                { uuid=lobby.uuid
                , seed=lobby.seed
                , destinations=lobby.destinations
                , numDestinations=lobby.numDestinations
                , amHost=lobby.amHost
                , players=Dict.map (\id player -> mkPlayer player) lobby.players
                , self=mkPlayer lobby.self
                }
        in Just newGameInfo
    Nothing -> Nothing



withToast : (String -> Toast.ToastMsg) -> String -> (Model, Cmd Msg) -> (Model, Cmd Msg)
withToast toaster message (model, cmds) =
    ({model | toasts=Toast.update (toaster message) model.toasts}, cmds)

{-| transition to the gameplay by loading the start page

signal peers that game has started (if hosting)
-}
startGame : InProgressGame -> Time.Posix -> Model -> ( Model, Cmd Msg )
startGame game time model =
    let
        -- notify connected players to begin the game (if you're the host)
        startGameSignal = cmdIf game.amHost
            <| PeerPort.broadcast (gameStateMessage game)

        start = game.self.gameState.currentLeg.currentPage
        -- fetch the page you're supposed to be on
        startPageRequest = getPage start

        phase = InGame (Left start) game
            { startTime=time
            , currentTime=time
            , displayToc=False
            }
            (WikiGraph.init game.destinations)
    in
    ( {model | phase=phase}
    , Cmd.batch [ goBackToTop, startGameSignal, startPageRequest ]
    ) |> withToast Toast.infoMessage "Host started the game"




{- *scarface voice* say hello to my enormous update function -}
update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({phase} as model) =
    let
        withPhase newPhase = {model | phase=newPhase}
        withCmd cmd model_ = (model_, cmd) 
    in
    case msg of
        -- changing inputs on the welcome screen
        OnInputWelcomeParams {name, joinId} -> case phase of
            Welcome options -> Welcome {options | inputJoinId=joinId, inputName=name}
                |> withPhase >> withCmd Cmd.none

            _ -> model
                |> withCmd Cmd.none
                |> withToast Toast.errorMessage "ERROR: Changing username/joinId outside of Welcome page"

        -- host is changing the number of destinations in the lobby
        OnInputLobbyParams {numDestinations} -> case phase of
            Lobby lobby opts -> Lobby lobby {opts | numDestinationsInput=numDestinations}
                |> withPhase >> withCmd Cmd.none

            _ -> model
                |> withCmd Cmd.none
                |> withToast Toast.errorMessage "ERROR: Changing game parameters while not in lobby"

        -- host clicked start game, get the current time and transition to gameplay
        ClickedStartGame -> model |> withCmd (Task.perform ReadyToStartGame Time.now)

        -- transition to gameplay if destinations are done loading
        ReadyToStartGame time -> case phase of
            Lobby lobby _ -> -- host will be in lobby when clicking Start Game
                if List.length lobby.destinations == lobby.numDestinations then
                    case lobbyToGameState lobby of
                        Just newGame -> startGame newGame time model

                        Nothing -> model 
                            |> withCmd Cmd.none
                            |> withToast Toast.infoMessage "Cannot start game with less than 2 destinations"
                
                else model
                    |> withCmd Cmd.none
                    |> withToast Toast.infoMessage "Destinations not done loading"

            InGame _ game _ _ ->
                -- after the other players have received the GameState message from the host
                -- they will be InGame
                startGame game time model

            _ -> model 
                |> withCmd Cmd.none
                |> withToast Toast.errorMessage "Cannot start a game outside of the lobby"

        -- host loaded a page preview for one of the destinations
        LoadedDestinationPreview _ (Ok page) -> case phase of
            Lobby lobby options -> -- loaded one of the destination pages
                -- this msg should only be received by the host user
                let
                    -- shuffle the destination list so the order isn't based on API response time
                    (destinationList, newSeed) = lobby.seed
                        |> Random.step (Random.List.shuffle (page :: lobby.destinations))

                    newLobby = {lobby | destinations=destinationList, seed=newSeed}
                    -- if all the pages are loaded, then send them to the other players (if host)
                    doneLoading = List.length destinationList == lobby.numDestinations
                    cmd = cmdIf (lobby.amHost && doneLoading)
                        <| PeerPort.broadcast (lobbyInfoMessage newLobby)

                in Lobby newLobby options |> withPhase >> withCmd cmd

            _ -> withCmd Cmd.none model

        LoadedDestinationPreview title (Err err) -> model
            |> withCmd Cmd.none
            |> withToast Toast.errorMessage ("Request for destination title " ++ title ++ " failed: " ++ err)
        
        LoadedWelcomePreview pageResult -> case pageResult of
            Ok page -> case phase of
                Welcome ({displayPages} as opts) ->
                    let (left,right) = displayPages
                    -- only update the welcome display if the loaded page has a thumbnail to display
                    in case page.thumbnail of
                        Just _ -> Welcome {opts | displayPages=(Just page,left)}
                            |> withPhase >> withCmd Cmd.none
                        Nothing -> withCmd Cmd.none model
                _ -> withCmd Cmd.none model
            Err err ->
                withCmd Cmd.none model |> withToast Toast.errorMessage err


        -- loaded page after clicking a link in game
        -- update the game state, signal peers about reaching the new title
        LoadedPage _ (Ok page) time -> case phase of
            InGame _ game opts wikigraph ->
                let
                    self = game.self
                    timeSinceGameStart = Time.posixToMillis time - Time.posixToMillis opts.startTime
                    
                    newGameState =
                        let newState = updateGameState page.title self.gameState 
                        in
                        if isGameFinished newState then { newState | finishTime=Just timeSinceGameStart}
                        else newState

                    signalTitleReached = case game.uuid of
                        Just uuid -> PeerPort.broadcast
                            <| PlayerReachedTitle uuid page.title timeSinceGameStart
                        Nothing -> Cmd.none
                    
                    cmd = Cmd.batch [signalTitleReached, goBackToTop]
                    
                    newWikiGraph numForceIters =
                        WikiGraph.update (Maybe.withDefault "" game.uuid) newGameState numForceIters wikigraph
                in
                if isGameFinished newGameState then
                    ( PostGameReview
                        { game | self={ self | gameState=newGameState } }
                        (newWikiGraph forceItersPostGame)
                    ) |> withPhase >> withCmd cmd >> withToast Toast.infoMessage "You finished!"
                else
                    ( InGame (Right page)
                        { game | self={ self | gameState=newGameState} }
                        { opts | currentTime=time }
                        (newWikiGraph forceItersWhileInGame) -- update the wikigraph force simulation a little bit in the background while in game
                    ) |> withPhase >> withCmd cmd

            _ -> withCmd Cmd.none model

        LoadedPage title (Err err) _ -> model
            |> withCmd Cmd.none
            |> withToast Toast.errorMessage ("Request for title " ++ title ++ " failed: " ++ err)

        ClickedLink title -> case phase of
            InGame _ game opts wikigraph -> InGame (Left title) game opts wikigraph
                |> withPhase >> withCmd (getPage title)

            _ -> withCmd Cmd.none model

        Tick time -> case phase of
            -- update the display pages on the welcome screen
            Welcome opts ->
                let (newTitle, newSeed) = Articles.generateTitleList 1 opts.seed
                    fetchExamplePage = Maybe.map getWelcomePreview (List.head newTitle)
                        |> Maybe.withDefault Cmd.none
                in Welcome {opts | seed=newSeed} |> withPhase >> withCmd fetchExamplePage

            -- update the current time
            InGame page game opts wikigraph -> InGame page game { opts | currentTime=time } wikigraph
                |> withPhase >> withCmd Cmd.none

            _ -> withCmd Cmd.none model

        NoOp -> withCmd Cmd.none model

        RefreshLobby -> case phase of
            Lobby lobby opts ->
                let
                    chosenNum = opts.numDestinationsInput
                    
                    (destinationTitles, newSeed) = Articles.generateTitleList chosenNum lobby.seed

                    fetchDestinationPreviews = Cmd.batch <| List.map getPreview destinationTitles
                in
                Lobby {lobby | seed=newSeed, numDestinations=chosenNum, destinations=[]} opts
                    |> withPhase >> withCmd fetchDestinationPreviews

            _ -> withCmd Cmd.none model

        ClickedJoinGame -> case phase of
            Welcome {inputJoinId, inputName} ->
                if inputName == "" then withCmd Cmd.none model |> withToast Toast.infoMessage "You must give username!"
                else if inputJoinId == "" then withCmd Cmd.none model |> withToast Toast.infoMessage "You have to provide the host's game ID to join their game"
                else model
                    |> withCmd (PeerPort.connectToHost {hostId=inputJoinId, name=inputName})
                    |> withToast Toast.infoMessage "Attempting to join game..."

            _ -> withCmd Cmd.none model
        
        ClickedHostGame -> case phase of
            Welcome {inputName, uuid, seed} ->
                if inputName == "" then withCmd Cmd.none model |> withToast Toast.infoMessage "You must give username!"
                else
                    let
                        (newLobby, cmds) =
                            Lobby
                            { players=Dict.empty
                            , destinations=[]
                            , numDestinations=4
                            , self={name=inputName, color=generateColorForNewPlayer [] seed}
                            , uuid=uuid
                            , seed=seed
                            , amHost=True
                            }
                            { numDestinationsInput=4 }
                            |> withPhase >> update RefreshLobby

                    in newLobby
                        |> withCmd (Cmd.batch [cmds, PeerPort.hostGame])
                        |> withToast Toast.infoMessage "Attempting to host game..."

            _ -> withCmd Cmd.none model

        -- some player reached a page in so many milliseconds
        -- update game state, update wikigraph (set new page as the player's current node)
        PeerMsg (PlayerReachedTitle uuid title time) ->
            let
                -- update the player state with the new title and update the wikigraph
                updateGame game wikigraph forceIters = case Dict.get uuid game.players of
                    Just player ->
                        let newPlayerState =
                                let g = updateGameState title player.gameState
                                    finished = isGameFinished g
                                in { g | finishTime=if finished then Just time else Nothing }
                            newWikiGraph = WikiGraph.update uuid newPlayerState forceIters wikigraph
                        in
                        ( {game | players=Dict.insert uuid {player | gameState=newPlayerState} game.players}
                        , newWikiGraph
                        )
                    Nothing -> (game, wikigraph)
            in
            case phase of
                InGame page game opts wikigraph ->
                    let (newGame, newWikiGraph) = updateGame game wikigraph forceItersWhileInGame
                    in InGame page newGame opts newWikiGraph |> withPhase >> withCmd Cmd.none
                    
                PostGameReview game wikigraph ->
                    let (newGame, newWikiGraph) = updateGame game wikigraph forceItersPostGame
                    in PostGameReview newGame newWikiGraph |> withPhase >> withCmd Cmd.none
                
                _ -> withCmd Cmd.none model
        
        -- new player connected
        -- update peers list
        -- if host, send them lobby/game information
        PeerMsg (PeerConnected uuid username) ->
            let
                usedPlayerColors game = Dict.values game.players
                    |> (::) game.self
                    |> List.map .color
                
                newPlayerColor game = generateColorForNewPlayer (usedPlayerColors game) game.seed

                -- update the state of the in-progress game
                -- if the connected user already exists in the game state do nothing
                -- (this means the player reconnected so send them their in-progress game state)
                updateGame game = case initialGameState (List.map .title game.destinations) of
                    Just initGame -> 
                        let
                            newPlayerList = Dict.update uuid
                                (\entry -> case entry of
                                    Just player -> Just { player | connected=True }
                                    Nothing -> Just
                                        { name=username
                                        , color=newPlayerColor game
                                        , gameState=initGame
                                        , connected=True
                                        }
                                )
                                game.players
                        in Just { game | players=newPlayerList }
                    Nothing -> Nothing
                
                -- if you are host and game has already started, send the new player the whole game state and player list
                sendGameInfo game = cmdIf game.amHost
                    <| PeerPort.directedMessage uuid (gameStateMessage game)
            in
            case phase of
                Lobby lobby opts ->
                    let
                        newPlayerList = Dict.insert uuid
                            {name=username, color=newPlayerColor lobby}
                            lobby.players

                        newLobby = {lobby | players=newPlayerList}
                    -- if host, send lobby information back to the new player
                        sendLobbyInfo = PeerPort.directedMessage uuid <| lobbyInfoMessage newLobby
                    in Lobby newLobby opts
                        |> withPhase >> withCmd sendLobbyInfo
                        |> withToast Toast.infoMessage (username ++ " joined the game")
                
                InGame page game opts wikigraph -> case updateGame game of
                    Just newGame -> InGame page newGame opts wikigraph
                        |> withPhase >> withCmd (sendGameInfo newGame)
                        |> withToast Toast.infoMessage (username ++ " joined the game")

                    Nothing -> model
                        |> withCmd Cmd.none
                        |> withToast Toast.errorMessage "Something went wrong updating the game with new player"
                    
                PostGameReview game wikigraph-> case updateGame game of
                    Just newGame -> PostGameReview newGame wikigraph
                        |> withPhase >> withCmd (sendGameInfo newGame)
                        |> withToast Toast.infoMessage (username ++ " joined the game")

                    Nothing -> model
                        |> withCmd Cmd.none
                        |> withToast Toast.errorMessage "Something went wrong updating the game with new player"

                _ -> withCmd Cmd.none model 
                    |> withToast Toast.infoMessage (username ++ " joined the game")

        PeerMsg (PeerDisconnected uuid) ->
            let
                toast players = case Dict.get uuid players of
                    Just player ->
                        withToast Toast.infoMessage (player.name ++ " has left the game")
                    Nothing ->
                        withToast Toast.infoMessage "Unkown player left the game... spooky."
                
                -- if game is in progress, mark them disconnected but keep their game state
                -- (in case they join back later)
                updatePlayerList = Dict.update uuid 
                    <| Maybe.map (\player -> {player | connected = False})
            in
            case phase of
                Lobby lobby opts -> Lobby {lobby | players=Dict.remove uuid lobby.players} opts
                        |> withPhase >> withCmd Cmd.none
                        |> toast lobby.players

                InGame page game opts wikigraph->
                    InGame page {game | players=updatePlayerList game.players} opts wikigraph
                    |> withPhase >> withCmd Cmd.none
                    |> toast game.players

                PostGameReview game wikigraph ->
                    PostGameReview {game | players=updatePlayerList game.players} wikigraph
                    |> withPhase >> withCmd Cmd.none
                    |> toast game.players

                _ -> withCmd Cmd.none model

        PeerMsg HostLost ->
            let
                toast = withToast Toast.errorMessage "Connection to host lost..."
                -- mark all players disconnected
                newPlayerList game =
                    let players = Dict.map (\_ player -> {player | connected=False}) game.players
                    in { game | players=players}
            in case phase of
                InGame page game opts wikigraph ->
                    InGame page (newPlayerList game) opts wikigraph
                    |> withPhase >> withCmd Cmd.none >> toast
                PostGameReview game wikigraph ->
                    PostGameReview (newPlayerList game) wikigraph
                    |> withPhase >> withCmd Cmd.none >> toast
                Lobby lobby _ ->
                    Welcome {inputJoinId="", inputName=lobby.self.name, seed=lobby.seed, uuid=lobby.uuid, displayPages=(Nothing, Nothing)}
                    |> withPhase >> withCmd Cmd.none >> toast
                _ -> model |> withCmd Cmd.none >> toast

        -- receiving a game state message from the host means to enter in-game phase
        PeerMsg (GameStateMessage game) ->
            let
                start = List.head game.destinations
                    |> Maybe.map .title >> Maybe.withDefault "ERROR, HOST DID NOT SEND DESTINATIONS"

                newGame opts = case updateGameInfo opts game of
                    Just g -> let wikigraph = WikiGraph.init g.destinations in
                            InGame (Left start) g {startTime=Time.millisToPosix 0, currentTime=Time.millisToPosix 0, displayToc=False} wikigraph
                            |> withPhase
                            |> withCmd (Task.perform ReadyToStartGame Time.now)
                            |> withToast Toast.infoMessage "You joined the game"
                    
                    Nothing -> withCmd Cmd.none model |> withToast Toast.errorMessage "Malformed game info sent by host"

            in case phase of
                Welcome opts -> newGame opts
                Lobby lobby _ -> newGame lobby
                _ -> withCmd Cmd.none model
                    |> withToast Toast.errorMessage "Received game invite"
        
        -- host has sent lobby info
        -- either means you're just joining the lobby or the destination pages have changed
        PeerMsg (LobbyInfoMessage lobby) ->
            let newGame opts = updateGameInfo opts lobby
                    |> Maybe.map (\g -> Lobby g {numDestinationsInput=List.length g.destinations})
                    |> Maybe.withDefault phase
            in case phase of
                Welcome opts -> withPhase (newGame opts)
                    |> withCmd Cmd.none
                    |> withToast Toast.infoMessage "You joined the lobby"
                Lobby opts _ -> withPhase (newGame opts)
                    |> withCmd Cmd.none 
                    |> withToast Toast.infoMessage "Destination pages changed"
                InGame _ opts _ _ -> withPhase (newGame opts)
                    |> withCmd Cmd.none
                    |> withToast Toast.infoMessage "Host wants a new game"
                PostGameReview opts _ -> withPhase (newGame opts)
                    |> withCmd Cmd.none
                    |> withToast Toast.infoMessage "Host wants a new game"

        PeerMsg (Error err) -> withCmd Cmd.none model
            |> withToast Toast.errorMessage ("P2P error: " ++ err)

        -- TODO send message to other players on give up
        GiveUp -> case phase of
            InGame _ game _ wikigraph ->
                PostGameReview game (WikiGraph.reheat forceItersPostGame wikigraph)
                |> withPhase >> withCmd Cmd.none

            _ -> withCmd Cmd.none model

        ClickedNewGame -> case phase of
            PostGameReview game _ -> 
                if game.amHost then
                    let
                        lobby =
                            { uuid=game.uuid
                            , seed=game.seed
                            , destinations=game.destinations
                            , numDestinations=game.numDestinations
                            , amHost=game.amHost
                            , players= Dict.filter (\_ player -> player.connected) game.players
                                |> Dict.map (\_ {name,color} -> {name=name, color=color})
                            , self={name=game.self.name, color=game.self.color}
                            }
                    in
                    Lobby lobby {numDestinationsInput=game.numDestinations}
                    |> withPhase >> withCmd (PeerPort.broadcast (lobbyInfoMessage lobby))
                else
                    withCmd Cmd.none model
                    |> withToast Toast.errorMessage "You are not the host"

            _ -> withCmd Cmd.none model
        
        CopyToClipboard str -> withCmd (copyToClipboard str) model

        -- display the current page's content
        DisplayToc toggle -> case phase of
            InGame page game opts wikigraph ->
                InGame page game {opts | displayToc=toggle} wikigraph
                |> withPhase >> withCmd Cmd.none
            _ ->
                withCmd Cmd.none model

        -- updated force layout on wikigraph or the user is manipulating the graph's svg
        WikiGraphMsg wikigraphMsg -> case phase of
            InGame page game opts wikigraph ->
                InGame page game opts (WikiGraph.onMsg wikigraphMsg wikigraph)
                |> withPhase >> withCmd Cmd.none

            PostGameReview game wikigraph ->
                PostGameReview game (WikiGraph.onMsg wikigraphMsg wikigraph)
                |> withPhase >> withCmd Cmd.none

            _ -> withCmd Cmd.none model
        
        ToastMsg toastMsg -> { model | toasts=Toast.update toastMsg model.toasts}
            |> withCmd Cmd.none

subscriptions : Model -> Sub Msg
subscriptions model =
    let wikiGraphSub = WikiGraph.subscription >> Sub.map WikiGraphMsg
        toastSub = Sub.map ToastMsg Toast.subscription
    in
    case model.phase of
    -- ticks on welcome to request more example titles
    Welcome _ -> Sub.batch [ Time.every 5000 Tick, PeerPort.receiveData, toastSub]
    -- ticks while in game to update the time display
    InGame _ _ _ wikigraph ->
        Sub.batch [ Time.every 1000 Tick, PeerPort.receiveData, wikiGraphSub wikigraph, toastSub ]
    PostGameReview _ wikigraph ->
        Sub.batch [PeerPort.receiveData, wikiGraphSub wikigraph, toastSub]
    _ -> Sub.batch [ PeerPort.receiveData, toastSub ]


{-| we expect an integer for an initial seed
and a unique agent id generated by the peerJS server
-}
type alias Flags = {seed : Int, peerId : Maybe String}

initModel : Flags -> ( Model, Cmd Msg )
initModel {seed, peerId} =
    let (previewTitles, newSeed) = Articles.generateTitleList 2 (Random.initialSeed seed)
        phase = Welcome {inputJoinId="", inputName="", uuid=peerId, seed=newSeed, displayPages=(Nothing, Nothing)}

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

