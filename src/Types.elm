module Types exposing (..)

import Element exposing (Color)
import Html.Parser
import Random exposing (Seed)
import Dict exposing (Dict)

{-| wikipedia page article title
-}
type alias Title = String


type alias Section = { level : Int, anchor : String}

{-| loaded page that a user can view and click links on
-}
type alias Page = {title : Title, content : Html.Parser.Node, sections : List Section } -- TODO don't store Node, store Html


type alias PagePreview =
    { title : Title
    , thumbnail : Maybe {src : String, width : Float, height : Float}
    , description : Maybe String
    , shortdescription : Maybe String
    }

{-| sequence of steps made trying to reach a goal title
-}
type alias Leg = { previousPages : List Title, currentPage : Title, goal : Title }

{-| a game with multiple goal titles where each path from one destination to the next is a leg
-}
type alias GameState =
    { previousLegs : List Leg          -- completed paths between destination titles
    , currentLeg : Leg                  -- current path being worked on
    , remainingDestinations : List Title
    , finishTime : Maybe Int  -- number of milliseconds taken to finish the game
    }

{-| each player has a unique id
-}
type alias PeerId = String

type alias Player a = { a | name : String, color : Color }

type alias PlayerList a = Dict PeerId (Player a) 

{-| informations pertaininig to a user's game
-}
type alias GameInfo b =
    { uuid : Maybe PeerId
    , seed : Seed
    , destinations : List PagePreview
    , numDestinations : Int
    , amHost : Bool
    , players : PlayerList b
    , self : Player b
    }

{-| extra attributes players have while in lobby
-}
type alias InLobbyAttributes = {}

{-| extra attributes players have while in game
-}
type alias InGameAttributes = {gameState : GameState, connected : Bool}

{-| lobby state
-}
type alias Lobby = GameInfo InLobbyAttributes

{-| game state in progress
-}
type alias InProgressGame = GameInfo InGameAttributes
