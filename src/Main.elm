port module Main exposing (main)

import Browser
import Browser.Dom
import Dict exposing (Dict)
import Helpers exposing (..)
import Model exposing (..)
import PageFetch
import PeerPort
import Random
import Task
import Time
import Views exposing (view)


initCmd : Cmd Msg
initCmd =
    Cmd.batch [ Random.generate GotUUID <| Random.int 0 Random.maxInt, PeerPort.makePeer "" ]


initialModel : Model
initialModel =
    let
        gameState =
            { path = [], remainingDests = [], pastDests = [], time = 0 }

        options =
            { uuid = 0, numDestinations = 4, username = "", seedStr = "", isHost = False, joinId = "", peerId = "" }
    in
    { window = PreGame, gameState = gameState, dests = [], loadingDests = [], options = options, peers = Dict.empty, seedChange = "", numDestsChange = 4, gameStarted = False }


{-| call getPage when user clicks on a wikilink
-}
getPage : String -> Cmd Msg
getPage title =
    Cmd.map (GotPage title) <| PageFetch.getPage title


{-| call getDescription when loading the destination pages in preview
-}
getDescription : String -> Cmd Msg
getDescription title =
    Cmd.map (GotDescription title) <| PageFetch.getPage title


{-| scroll back up to top of page
-}
goBackToTop : Cmd Msg
goBackToTop =
    Task.perform (\_ -> NoOp) (Browser.Dom.setViewport 0 0)


port activateTooltipsSignal : String -> Cmd msg


{-| activate bootstrap tooltips
-}
activateTooltips =
    activateTooltipsSignal "This is a dummy value"


transition : Cmd Msg
transition =
    Cmd.batch [ activateTooltips, goBackToTop ]


{-| create a bootstrap Toast with the given message
-}
port makeToast : String -> Cmd msg


port activateClippySignal : String -> Cmd msg


{-| activate the cute clipboard thing for copying the host id
-}
activateClippy =
    activateClippySignal "This is a dummy value"


{-| create the game preview and request the page descriptions, and signal peers with the seedInfo
-}
createGame : Model -> ( Model, Cmd Msg )
createGame model =
    let
        numDestsChosen =
            model.options.numDestinations

        seedStrChosen =
            model.options.seedStr

        ( titles, _ ) =
            getDestinations numDestsChosen <| strToSeed seedStrChosen

        -- create empty page placeholders while we load their descriptions/pictures
        loadingDests =
            List.map Loading titles

        signalPeers =
            if model.options.isHost then
                PeerPort.sendData <| PeerPort.seedInfo numDestsChosen seedStrChosen

            else
                Cmd.none

        toast =
            makeToast <| "game seed is: " ++ seedStrChosen
    in
    ( { model | window = Preview, dests = [], loadingDests = loadingDests, seedChange = seedStrChosen, numDestsChange = numDestsChosen }
    , Cmd.batch <| activateTooltips :: activateClippy :: goBackToTop :: signalPeers :: toast :: List.map getDescription titles
    )


{-| transition to the gameplay and signal peers that game has started
-}
startGame : Model -> ( Model, Cmd Msg )
startGame model =
    case model.dests of
        start :: destinations ->
            let
                gameState =
                    { path = [ start ], remainingDests = destinations, pastDests = [ start ], time = 0 }

                startGameSignal =
                    if model.options.isHost then
                        PeerPort.sendData <| (PeerPort.gameStarted <| model.options.username ++ " started the game")

                    else
                        Cmd.none

                startReachSignal =
                    PeerPort.sendData <| PeerPort.titleReach model.options.uuid start.title
            in
            ( { model | window = InPage start, gameState = gameState, gameStarted = True }, Cmd.batch [ transition, startGameSignal, startReachSignal ] )

        [] ->
            ( { model | window = Bad "Can't start game with 0 destinations" }, Cmd.none )


{-| reset the game back to Game Preview and signal peers to do the same
-}
reset : Model -> ( Model, Cmd Msg )
reset model =
    let
        newGameState =
            { path = [], pastDests = [], remainingDests = [], time = 0 }

        signalPeers =
            if model.options.isHost then
                model.options.username ++ " wants a new game" |> PeerPort.newGame |> PeerPort.sendData

            else
                Cmd.none

        newPeerDict =
            let
                resetPeer peer =
                    { emptyPeer | username = peer.username, uuid = peer.uuid, isHost = peer.isHost }
            in
            Dict.map (\_ p -> resetPeer p) model.peers

        resetModel =
            { model | window = Preview, gameState = newGameState, gameStarted = False, dests = [], loadingDests = [], seedChange = "", peers = newPeerDict }

        ( newModel, cmd ) =
            createGame resetModel
    in
    ( newModel
    , Cmd.batch [ cmd, signalPeers ]
    )



