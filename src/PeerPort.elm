port module PeerPort exposing (..)

import Json.Decode as Decode exposing (Decoder, Value, decodeValue, field)
import Json.Encode as Encode


port sendData : Value -> Cmd msg


port receiveData : (Value -> msg) -> Sub msg


receiveDataFromJS : Sub PeersMsg
receiveDataFromJS =
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
    { uuid : Int, username : String, isHost : Bool }


type alias Info =
    -- game info that is sent to peers when they connect to host
    { seed : String, numDestinations : Int, peers : List Peer, started : Bool }


type PeersMsg
    = SeedInfo Int String
    | GameStart String
    | TitleReach Int String
    | GameFinish Int (List String) Int -- uuid path time
    | PeerConnect String Int
    | PeerDisconnect Int
    | HostLost String
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
    Decode.map3 Peer uuidDecoder usernameDecoder (field "isHost" Decode.bool)


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


decoders =
    [ seedInfoDecoder, gameStartDecoder, titleReachDecoder, gameFinishDecoder, peerConnectDecoder, peerDisconnectDecoder, peerIdGenDecoder, gameInfoDecoder, errorDecoder, hostLostDecoder ]


dataDecoder : Decoder PeersMsg
dataDecoder =
    Decode.oneOf decoders



{- create this users Peer. the Peers id will be sent back in receivesId sub -}


port makePeer : String -> Cmd msg


type alias Init =
    { isHost : Bool, connectId : String, username : String, uuid : Int }


port initPeer : Init -> Cmd msg



{- send a seed string to peers to update their title list -}


createMsg header =
    \value -> Encode.object [ ( header, value ) ]


seedInfo num seed =
    createMsg "seedInfo" <|
        Encode.object [ ( "numTitles", Encode.int num ), ( "seed", Encode.string seed ) ]


gameStarted msg =
    createMsg "start" <|
        Encode.object [ ( "msg", Encode.string msg ) ]


titleReach uuid title =
    createMsg "titleReach" <|
        Encode.object [ ( "uuid", Encode.int uuid ), ( "title", Encode.string title ) ]


gameFinish uuid path time =
    createMsg "finish" <|
        Encode.object [ ( "uuid", Encode.int uuid ), ( "path", Encode.list Encode.string path ), ( "time", Encode.int time ) ]


peerConnect username uuid =
    createMsg "peerConnect" <|
        Encode.object [ ( "uuid", Encode.int uuid ), ( "username", Encode.string username ) ]



-- TODO create Decoder and add to PeerMsg type


peerDisconnect uuid =
    createMsg "peerDisconnect" <| Encode.object [ ( "uuid", Encode.int uuid ) ]


gameInfo : Int -> Info -> Value
gameInfo uuid info =
    let
        encodePeer peer =
            Encode.object [ ( "uuid", Encode.int peer.uuid ), ( "username", Encode.string peer.username ), ( "isHost", Encode.bool peer.isHost ) ]

        encodeInfo =
            Encode.object [ ( "seed", Encode.string info.seed ), ( "numDestinations", Encode.int info.numDestinations ), ( "peers", Encode.list encodePeer info.peers ), ( "started", Encode.bool info.started ) ]
    in
    createMsg "gameInfo" <|
        Encode.object [ ( "uuid", Encode.int uuid ), ( "info", encodeInfo ) ]
