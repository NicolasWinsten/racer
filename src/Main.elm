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

{-| retrieve the content of a wikipedia page along with the current time when it is loaded
-}
getPage : Title -> Cmd Msg
getPage title = PageFetch.getPage title
    -- I want a timestamp even if the request fails
    -- so I convert getPage from Task String Page to Task x (Result String Page)
        -- |> Task.attempt (\r -> LoadedPage title r (Time.millisToPosix 0))
    |> Task.map Ok
    |> Task.onError (Err >> Task.succeed) -- 
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


transition : Cmd Msg
transition =
    Cmd.batch [ goBackToTop ]


{-| create a bootstrap Toast with the given message
-}
port makeToast : String -> Cmd msg

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

{-| transition to the gameplay by loading the start page

signal peers that game has started (if hosting)
-}
startGame : InProgressGame -> Time.Posix -> ( Model, Cmd Msg )
startGame game time =
    let
        -- notify connected players to begin the game (if you're the host)
        startGameSignal = cmdIf game.amHost
            <| PeerPort.broadcast (gameStateMessage game)

        start = game.self.gameState.currentLeg.currentPage
        -- fetch the page you're supposed to be on
        startPageRequest = getPage start
    in
    ( InGame (Left start) game
        { startTime=time
        , currentTime=time
        , displayToc=False
        }
        (WikiGraph.init game.destinations)
    , Cmd.batch [ transition, startGameSignal, makeToast "Host started the game", startPageRequest ]
    )


{- *scarface voice* say hello to my enormous update function -}


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        -- changing inputs on the welcome screen
        OnInputWelcomeParams {name, joinId} -> case model of
            Welcome options -> (Welcome {options | inputJoinId=joinId, inputName=name}, Cmd.none)
            _ -> (Bad "ERROR: Changing username/joinId outside of Welcome page", Cmd.none)

        -- host is changing the number of destinations in the lobby
        OnInputLobbyParams {numDestinations} -> case model of
            Lobby lobby opts -> ( Lobby lobby {opts | numDestinationsInput=numDestinations}, Cmd.none )
            _ -> (Bad "ERROR: Changing game parameters while not in lobby", Cmd.none)

        -- host clicked start game, get the current time and transition to gameplay
        ClickedStartGame -> (model, Task.perform ReadyToStartGame Time.now)

        -- transition to gameplay if destinations are done loading
        ReadyToStartGame time -> case model of
            Lobby lobby _ -> -- host will be in lobby when clicking Start Game
                if List.length lobby.destinations == lobby.numDestinations then
                    case lobbyToGameState lobby of
                        Just newGame -> startGame newGame time
                        Nothing -> (Bad "Cannot start game with less than 2 destinations", Cmd.none)
                else (model, makeToast "Destinations not done loading")

            InGame _ game _ _ ->
                -- after the other players have received the GameState message from the host
                -- they will be InGame
                startGame game time

            _ -> (Bad "Cannot start a game outside of the lobby", Cmd.none)

        -- host loaded a page preview for one of the destinations
        LoadedDestinationPreview _ (Ok page) -> case model of
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

                in ( Lobby newLobby options, cmd )
            _ -> ( Bad "Cannot load page preview outside of lobby", Cmd.none )

        LoadedDestinationPreview title (Err err) ->
            ( Bad <| "Request for destination title " ++ title ++ " failed: " ++ err, Cmd.none )
        
        LoadedWelcomePreview pageResult -> case pageResult of
            Ok page -> case model of
                Welcome ({displayPages} as opts) ->
                    let (left,right) = displayPages
                    -- only update the welcome display if the loaded page has a thumbnail to display
                    in case page.thumbnail of
                        Just _ -> (Welcome {opts | displayPages=(Just page,left)}, Cmd.none)
                        Nothing -> (model, Cmd.none)
                _ -> (model, Cmd.none)
            Err err ->
                (model, makeToast err)


        -- loaded page after clicking a link in game
        -- update the game state, signal peers about reaching the new title
        LoadedPage _ (Ok page) time -> case model of
            InGame _ game opts wikigraph ->
                let
                    self = game.self

                    newGameState =
                        let newState = updateGameState page.title self.gameState 
                        in
                        if isGameFinished newState then { newState | finishTime=Just gameTime}
                        else newState
                    -- time since game start
                    gameTime = Time.posixToMillis time - Time.posixToMillis opts.startTime

                    signalTitleReached = case game.uuid of
                        Just uuid -> PeerPort.broadcast
                            <| PlayerReachedTitle uuid page.title gameTime
                        Nothing -> Cmd.none
                    
                    cmd = Cmd.batch [signalTitleReached, goBackToTop]

                    newWikiGraph = WikiGraph.update (Maybe.withDefault "" game.uuid) newGameState wikigraph
                in
                if isGameFinished newGameState then
                    ( PostGameReview { game | self={ self | gameState=newGameState } } newWikiGraph
                    , cmd
                    )
                else
                    ( InGame (Right page)
                        { game | self={ self | gameState=newGameState} }
                        { opts | currentTime=time }
                        newWikiGraph
                    , cmd )
            _ -> (model, makeToast <| "loaded page " ++ page.title)

        LoadedPage title (Err err) _ -> ( Bad <| "Request for title " ++ title ++ " failed: " ++ err, Cmd.none )

        ClickedLink title -> case model of
            InGame _ game opts wikigraph -> (InGame (Left title) game opts wikigraph, getPage title)
            -- maybe allow this message while in the post game to signal clicking a wikigraph node
            _ -> (Bad <| "How did you click a wikilink while not on a wikipage?", Cmd.none)

        Tick time -> case model of
            Welcome opts ->
                let (newTitle, newSeed) = Articles.generateTitleList 1 opts.seed
                    fetchExamplePage = Maybe.map getWelcomePreview (List.head newTitle)
                        |> Maybe.withDefault Cmd.none 
                in (Welcome {opts | seed=newSeed}, fetchExamplePage)
            InGame page game opts wikigraph -> (InGame page game { opts | currentTime=time } wikigraph, Cmd.none)
            _ -> (Bad "We shouldn't be ticking outside of gameplay", Cmd.none)

        NoOp ->
            ( model, Cmd.none )

        RefreshLobby -> case model of
            Lobby lobby opts ->
                let
                    chosenNum = opts.numDestinationsInput
                    
                    (destinationTitles, newSeed) = Articles.generateTitleList chosenNum lobby.seed

                    fetchDestinationPreviews = Cmd.batch <| List.map getPreview destinationTitles
                in
                ( Lobby {lobby | seed=newSeed, numDestinations=chosenNum, destinations=[]} opts
                , fetchDestinationPreviews
                )
            _ -> ( Bad "Cannot refresh lobby while not in lobby", Cmd.none )

        ClickedJoinGame -> case model of
            Welcome {inputJoinId, inputName} ->
                if inputName == "" then (model, makeToast "You must give username!")
                else if inputJoinId == "" then (model, makeToast "You have to provide the host's game ID to join their game")
                else (model, Cmd.batch [makeToast "Attempting to join game...", PeerPort.connectToHost {hostId=inputJoinId, name=inputName}])
            _ -> ( Bad "How did you click to join game while not in the welcome screen?", Cmd.none)
        
        ClickedHostGame -> case model of
            Welcome {inputName, uuid, seed} ->
                if inputName == "" then (model, makeToast "You must give username!")
                else
                    let
                        (newLobby, cmds) = update RefreshLobby <|
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
                    in
                    ( newLobby, Cmd.batch [cmds, makeToast "Attempting to host game...", PeerPort.hostGame])
            _ -> ( Bad "How did you click to join game while not in the welcome screen?", Cmd.none)

        -- some player reached a page in so many milliseconds
        -- update game state, update wikigraph (set new page as the player's current node)
        PeerMsg (PlayerReachedTitle uuid title time) ->
            let
                -- take the player's gamestate, update it with the new title

                -- updatePlayerList = Dict.update uuid
                --     (Maybe.map (\player -> {player | gameState=newGameState player.gameState}))
                
                -- update the player state with the new title and update the wikigraph
                updateGame game wikigraph = case Dict.get uuid game.players of
                    Just player ->
                        let newPlayerState =
                                let g = updateGameState title player.gameState
                                    finished = isGameFinished g
                                in { g | finishTime=if finished then Just time else Nothing }
                            newWikiGraph = WikiGraph.update uuid newPlayerState wikigraph
                        in
                        ( {game | players=Dict.insert uuid {player | gameState=newPlayerState} game.players}
                        , newWikiGraph
                        )
                    Nothing -> (game, wikigraph)
            in
            case model of
                InGame page game opts wikigraph ->
                    let (newGame, newWikiGraph) = updateGame game wikigraph
                    in (InGame page newGame opts newWikiGraph, Cmd.none)
                    
                PostGameReview game wikigraph ->
                    let (newGame, newWikiGraph) = updateGame game wikigraph
                    in (PostGameReview newGame newWikiGraph, Cmd.none)
                
                _ ->
                    (Bad "Received title from player when there is no current game...", Cmd.none)
        
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
            case model of
                Lobby lobby opts ->
                    let
                        newPlayerList = Dict.insert uuid
                            {name=username, color=newPlayerColor lobby}
                            lobby.players

                        newLobby = {lobby | players=newPlayerList}
                    -- if host, send lobby information back to the new player
                        sendLobbyInfo = PeerPort.directedMessage uuid <| lobbyInfoMessage newLobby
                    in ( Lobby newLobby opts, Cmd.batch [sendLobbyInfo, makeToast <| username ++ " joined the game"])
                
                InGame page game opts wikigraph -> case updateGame game of
                    Just newGame -> ( InGame page newGame opts wikigraph, Cmd.batch [sendGameInfo newGame, makeToast <| username ++ " joined the game"])
                    Nothing -> (Bad "Something went wrong updating the game with new player", Cmd.none)
                    
                PostGameReview game wikigraph -> case updateGame game of
                    Just newGame -> ( PostGameReview newGame wikigraph, Cmd.batch [sendGameInfo newGame, makeToast <| username ++ " joined the game"])
                    Nothing -> (Bad "Something went wrong updating the game with new player", Cmd.none)

                _ ->
                    ( Bad <| "Error: Player " ++ username ++ " : " ++ uuid ++ " connected when no game has been set up", Cmd.none)

        PeerMsg (PeerDisconnected uuid) ->
            let
                toast players = case Dict.get uuid players of
                    Just player ->
                        makeToast <| player.name ++ " has left the game"
                    Nothing ->
                        Cmd.none
                
                -- if game is in progress, mark them disconnected but keep their game state
                -- (in case they join back later)
                updatePlayerList = Dict.update uuid 
                    <| Maybe.map (\player -> {player | connected = False})
            in
            case model of
                Lobby lobby opts ->
                    ( Lobby {lobby | players=Dict.remove uuid lobby.players} opts, toast lobby.players)
                InGame page game opts wikigraph->
                    ( InGame page {game | players=updatePlayerList game.players} opts wikigraph, toast game.players)
                PostGameReview game wikigraph ->
                    ( PostGameReview {game | players=updatePlayerList game.players} wikigraph, toast game.players)
                _ ->  ( Bad "Peer disconnected while not in lobby/game", Cmd.none)

        PeerMsg HostLost ->
            let
                toast = makeToast "Connection to host lost..."
                -- mark all players disconnected
                newPlayerList game =
                    let players = Dict.map (\_ player -> {player | connected=False}) game.players
                    in { game | players=players}
            in case model of
                InGame page game opts wikigraph ->
                    (InGame page (newPlayerList game) opts wikigraph, toast)
                PostGameReview game wikigraph ->
                    (PostGameReview (newPlayerList game) wikigraph, toast)
                Lobby lobby _ ->
                    (Welcome {inputJoinId="", inputName=lobby.self.name, seed=lobby.seed, uuid=lobby.uuid, displayPages=(Nothing, Nothing)}, toast)
                _ -> (model, toast)

        -- receiving a game state message from the host means to enter in-game phase
        PeerMsg (GameStateMessage game) ->
            let
                start = List.head game.destinations
                    |> Maybe.map .title >> Maybe.withDefault "ERROR, HOST DID NOT SEND DESTINATIONS"

                newGame opts = updateGameInfo opts game
                    |> Maybe.map
                        (\g -> let wikigraph = WikiGraph.init g.destinations in
                            (InGame (Left start) g {startTime=Time.millisToPosix 0, currentTime=Time.millisToPosix 0, displayToc=False} wikigraph, cmds)
                        )
                    |> Maybe.withDefault (Bad "Could not find yourself in the game information", Cmd.none)

                cmds = Cmd.batch [Task.perform ReadyToStartGame Time.now, makeToast "You joined the game"]
            in case model of
                Welcome opts -> newGame opts
                Lobby lobby _ -> newGame lobby
                _ -> (Bad "Received a game invite but you're not eligible", Cmd.none)
        
        -- host has sent lobby info
        -- either means you're just joining the lobby or the destination pages have changed
        PeerMsg (LobbyInfoMessage lobby) ->
            let newGame opts = updateGameInfo opts lobby
                    |> Maybe.map (\g -> Lobby g {numDestinationsInput=List.length g.destinations})
                    |> Maybe.withDefault (Bad "Could not find yourself in the lobby information")
            in case model of
                Welcome opts -> (newGame opts, makeToast "You joined the lobby")
                Lobby opts _ -> (newGame opts, makeToast "Destination pages changed")
                InGame _ opts _ _ -> (newGame opts, makeToast "Host wants a new game")
                PostGameReview opts _ -> (newGame opts, makeToast "Host wants a new game")
                _ -> (Bad "Why are you receiving lobby invitation?", Cmd.none)

        PeerMsg (Error err) ->
            ( model, makeToast <| "P2P error: " ++ err )

        GiveUp -> case model of
            InGame _ game _ wikigraph -> (PostGameReview game wikigraph, Cmd.none)
            _ -> (Bad "You can't give up! You're not even playing", Cmd.none)

        ClickedNewGame -> case model of
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
                    ( Lobby lobby {numDestinationsInput=game.numDestinations}
                    , PeerPort.broadcast (lobbyInfoMessage lobby)
                    )
                else
                    (Bad "You can't click new game if you're not the host", Cmd.none)
            _ -> (Bad "You clicked new game outside of the review page", Cmd.none)
        
        CopyToClipboard str -> (model, copyToClipboard str)

        -- received animation frame and ticked the wikigraph force sim
        UpdatedWikiGraph wikigraph -> case model of
            InGame page game opts _ -> (InGame page game opts wikigraph, Cmd.none)
            PostGameReview game _ -> (PostGameReview game wikigraph, Cmd.none)
            _ -> (Bad "Why are you receiving wikigraph tick?", Cmd.none)

        DisplayToc toggle -> case model of
            InGame page game opts wikigraph ->
                (InGame page game {opts | displayToc=toggle} wikigraph, Cmd.none)
            _ ->
                (model, Cmd.none) 


subscriptions : Model -> Sub Msg
subscriptions model =
    let wikiGraphSimulationTicker = WikiGraph.subscription >> Sub.map UpdatedWikiGraph
    in
    case model of
    -- ticks on welcome to request more example titles
    Welcome _ -> Sub.batch [ Time.every 5000 Tick, PeerPort.receiveData]
    -- ticks while in game to update the time display
    InGame _ _ _ wikigraph ->
        Sub.batch [ Time.every 1000 Tick, PeerPort.receiveData, wikiGraphSimulationTicker wikigraph ]
    PostGameReview _ wikigraph ->
        Sub.batch [PeerPort.receiveData, wikiGraphSimulationTicker wikigraph]
    _ -> PeerPort.receiveData


{-| we expect an integer for an initial seed
and a unique agent id generated by the peerJS server
-}
type alias Flags = {seed : Int, peerId : Maybe String}

initModel : Flags -> ( Model, Cmd Msg )
initModel {seed, peerId} =
    let (previewTitles, newSeed) = Articles.generateTitleList 2 (Random.initialSeed seed)
    in
    ( Welcome {inputJoinId="", inputName="", uuid=peerId, seed=newSeed, displayPages=(Nothing, Nothing)}
    , Cmd.batch <| List.map getWelcomePreview previewTitles
    )

main : Program Flags Model Msg
main =
    Browser.element
        { init = initModel
        , view = view
        , update = update
        , subscriptions = subscriptions
        }

