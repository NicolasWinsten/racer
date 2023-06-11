module Parse exposing (viewNode)

import Html.Parser exposing (Node(..))
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Regex
import Model exposing (..)
import Helpers exposing (..)

{-| convert parsed html of wiki article for our purposes

strip out unnecessary bits
disable external links
-}
viewNode : Html.Parser.Node -> Html Msg
viewNode n =
  let
      -- the html fetched from the wiki api has local urls in their links
      -- so we need to add https 
      imgurlstart = Maybe.withDefault Regex.never <|
          Regex.fromString "//upload.wikimedia.org"
      -- TODO look at fetching all the sections from the wiki api and styling it ourselves with a table of contents
      fixurls = Regex.replace imgurlstart (\_ -> "https://upload.wikimedia.org")

      attr2htmlattr (prop, val) = case prop of
          "src" -> attribute "src" (fixurls val)
          "srcset" -> attribute "srcset" (fixurls val)
          _ -> attribute prop val
      
      -- make the straightforward conversion to Html object
      convert parsedNode = case parsedNode of
          Element tag attrs children -> node tag (List.map attr2htmlattr attrs) (List.map viewNode children)
          Text s -> text s
          Comment _ -> text ""
  in
  case n of
      -- we want to reroute the wikilinks to onClick events
      Element "a" (( "href", link ) :: attrs) children -> -- TODO maybe we shouldn't assume href is the first attribute
          let
            -- TODO use regex insteead
              isUnwantedNamespace =
                  List.any (\ns -> String.startsWith ("/wiki/" ++ ns ++ ":") link) unwantedNamespaces
                
              clickLink = String.dropLeft 6 >> decodeTitle >> Maybe.map ClickedLink >> Maybe.withDefault NoOp
          in
          if isUnwantedNamespace then
              -- do not allow File, Category, Wikipedia links to be clicked
              Html.a (List.map attr2htmlattr attrs) (List.map viewNode children)

          else if String.startsWith "/wiki/" link then
              Html.a [ class "wikilink", href "#", onClick (clickLink link) ] (List.map viewNode children)

          else if String.startsWith "#" link then
              -- catch other inpage reference tags such as section navigators
              Html.a (href link :: List.map attr2htmlattr attrs) (List.map viewNode children)

          else
              Html.a (List.map attr2htmlattr attrs) (List.map viewNode children)

      Element "a" _ children ->
          -- try and catch external links and mask them
          span [] (List.map viewNode children)

      -- hide edit sections
      Element "span" (( "class", "mw-editsection" ) :: _) _ ->
          text ""

      -- underline the section links in the contents navigator
      Element "span" (( "class", "toctext" ) :: attrs) children ->
          span (style "text-decoration" "underline" :: List.map attr2htmlattr attrs) (List.map viewNode children)

      --ignore coordinates info for places
      Element "span" (( "id", "coordinates" ) :: _) _ ->
          text ""

      Element "form" _ _ ->
          text ""

      -- hide boring headers
      Element "span" (( "class", clazz ) :: ( "id", headline ) :: _) _ as header ->
          if String.contains "mw-headline" clazz && List.member headline [ "Citations", "Notes", "References" ] then
              text ""

          else
              convert header

      -- hide references section
      Element "div" (( "class", clazz ) :: _) _ as el ->
          if String.startsWith "reflist" clazz then
              text ""

          else
              convert el

      -- hide superscript tags, they're citation links
      Element "sup" _ _ ->
          text ""

      el ->
          convert el