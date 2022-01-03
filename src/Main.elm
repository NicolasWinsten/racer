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


initialModel : Model
initialModel =
    let
        gameState =
            { path = [], remainingDests = [], pastDests = [], time = 0 }

        options =
            { uuid = 0, numDestinations = 6, username = "", seedStr = "", isHost = False, joinId = "", peerId = "" }
    in
    { window = PreGame, gameState = gameState, dests = [], loadingDests = [], options = options, peers = Dict.empty, seedChange = "", gameStarted = False }


getPage : String -> Cmd Msg
getPage title =
    Cmd.map (GotPage title) <| PageFetch.getPage title


getDescription : String -> Cmd Msg
getDescription title =
    Cmd.map (GotDescription title) <| PageFetch.getPage title


goBackToTop : Cmd Msg
goBackToTop =
    Task.perform (\_ -> NoOp) (Browser.Dom.setViewport 0 0)


port activateTooltipsSignal : String -> Cmd msg


activateTooltips =
    activateTooltipsSignal "This is a dummy value"


transition : Cmd Msg
transition =
    Cmd.batch [ activateTooltips, goBackToTop ]



-- create a bootstrap Toast with the given message


port makeToast : String -> Cmd msg



-- activate the cute clipboard thing for copying the host id


port activateClippySignal : String -> Cmd msg


activateClippy =
    activateClippySignal "This is a dummy value"



{- create the game preview and request the page descriptions, and signal peers with the seedInfo -}


createGame : Model -> ( Model, Cmd Msg )
createGame model =
    let
        ( titles, _ ) =
            getDestinations model.options.numDestinations <| strToSeed model.options.seedStr

        -- create empty page placeholders while we load their descriptions/pictures
        loadingDests =
            List.map Loading titles

        signalPeers =
            if model.options.isHost then
                PeerPort.sendData <| PeerPort.seedInfo model.options.numDestinations model.options.seedStr

            else
                Cmd.none

        toast =
            makeToast <| "game seed is: " ++ model.options.seedStr
    in
    ( { model | window = Preview, dests = [], loadingDests = loadingDests }
    , Cmd.batch <| activateTooltips :: activateClippy :: goBackToTop :: signalPeers :: toast :: List.map getDescription titles
    )


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



