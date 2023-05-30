{-
This module contains the functionality for communicating with
other players through PeerJS [https://peerjs.com/]
-}

port module PeerPort exposing
    ( PeersMsg(..)
    , initPeer
    , makePeer
    , signalGameFinish
    , sendGameInfo
    , signalGameStarted
    , signalNewGame
    , signalPeerConnected
    , signalPeerDisconnected
    , receivePeerJSData
    , sendSeedInfo
    , signalTitleReach
    )

import Json.Decode as Decode exposing (Decoder, Value, decodeValue, field)
import Json.Encode as Encode



{-
   The below code deals with sending/receiving messages from PeerJS and Javascript
-}


port sendData : Value -> Cmd msg


port receiveData : (Value -> msg) -> Sub msg


{-| subscription for any data coming in from PeerJS
-}
receivePeerJSData : Sub PeersMsg
receivePeerJSData =
    let
        makeDataValue res =
            case res of
                Ok data ->
                    data

                Err err ->
                    Malformed <| Decode.errorToString err

        jsValueTranslator =
            decodeValue dataDecoder >> makeDataValue
    in
    receiveData jsValueTranslator


type alias Peer =
    -- info about a game's player that is sent to new connecting players
    { uuid : Int, username : String, isHost : Bool, lastDest : String, finished : Bool }


type alias Info =
    -- game info that is sent to peers when they connect to host
    { seed : String, numDestinations : Int, peers : List Peer, started : Bool }


type PeersMsg
    = SeedInfo Int String -- num destinations, seed string
    | GameStart String
    | TitleReach Int String -- uuid, title
    --TODO | BacktrackedToPage Int String (signal peers when player has moved backwards to a previous page)
    | GameFinish Int (List String) Int -- uuid path time
    | PeerConnect String Int -- username, uuid
    | PeerDisconnect Int -- uuid
    | HostLost String
    | HostWantsNewGame String
    | IdGenerated String
    | Error String
    | GameInfo Int Info -- directed message to peer with given uuid
    | Malformed String


usernameDecoder =
    field "username" Decode.string


uuidDecoder =
    field "uuid" Decode.int


peerDecoder : Decoder Peer
peerDecoder =
    Decode.map5 Peer uuidDecoder usernameDecoder (field "isHost" Decode.bool) (field "lastDest" Decode.string) (field "finished" Decode.bool)


seedInfoDecoder : Decoder PeersMsg
seedInfoDecoder =
    field "seedInfo" <| Decode.map2 SeedInfo (field "numTitles" Decode.int) (field "seed" Decode.string)


gameStartDecoder : Decoder PeersMsg
gameStartDecoder =
    field "start" <| Decode.map GameStart (field "msg" Decode.string)


titleReachDecoder : Decoder PeersMsg
titleReachDecoder =
    field "titleReach" <| Decode.map2 TitleReach uuidDecoder (field "title" Decode.string)


gameFinishDecoder : Decoder PeersMsg
gameFinishDecoder =
    field "finish" <| Decode.map3 GameFinish uuidDecoder (field "path" <| Decode.list Decode.string) (field "time" Decode.int)


peerConnectDecoder : Decoder PeersMsg
peerConnectDecoder =
    field "peerConnect" <| Decode.map2 PeerConnect usernameDecoder uuidDecoder


peerIdGenDecoder : Decoder PeersMsg
peerIdGenDecoder =
    Decode.map IdGenerated (field "id" Decode.string)


gameInfoDecoder : Decoder PeersMsg
gameInfoDecoder =
    field "gameInfo" <|
        Decode.map2 GameInfo
            uuidDecoder
            (field "info" <|
                Decode.map4 Info (field "seed" Decode.string) (field "numDestinations" Decode.int) (field "peers" <| Decode.list peerDecoder) (field "started" Decode.bool)
            )


peerDisconnectDecoder : Decoder PeersMsg
peerDisconnectDecoder =
    field "peerDisconnect" <| Decode.map PeerDisconnect uuidDecoder


hostLostDecoder : Decoder PeersMsg
hostLostDecoder =
    Decode.map HostLost (field "hostLost" Decode.string)


errorDecoder : Decoder PeersMsg
errorDecoder =
    Decode.map Error <| field "error" Decode.string


hostWantsNewGame : Decoder PeersMsg
hostWantsNewGame =
    Decode.map HostWantsNewGame <| field "newGame" Decode.string

dataDecoder : Decoder PeersMsg
dataDecoder =
    Decode.oneOf [ seedInfoDecoder, gameStartDecoder, titleReachDecoder, gameFinishDecoder, peerConnectDecoder, peerDisconnectDecoder, peerIdGenDecoder, gameInfoDecoder, errorDecoder, hostLostDecoder, hostWantsNewGame ]


{-| create this users Peer. the Peers id will be sent back in receivesId sub
-}
port makePeer : String -> Cmd msg

-- TODO separate this functionality into two functions: joinGame and hostGame
type alias Init =
    -- info to initialize the peer socket with
    { isHost : Bool, connectId : String, username : String, uuid : Int }


port initPeer : Init -> Cmd msg

sendSeedInfo num seed = sendData <|
    Encode.object [
        ("seedInfo"
        , Encode.object [ ( "numTitles", Encode.int num ), ( "seed", Encode.string seed ) ]
        )
    ]
        


signalGameStarted msg = sendData <|
    Encode.object [("start", Encode.object [ ( "msg", Encode.string msg ) ])]


signalTitleReach uuid title = sendData <|
    Encode.object [
        ( "titleReach", Encode.object [ ( "uuid", Encode.int uuid ), ( "title", Encode.string title ) ])
    ]
        


signalGameFinish uuid path time = sendData <|
    Encode.object [(
        "finish", Encode.object [ ( "uuid", Encode.int uuid ), ( "path", Encode.list Encode.string path ), ( "time", Encode.int time ) ]
    )]
        


signalPeerConnected username uuid = sendData <|
    Encode.object [("peerConnect", Encode.object [ ( "uuid", Encode.int uuid ), ( "username", Encode.string username ) ])]
        


signalPeerDisconnected uuid = sendData <|
    Encode.object [("peerDisconnect", Encode.object [ ( "uuid", Encode.int uuid ) ])]


sendGameInfo : Int -> Info -> Cmd msg
sendGameInfo uuid info =
    let
        encodePeer : Peer -> Value
        encodePeer peer =
            Encode.object [ ( "uuid", Encode.int peer.uuid ), ( "username", Encode.string peer.username ), ( "isHost", Encode.bool peer.isHost ), ( "finished", Encode.bool peer.finished ), ( "lastDest", Encode.string peer.lastDest ) ]

        encodeInfo =
            Encode.object [ ( "seed", Encode.string info.seed ), ( "numDestinations", Encode.int info.numDestinations ), ( "peers", Encode.list encodePeer info.peers ), ( "started", Encode.bool info.started ) ]
    in
    sendData
    <| Encode.object [("gameInfo", Encode.object [ ( "uuid", Encode.int uuid ), ( "info", encodeInfo ) ])]
        
signalNewGame msg = sendData <|
    Encode.object [ ( "newGame", Encode.string msg ) ]