{- *scarface voice* say hello to my enormous update function -}


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ChangeOptions options ->
            ( { model | options = options }, Cmd.none )

        ChangeOptsWhileInPreview opts ->
            ( { model | seedChange = opts.seed, numDestsChange = opts.numDests }, Cmd.none )

        StartGame ->
            startGame model

        GotDescription _ (Ok page) ->
            let
                newLoadingDests =
                    replaceWithLoaded page model.loadingDests

                allDestsLoaded =
                    doneLoading newLoadingDests

                newDests =
                    if allDestsLoaded then
                        extractLoadedDestinations newLoadingDests

                    else
                        model.dests

                newModel =
                    { model | dests = newDests, loadingDests = newLoadingDests }
            in
            if model.gameStarted && allDestsLoaded then
                startGame newModel

            else
                ( newModel, Cmd.none )

        GotDescription title (Err _) ->
            ( { model | window = Bad <| "Ran into issue getting description for " ++ title }, Cmd.none )

        GotPage _ (Ok page) ->
            let
                newPath =
                    page :: model.gameState.path

                state =
                    model.gameState

                signalTitleReached =
                    PeerPort.sendData <| PeerPort.titleReach model.options.uuid page.title

                signalGameFinished =
                    PeerPort.sendData <| PeerPort.gameFinish model.options.uuid (List.map .title newPath) state.time
            in
            case state.remainingDests of
                dest :: restOfDests ->
                    let
                        isPathCompleted =
                            page.title == dest.title && List.isEmpty restOfDests

                        newGameState =
                            if page.title == dest.title then
                                { state | path = newPath, remainingDests = restOfDests, pastDests = dest :: state.pastDests }

                            else
                                { state | path = newPath }
                    in
                    if isPathCompleted then
                        ( { model | window = Review [ model.options.uuid ], gameState = newGameState }, Cmd.batch [ signalGameFinished, signalTitleReached, transition ] )

                    else
                        ( { model | window = InPage page, gameState = newGameState }, Cmd.batch [ signalTitleReached, transition ] )

                [] ->
                    ( { model | window = Bad "Why are we out of destinations?" }, Cmd.none )

        GotPage title (Err _) ->
            ( { model | window = Bad <| "Http error while fetching " ++ title }, Cmd.none )

        ClickedLink title ->
            ( { model | window = Fetching title }, getPage title )

        GoBack ->
            let
                state =
                    model.gameState
            in
            case state.path of
                currentPage :: prevPage :: rest ->
                    if List.head state.path == List.head state.pastDests then
                        let
                            newState =
                                { state | path = prevPage :: rest, pastDests = popBy .title currentPage state.pastDests, remainingDests = currentPage :: state.remainingDests }
                        in
                        ( { model | window = InPage prevPage, gameState = newState }, transition )

                    else
                        ( { model | window = InPage prevPage, gameState = { state | path = prevPage :: rest } }, transition )

                _ ->
                    ( model, Cmd.none )

        Tick _ ->
            let
                state =
                    model.gameState

                newState =
                    { state | time = state.time + 10 }
            in
            ( { model | gameState = newState }, Cmd.none )

        NoOp ->
            ( model, Cmd.none )

        Refresh ->
            {- if model.seedChange == model.options.seedStr then
                   ( model, Cmd.none )

               else
            -}
            let
                options =
                    model.options

                newModel =
                    { model | options = { options | seedStr = model.seedChange, numDestinations = model.numDestsChange } }
            in
            createGame newModel

        ClickedJoinOrHost flag ->
            if String.isEmpty model.options.username then
                ( model, makeToast "You must give a username!" )

            else if not flag.isHost && String.isEmpty model.options.joinId then
                ( model, makeToast "You have to provide the host's game ID to join their game" )

            else
                let
                    ( previewModel, makeGameCmd ) =
                        createGame model

                    peerUninitialized =
                        String.isEmpty model.options.peerId

                    initPeerCmd =
                        PeerPort.initPeer { isHost = flag.isHost, username = model.options.username, connectId = model.options.joinId, uuid = model.options.uuid }

                    noFriendsToast =
                        makeToast "Your socket connection hasn't been initialized. Try refreshing if you'd like to play with friends."

                    cmd =
                        if flag.isHost && peerUninitialized then
                            Cmd.batch [ makeGameCmd, noFriendsToast, initPeerCmd ]

                        else if flag.isHost then
                            Cmd.batch [ makeGameCmd, initPeerCmd ]

                        else
                            Cmd.batch [ initPeerCmd, makeToast "attempting to join game..." ]

                    newOptions =
                        let
                            options =
                                model.options
                        in
                        { options | isHost = flag.isHost }
                in
                if flag.isHost then
                    ( { previewModel | options = { newOptions | joinId = "" } }, cmd )

                else
                    ( { model | options = newOptions }, cmd )

        PeerMsg (PeerPort.IdGenerated id) ->
            let
                options =
                    model.options
            in
            ( { model | options = { options | peerId = id } }, Cmd.none )

        PeerMsg (PeerPort.SeedInfo num seed) ->
            if model.options.isHost then
                ( { model | window = Bad "Host shouldnt be receiving seedinfo" }, Cmd.none )

            else
                let
                    options =
                        model.options
                in
                createGame { model | options = { options | numDestinations = num, seedStr = seed } }

        PeerMsg (PeerPort.GameStart startMsg) ->
            if model.options.isHost then
                ( { model | window = Bad "Host shouldnt be receiving game start message" }, Cmd.none )

            else
                let
                    toast =
                        case String.trim startMsg of
                            "" ->
                                Cmd.none

                            s ->
                                makeToast s

                    allDestsLoaded =
                        doneLoading model.loadingDests

                    ( newModel, cmd ) =
                        startGame model
                in
                if allDestsLoaded then
                    ( newModel, Cmd.batch [ cmd, toast ] )

                else
                    ( { model | gameStarted = True }, toast )

        PeerMsg (PeerPort.TitleReach uuid title) ->
            case Dict.get uuid model.peers of
                Just peer ->
                    let
                        updatedPeer =
                            let
                                newLastDest =
                                    if List.member title <| List.map .title model.dests then
                                        title

                                    else
                                        peer.lastDest
                            in
                            { peer | lastDest = newLastDest, currentTitle = title }

                        hostEcho =
                            if model.options.isHost then
                                PeerPort.sendData <| PeerPort.titleReach uuid title

                            else
                                Cmd.none

                        toast =
                            if List.member title (List.map .title model.dests) then
                                makeToast <| peer.username ++ " found " ++ title

                            else
                                Cmd.none
                    in
                    ( { model | peers = Dict.insert uuid updatedPeer model.peers }, Cmd.batch [ hostEcho, toast ] )

                Nothing ->
                    ( model, Cmd.none )

        PeerMsg (PeerPort.PeerConnect peerUsername peerUUID) ->
            -- ignore the host echoing back that you've joined
            if peerUUID == model.options.uuid then
                ( model, Cmd.none )

            else
                let
                    newPeer =
                        { emptyPeer | username = peerUsername, uuid = peerUUID }

                    newPeerDict =
                        Dict.insert peerUUID newPeer model.peers

                    hostEcho =
                        -- echo back to all peers that new person joined
                        PeerPort.sendData <| PeerPort.peerConnect peerUsername peerUUID

                    peerList =
                        List.map (\peer -> { username = peer.username, uuid = peer.uuid, isHost = False, finished = peer.finished, lastDest = peer.lastDest }) <| Dict.values model.peers

                    peerListWithHost =
                        let
                            finished =
                                case model.window of
                                    Review _ ->
                                        True

                                    _ ->
                                        False

                            lastDest =
                                List.head model.gameState.pastDests |> Maybe.map .title |> Maybe.withDefault ""
                        in
                        { username = model.options.username, uuid = model.options.uuid, isHost = True, finished = finished, lastDest = lastDest } :: peerList

                    hostSendGameInfo =
                        -- echo message containing the game info tagged with the new peer's uuid
                        PeerPort.sendData <| PeerPort.gameInfo peerUUID { seed = model.options.seedStr, numDestinations = model.options.numDestinations, peers = peerListWithHost, started = model.gameStarted }

                    toast =
                        makeToast <| peerUsername ++ " joined the game"
                in
                if model.options.isHost then
                    ( { model | peers = newPeerDict }, Cmd.batch [ hostSendGameInfo, hostEcho, toast ] )

                else
                    ( { model | peers = newPeerDict }, toast )

        PeerMsg (PeerPort.PeerDisconnect uuid) ->
            let
                newPeerDict =
                    Dict.remove uuid model.peers

                hostEcho =
                    if model.options.isHost then
                        PeerPort.sendData <| PeerPort.peerDisconnect uuid

                    else
                        Cmd.none

                toast =
                    case Maybe.map .username <| Dict.get uuid model.peers of
                        Just name ->
                            makeToast <| name ++ " has left the game"

                        Nothing ->
                            Cmd.none
            in
            ( { model | peers = newPeerDict }, Cmd.batch [ hostEcho, toast ] )

        PeerMsg (PeerPort.HostLost message) ->
            if model.options.isHost then
                ( { model | window = Bad "Host connection was lost... but you're the host" }, Cmd.none )

            else
                ( initialModel, Cmd.batch <| [ makeToast message, initCmd ] )

        PeerMsg (PeerPort.GameFinish peeruuid path time) ->
            case Dict.get peeruuid model.peers of
                Just peer ->
                    let
                        peerGotToEnd =
                            (List.reverse >> List.head >> Maybe.map .title) model.dests == List.head path

                        updatedPeer =
                            { peer | path = path, time = time, finished = True }

                        toast =
                            if peerGotToEnd then
                                peer.username ++ " has finished!"

                            else
                                peer.username ++ " gave up"

                        hostEcho =
                            if model.options.isHost then
                                PeerPort.sendData <| PeerPort.gameFinish peeruuid path time

                            else
                                Cmd.none
                    in
                    ( { model | peers = Dict.insert peeruuid updatedPeer model.peers }, Cmd.batch [ hostEcho, makeToast toast ] )

                Nothing ->
                    ( model, Cmd.none )

        PeerMsg (PeerPort.GameInfo uuid info) ->
            if uuid == model.options.uuid then
                let
                    hostName =
                        (List.filter .isHost >> List.head >> Maybe.map .username >> Maybe.withDefault "???") info.peers

                    addPeerToDict peer dict =
                        Dict.insert peer.uuid { emptyPeer | uuid = peer.uuid, username = peer.username, isHost = peer.isHost, finished = peer.finished, lastDest = peer.lastDest } dict

                    newPeerDict =
                        List.foldl addPeerToDict model.peers info.peers

                    options =
                        model.options

                    ( newModel, cmd ) =
                        createGame { model | options = { options | seedStr = info.seed, numDestinations = info.numDestinations }, peers = newPeerDict, gameStarted = info.started }
                in
                ( newModel, Cmd.batch [ cmd, makeToast <| "You joined " ++ hostName ++ "'s game" ] )

            else
                ( model, Cmd.none )

        PeerMsg (PeerPort.Malformed errorString) ->
            ( { model | window = Bad errorString }, Cmd.none )

        PeerMsg (PeerPort.Error err) ->
            ( model, makeToast err )

        GotUUID uuid ->
            let
                options =
                    model.options
            in
            ( { model | options = { options | uuid = uuid } }, Cmd.none )

        ToggleReviewPlayer uuid ->
            case model.window of
                Review highlightedPlayers ->
                    let
                        newHighlightedPlayers =
                            if List.member uuid highlightedPlayers then
                                List.filter ((/=) uuid) highlightedPlayers

                            else
                                uuid :: highlightedPlayers
                    in
                    ( { model | window = Review newHighlightedPlayers }, Cmd.none )

                _ ->
                    ( model, Cmd.none )

        GiveUp ->
            let
                peerMsg =
                    PeerPort.sendData <| PeerPort.gameFinish model.options.uuid (List.map .title model.gameState.path) model.gameState.time
            in
            ( { model | window = Review [ model.options.uuid ] }, peerMsg )

        ClickedNewGame ->
            if model.options.isHost then
                reset model

            else
                ( { model | window = Bad "Only hosts can start new games" }, Cmd.none )

        PeerMsg (PeerPort.HostWantsNewGame str) ->
            let
                toast =
                    makeToast str

                ( newModel, cmd ) =
                    reset model
            in
            ( newModel, Cmd.batch [ cmd, toast ] )


subscriptions : Model -> Sub Msg
subscriptions model =
    let
        tickSub =
            case model.window of
                InPage _ ->
                    Time.every 100 Tick

                _ ->
                    Sub.none
    in
    Sub.batch <| [ tickSub, Sub.map PeerMsg PeerPort.receiveDataFromJS ]


main : Program () Model Msg
main =
    Browser.element
        { init = \_ -> ( initialModel, initCmd )
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