{- *scarface voice* say hello to my enormous update function -}


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ChangeOptions options ->
            ( { model | options = options }, Cmd.none )

        ChangeSeedWhileInPreview seed ->
            ( { model | seedChange = seed }, Cmd.none )

        StartGame ->
            startGame model

        GotDescription _ (Ok page) ->
            let
                newLoadingDests =
                    replaceWithLoaded page model.loadingDests

                newDests =
                    if List.all destIsLoaded newLoadingDests then
                        extractLoadedDestinations newLoadingDests

                    else
                        model.dests
            in
            ( { model | dests = newDests, loadingDests = newLoadingDests }, Cmd.none )

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

                        signal =
                            if isPathCompleted then
                                Cmd.batch [ signalGameFinished, signalTitleReached ]

                            else if page.title == dest.title then
                                signalTitleReached

                            else
                                Cmd.none
                    in
                    if isPathCompleted then
                        ( { model | window = Review model.options.uuid, gameState = newGameState }, Cmd.batch [ signal, transition ] )

                    else
                        ( { model | window = InPage page, gameState = newGameState }, Cmd.batch [ signal, transition ] )

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
                    { state | time = state.time + 1 }
            in
            ( { model | gameState = newState }, Cmd.none )

        NoOp ->
            ( model, Cmd.none )

        Refresh ->
            if model.seedChange == model.options.seedStr then
                ( model, Cmd.none )

            else
                let
                    options =
                        model.options

                    newModel =
                        { model | options = { options | seedStr = model.seedChange } }
                in
                createGame newModel

        ClickedJoinOrHost flag ->
            if String.isEmpty model.options.username then
                ( model, makeToast "You must give a username!" )

            else if not flag.isHost && String.isEmpty model.options.joinId then
                ( model, makeToast "You have to provide the host's game ID to join their game" )

            else
                let
                    ( previewModel, cmd ) =
                        createGame model

                    initPeerCmd =
                        PeerPort.initPeer { isHost = flag.isHost, username = model.options.username, connectId = model.options.joinId, uuid = model.options.uuid }

                    newOptions =
                        let
                            options =
                                model.options
                        in
                        { options | isHost = flag.isHost }
                in
                if flag.isHost then
                    ( { previewModel | options = { newOptions | joinId = "" } }, Cmd.batch [ cmd, initPeerCmd ] )

                else
                    ( { model | options = newOptions }, Cmd.batch [ initPeerCmd, makeToast "attempting to join game..." ] )

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

                    ( newModel, cmd ) =
                        startGame model
                in
                ( newModel, Cmd.batch [ cmd, toast ] )

        PeerMsg (PeerPort.TitleReach uuid title) ->
            case Dict.get uuid model.peers of
                Just peer ->
                    let
                        updatedPeer =
                            { peer | lastDest = title }

                        hostEcho =
                            if model.options.isHost then
                                PeerPort.sendData <| PeerPort.titleReach uuid title

                            else
                                Cmd.none
                    in
                    ( { model | peers = Dict.insert uuid updatedPeer model.peers }, hostEcho )

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
                        List.map (\peer -> { username = peer.username, uuid = peer.uuid, isHost = False }) <| Dict.values model.peers

                    peerListWithHost =
                        { username = model.options.username, uuid = model.options.uuid, isHost = True } :: peerList

                    hostSendGameInfo =
                        -- echo message containing the game info tagged with the new peer's uuid
                        PeerPort.sendData <| PeerPort.gameInfo peerUUID { seed = model.options.seedStr, numDestinations = model.options.numDestinations, peers = peerListWithHost, started = model.gameStarted }
                in
                if model.options.isHost then
                    ( { model | peers = newPeerDict }, Cmd.batch [ hostSendGameInfo, hostEcho ] )

                else
                    ( { model | peers = newPeerDict }, Cmd.none )

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
                let
                    options =
                        model.options
                in
                ( { initialModel | options = options }, makeToast message )

        PeerMsg (PeerPort.GameFinish peeruuid path time) ->
            case Dict.get peeruuid model.peers of
                Just peer ->
                    let
                        updatedPeer =
                            { peer | path = path, time = time }
                    in
                    ( { model | peers = Dict.insert peeruuid updatedPeer model.peers }, makeToast <| peer.username ++ " has finished!" )

                Nothing ->
                    ( model, Cmd.none )

        PeerMsg (PeerPort.GameInfo uuid info) ->
            if uuid == model.options.uuid then
                let
                    addPeerToDict peer dict =
                        Dict.insert peer.uuid { emptyPeer | uuid = peer.uuid, username = peer.username, isHost = peer.isHost } dict

                    newPeerDict =
                        List.foldl addPeerToDict model.peers info.peers

                    options =
                        model.options

                    newModel =
                        { model | options = { options | seedStr = info.seed, numDestinations = info.numDestinations }, peers = newPeerDict }
                in
                createGame newModel

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

        ReviewPlayer uuid ->
            ( { model | window = Review uuid }, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    let
        tickSub =
            case model.window of
                InPage _ ->
                    Time.every 10 Tick

                _ ->
                    Sub.none
    in
    Sub.batch <| [ tickSub, Sub.map PeerMsg PeerPort.receiveDataFromJS ]


main : Program () Model Msg
main =
    let
        initCmd =
            Cmd.batch [ Random.generate GotUUID <| Random.int 0 Random.maxInt, PeerPort.makePeer "" ]
    in
    Browser.element
        { init = \flags -> ( initialModel, initCmd )
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
