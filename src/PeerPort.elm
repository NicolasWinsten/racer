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
    , PeerMsg(..)
    , LobbyMessage
    , GameMessage
    )


import Json.Decode as Decode exposing (Decoder, Value, field)
import Json.Encode as Encode
import Types exposing (..)
import Element exposing (Color, toRgb, rgb)
import Json.Decode as Decode
import List.Nonempty as Nonempty exposing (Nonempty(..))
import Set
import Either exposing (Either(..))
import Either.Decode
import Time

-- TODO move external javascript logic into this module 
-- TODO use generated UUID rather than brokering ID so users can reconnect to the game

type alias LobbyMessage = { players : PlayerList {}, destinations : Maybe DestinationList }

type alias GameMessage =
    { players : PlayerList {gameState : Maybe GameState, connected : Bool}
    , destinations : DestinationList
    }

{-| types of messages sent to other players P2P

-}
type PeerMsg
    -- send lobby info when making changes to the lobby, or to joining players
    = LobbyInfoMessage LobbyMessage
    -- send gamestate info to players to start the game
    | GameStateMessage GameMessage
    | PlayerLegUpdate PeerId (Either IncompleteLeg CompleteLeg) Time.Posix -- uuid, updated leg, time when it was reached
    | PeerConnected PeerId String       -- uuid, username
    | PeerDisconnected PeerId           -- uuid
    | HostLost      -- connection to host lost
    | Error String  -- error with peerJS


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

encodeTime : Time.Posix -> Value
encodeTime = Time.posixToMillis >> Encode.int

decodeTime : Decoder Time.Posix
decodeTime = Decode.map Time.millisToPosix Decode.int


encodePlayer : Player {} -> Value
encodePlayer {name, color} = Encode.object [("name", Encode.string name), ("color", encodeColor color)]

decodePlayer : Decoder (Player {})
decodePlayer = Decode.map2 (\name color -> {name=name, color=color})
    (field "name" Decode.string)
    (field "color" decodeColor)


encodeLeg : Leg -> Value
encodeLeg {start, steps, goal} = Encode.list identity
    [ Encode.string start, Encode.list Encode.string steps, Encode.string goal]

decodeLeg : Decoder Leg
decodeLeg = Decode.map3 (\start steps goal -> {start=start, steps=steps, goal=goal})
    (Decode.index 0 Decode.string)
    (Decode.index 1 <| Decode.list Decode.string)
    (Decode.index 2 Decode.string)

encodeCompleteLeg : CompleteLeg -> Value
encodeCompleteLeg (Complete leg) = Encode.object [("complete", encodeLeg leg)]

decodeCompleteLeg : Decoder CompleteLeg
decodeCompleteLeg = field "complete" decodeLeg |> Decode.map Complete

encodeIncompleteLeg : IncompleteLeg -> Value
encodeIncompleteLeg (Incomplete leg) = Encode.object [("incomplete", encodeLeg leg)]

decodeIncompleteLeg : Decoder IncompleteLeg
decodeIncompleteLeg = field "incomplete" decodeLeg |> Decode.map Incomplete

encodeGameState : GameState -> Value
encodeGameState game =
    let
        encodeTitleSet titles = Encode.set Encode.string titles

        encodeCompletePath {touchedTitles, legs} = Encode.object
            [ ("legs", Encode.list encodeCompleteLeg (Nonempty.toList legs))
            , ("touched", encodeTitleSet touchedTitles)
            ]

        encodeIncompletePath {previousLegs, currentLeg, remainingDestinations, touchedTitles} = Encode.object
            [ ("previous", Encode.list encodeCompleteLeg previousLegs)
            , ("current", encodeIncompleteLeg currentLeg)
            , ("remaining", Encode.list Encode.string remainingDestinations)
            , ("touched", encodeTitleSet touchedTitles)
            ]
    in case game of
        Finished {path, time} -> Encode.object [("path", encodeCompletePath path), ("time", Encode.int time)]
            |> Tuple.pair "finished" >> List.singleton >> Encode.object
        
        Unfinished {path, startTime} -> Encode.object
            [ ("path", encodeIncompletePath path)
            , ("startTime", encodeTime startTime)
            ]
            |> Tuple.pair "unfinished" >> List.singleton >> Encode.object
        
        DNF {path, time} -> Encode.object [("path", encodeIncompletePath path), ("time", Encode.int time)]
            |> Tuple.pair "dnf" >> List.singleton >> Encode.object


