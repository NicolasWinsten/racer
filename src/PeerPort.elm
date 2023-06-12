{-
This module contains the functionality for communicating with
other players through PeerJS [https://peerjs.com/]
-}

port module PeerPort exposing
    ( hostGame
    , connectToHost
    , receiveData
    , sendData
    , broadcast
    , directedMessage
    )


import Json.Decode as Decode exposing (Decoder, Value, field)
import Json.Encode as Encode
import Model exposing (..)
import Types exposing (..)
import Element exposing (Color, toRgb, rgb)
import Json.Decode as Decode


{-| broadcast a message to all peers
-}
broadcast : PeerMsg -> Cmd msg
broadcast msg = sendData <|
    Encode.object [("type", Encode.string "broadcast"), ("message", encodeMsg msg)]

{-| send a message to a specific peer
-}
directedMessage : PeerId -> PeerMsg -> Cmd msg
directedMessage recipient msg = sendData <|
    Encode.object [("type", Encode.string "directed"), ("recipient", Encode.string recipient), ("message", encodeMsg msg)]


{-| tell peerJS agent to start listening for connections
-}
port host : String -> Cmd msg

hostGame : Cmd msg
hostGame = host "junk value"

{-| tell peerJS agent to connect to peer with given id
-}
port connectToHostPort : Value -> Cmd msg

connectToHost : {hostId : PeerId, name : String} -> Cmd msg
connectToHost {hostId, name} = connectToHostPort <|
    Encode.object [("host", Encode.string hostId), ("name", Encode.string name)]

{-|produce a value for a Maybe according to the given encoder.
if the item is Nothing, encode null
-}
maybeEncode : (a -> Value) -> Maybe a -> Value
maybeEncode encoder item = case item of
    Just val -> encoder val
    Nothing -> Encode.null

encodePagePreview : PagePreview -> Value
encodePagePreview {title, thumbnail, description, shortdescription} =
    let encodeThumbnail {src,width,height} = Encode.object
            [("src", Encode.string src), ("width", Encode.float width), ("height", Encode.float height)]
    in
    Encode.object
        [ ("title", Encode.string title)
        , ("thumbnail", maybeEncode encodeThumbnail thumbnail)
        , ("description", maybeEncode Encode.string description)
        , ("shortdescription", maybeEncode Encode.string shortdescription)
        ]

decodePagePreview : Decoder PagePreview
decodePagePreview =
    let thumbnailDecoder = Decode.map3
            (\src width height -> {src=src, width=width, height=height})
            (field "src" Decode.string)
            (field "width" Decode.float)    
            (field "height" Decode.float) 
    in Decode.map4
        (\title thumbnail desc short -> {title=title, thumbnail=thumbnail, description=desc, shortdescription=short})
        (field "title" Decode.string)
        (Decode.maybe (field "thumbnail" thumbnailDecoder))
        (Decode.maybe <| field "description" Decode.string)
        (Decode.maybe <| field "shortdescription" Decode.string)

encodeColor : Color -> Value
encodeColor color =
    let
        {red, green, blue} = toRgb color
    in Encode.object [("r", Encode.float red), ("g", Encode.float green), ("b", Encode.float blue)]

decodeColor : Decoder Color
decodeColor = Decode.map3 rgb
    (field "r" Decode.float)
    (field "g" Decode.float)
    (field "b" Decode.float)

encodePlayer : Player InLobbyAttributes -> Value
encodePlayer {name, color} = Encode.object [("name", Encode.string name), ("color", encodeColor color)]

decodePlayer : Decoder (Player InLobbyAttributes)
decodePlayer = Decode.map2 (\name color -> {name=name, color=color})
    (field "name" Decode.string)
    (field "color" decodeColor)


encodePlayerWithGameState : Player InGameAttributes -> Value
encodePlayerWithGameState {name, color, gameState, connected} =
    let
        encodeLeg : Leg -> Value
        encodeLeg {previousPages, currentPage, goal} = Encode.object
            [ ("previous", Encode.list Encode.string previousPages)
            , ("current", Encode.string currentPage)
            , ("goal", Encode.string goal)
            ]

        encodeGameState : GameState -> Value
        encodeGameState {previousLegs, currentLeg, remainingDestinations, finishTime} =
            Encode.object
                [ ("completed", Encode.list encodeLeg previousLegs)
                , ("current", encodeLeg currentLeg)
                , ("remaining", Encode.list Encode.string remainingDestinations)
                , ("time", maybeEncode Encode.int finishTime)
                ]
    in Encode.object
        [ ("name", Encode.string name)
        , ("color", encodeColor color)
        , ("gamestate", encodeGameState gameState)
        , ("connected", Encode.bool connected)
        ]

decodePlayerWithGameState : Decoder (Player InGameAttributes)
decodePlayerWithGameState =
    let
        legDecoder : Decoder Leg
        legDecoder = Decode.map3 (\previous current goal -> {previousPages=previous, currentPage=current, goal=goal})
            (field "previous" (Decode.list Decode.string))
            (field "current" Decode.string)
            (field "goal" Decode.string)

        gameStateDecoder : Decoder GameState
        gameStateDecoder = Decode.map4
            (\completed currentLeg remainingDests time -> {previousLegs=completed, currentLeg=currentLeg, remainingDestinations=remainingDests, finishTime=time})
            (field "completed" (Decode.list legDecoder))
            (field "current" legDecoder)
            (field "remaining" (Decode.list Decode.string))
            (field "time" (Decode.nullable Decode.int))

    in Decode.map4
        (\name color gameState connected ->
            {name=name, color=color, gameState=gameState, connected=connected}
        )
        (field "name" Decode.string)
        (field "color" decodeColor)
        (field "gamestate" gameStateDecoder)
        (field "connected" Decode.bool)

{-|encode a PeersMsg into JSON that can be sent over to a peer

some types of messages are only constructed in outside Javascript
so we don't have to worry about those (player connects/disconnects, host loss)
-}
encodeMsg : PeerMsg -> Value
encodeMsg msg = case msg of
    LobbyInfoMessage {players, destinations} ->
        Encode.object
            [
                ("lobby", Encode.object
                    [ ("players", Encode.dict identity encodePlayer players)
                    , ("destinations", Encode.list encodePagePreview destinations)
                    ]
                )
            ]

    GameStateMessage {players, destinations} ->
        Encode.object
            [
                ("gamestate", Encode.object
                    [ ("players", Encode.dict identity encodePlayerWithGameState players)
                    , ("destinations", Encode.list encodePagePreview destinations)
                    ]
                )
            ]
        
    PlayerReachedTitle uuid title time -> Encode.object
        [ ("titlereach"
        , Encode.object
            [ ("uuid", Encode.string uuid)
            , ("title", Encode.string title)
            , ("time", Encode.int time)
            ]
        )
        ]

    _ -> Encode.null

{-| decode a JSON value sent to us from a peer
-}
decodeMsg : Value -> Result Decode.Error PeerMsg
decodeMsg val =
        let
            lobbyInfoDecoder = field "lobby" <|
                Decode.map2 (\players destinations -> LobbyInfoMessage {players=players, destinations=destinations})
                    (field "players" (Decode.dict decodePlayer))
                    (field "destinations" (Decode.list decodePagePreview))
            
            gameInfoDecoder = field "gamestate" <|
                Decode.map2 (\players destinations -> GameStateMessage {players=players, destinations=destinations})
                    (field "players" (Decode.dict decodePlayerWithGameState))
                    (field "destinations" (Decode.list decodePagePreview))

            titleReachDecoder = field "titlereach" <|
                Decode.map3 (\uuid title time -> PlayerReachedTitle uuid title time)
                    (field "uuid" Decode.string)
                    (field "title" Decode.string)
                    (field "time" Decode.int)
            
            playerConnectDecoder = field "playerconnected" <|
                Decode.map2 (\uuid name -> PeerConnected uuid name)
                    (field "uuid" Decode.string)
                    (field "name" Decode.string)
            
            playerDisconnectDecoder = field "playerlost"
                <| Decode.map PeerDisconnected (field "uuid" Decode.string)

            hostLostDecoder = Decode.string
                |> Decode.andThen
                    (\str -> if str == "hostlost" then Decode.succeed HostLost else Decode.fail "")
            
            errorDecoder = field "error" Decode.value

        in case Decode.decodeValue errorDecoder val of
            Ok err -> Ok <| Error (Encode.encode 1 err)
            Err _ -> 
                Decode.decodeValue
                    ( Decode.oneOf
                        [ lobbyInfoDecoder
                        , gameInfoDecoder
                        , titleReachDecoder
                        , playerConnectDecoder
                        , playerDisconnectDecoder
                        , hostLostDecoder
                        ]
                    )
                    val


port sendData : Value -> Cmd msg


port receiveDataPeerJS : (Value -> msg) -> Sub msg


{-| subscription for any data coming in from PeerJS
-}
receiveData : Sub Msg
receiveData = 
    let
        handleValue val = case decodeMsg val of
            Ok msg -> msg
            Err decodeErr -> Error (Decode.errorToString decodeErr)

    in receiveDataPeerJS (handleValue >> PeerMsg)