decodeGameState : Decoder GameState
decodeGameState =
    let
        decodeNonEmptyList dec = Decode.list dec |> Decode.andThen
            (\legs -> case legs of
                head :: tail -> Decode.succeed <| Nonempty head tail
                [] -> Decode.fail "Empty list"
            )

        decodeTitleSet = Decode.list Decode.string |> Decode.map Set.fromList

        decodeCompletePath = Decode.map2 (\legs touched -> {legs=legs, touchedTitles=touched})
            (field "legs" <| decodeNonEmptyList decodeCompleteLeg)
            (field "touched" decodeTitleSet)
        
        decodeIncompletePath = Decode.map4
            (\prevLegs currLeg remaining touched->
                {previousLegs=prevLegs, currentLeg=currLeg, remainingDestinations=remaining, touchedTitles=touched}
            )
            (field "previous" <| Decode.list decodeCompleteLeg)
            (field "current" decodeIncompleteLeg)
            (field "remaining" <| Decode.list Decode.string)
            (field "touched" decodeTitleSet)

    in Decode.oneOf
        [ field "finished" <| Decode.map2 (\path time -> Finished {path=path, time=time})
            (field "path" decodeCompletePath)
            (field "time" Decode.int)

        , field "unfinished" <| Decode.map2 (\path time -> Unfinished {path=path, startTime=time})
            (field "path" decodeIncompletePath)
            (field "startTime" decodeTime)

        , field "dnf" <| Decode.map2 (\path time -> DNF {path=path, time=time})
            (field "path" decodeIncompletePath)
            (field "time" Decode.int)
        ]

encodePlayerWithGameState : Player {gameState : Maybe GameState, connected : Bool} -> Value
encodePlayerWithGameState {name, color, gameState, connected} =
    Encode.object
        [ ("name", Encode.string name)
        , ("color", encodeColor color)
        , ("gamestate", maybeEncode encodeGameState gameState)
        , ("connected", Encode.bool connected)
        ]

decodePlayerWithGameState : Decoder (Player {gameState : Maybe GameState, connected : Bool})
decodePlayerWithGameState = Decode.map4
        (\name color gameState connected ->
            {name=name, color=color, gameState=gameState, connected=connected}
        )
        (field "name" Decode.string)
        (field "color" decodeColor)
        (field "gamestate" (Decode.maybe decodeGameState))
        (field "connected" Decode.bool)

encodeDestinationList : DestinationList -> Value
encodeDestinationList (DestinationList first second remaining) = Encode.object
    [ ("first", encodePagePreview first)
    , ("second", encodePagePreview second)
    , ("remaining", Encode.list encodePagePreview remaining)
    ]

decodeDestinationList : Decoder DestinationList
decodeDestinationList = Decode.map3 DestinationList
    (field "first" decodePagePreview)
    (field "second" decodePagePreview)
    (field "remaining" (Decode.list decodePagePreview))

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
                    , ("destinations", maybeEncode encodeDestinationList destinations)
                    ]
                )
            ]

    GameStateMessage {players, destinations} ->
        Encode.object
            [
                ("gamestate", Encode.object
                    [ ("players", Encode.dict identity encodePlayerWithGameState players)
                    , ("destinations", encodeDestinationList destinations)
                    ]
                )
            ]
        
    PlayerLegUpdate uuid leg time ->
        let
            encodedLeg = case leg of
                Left incomplete -> encodeIncompleteLeg incomplete
                Right complete -> encodeCompleteLeg complete
        in
        Encode.object
        [ ("legupdate"
        , Encode.object
            [ ("uuid", Encode.string uuid)
            , ("leg", encodedLeg)
            , ("time", encodeTime time)
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
                    (field "destinations" <| Decode.maybe decodeDestinationList)
            
            gameInfoDecoder = field "gamestate" <|
                Decode.map2 (\players destinations -> GameStateMessage {players=players, destinations=destinations})
                    (field "players" (Decode.dict decodePlayerWithGameState))
                    (field "destinations" decodeDestinationList)

            legUpdateDecoder = field "legupdate" <|
                Decode.map3 (\uuid leg time -> PlayerLegUpdate uuid leg time)
                    (field "uuid" Decode.string)
                    (field "leg" <| Either.Decode.either decodeIncompleteLeg decodeCompleteLeg)
                    (field "time" decodeTime)
            
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
                        , legUpdateDecoder
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
receiveData : Sub PeerMsg
receiveData = 
    let
        handleValue val = case decodeMsg val of
            Ok msg -> msg
            Err decodeErr -> Error (Decode.errorToString decodeErr)

    in receiveDataPeerJS handleValue

