module Parse exposing (viewArticle)

import Html.Parser exposing (Node(..))
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Regex
import Types exposing (..)
import Helpers exposing (..)
import Maybe.Extra

{-| convert parsed html of wiki article for our purposes

strip out unnecessary bits
disable external links
-}
viewArticle : (Title -> msg) -> Html.Parser.Node -> Html msg
viewArticle linkClickMsg n =
  let
      -- the html fetched from the wiki api has local urls in their links
      -- so we need to add https 
      imgurlstart = Maybe.withDefault Regex.never <|
          Regex.fromString "//upload.wikimedia.org"
      -- TODO look at fetching all the sections from the wiki api and styling it ourselves with a table of contents
      fixurls = Regex.replace imgurlstart (\_ -> "https://upload.wikimedia.org")

      handleChildren = List.map (viewArticle linkClickMsg)

      attr2htmlattr (prop, val) = case prop of
          "src" -> attribute "src" (fixurls val)
          "srcset" -> attribute "srcset" (fixurls val)
          "poster" -> attribute "poster" (fixurls val)
          _ -> attribute prop val
      
      -- make the straightforward conversion to Html object
      convert parsedNode = case parsedNode of
          Element tag attrs children -> node tag (List.map attr2htmlattr attrs) (handleChildren children)
          Text s -> text s
          Comment _ -> text ""
  in
  case n of
      -- we want to reroute the wikilinks to onClick events
      Element "a" (( "href", link ) :: attrs) children -> -- TODO maybe we shouldn't assume href is the first attribute
          let
            title = Just link
                    |> Maybe.Extra.filter (String.startsWith "/wiki/")
                    |> Maybe.andThen (String.dropLeft 6 >> decodeTitle)
                    |> Maybe.Extra.filter isArticleNamespace

          in
          if String.startsWith "#" link then
              -- catch other inpage reference tags such as section navigators
              Html.a (href link :: List.map attr2htmlattr attrs) (handleChildren children)
          else case title of
            Just articleTitle -> 
              Html.a
                [ Html.Attributes.style "color" "blue"
                , Html.Attributes.style "text-decoration" "underline"
                , href "#"
                , onClick (linkClickMsg articleTitle)
                ]
                (handleChildren children)
            Nothing -> 
              Html.a (List.map attr2htmlattr attrs) (handleChildren children)

      Element "a" _ children ->
          -- try and catch external links and mask them
          span [] (handleChildren children)

      -- hide edit sections
      Element "span" (( "class", "mw-editsection" ) :: _) _ ->
          text ""

      --ignore coordinates info for places
      Element "span" (( "id", "coordinates" ) :: _) _ ->
          text ""

      Element "form" _ _ ->
          text ""

      -- hide boring headers
    --   Element "span" (( "class", clazz ) :: ( "id", headline ) :: _) _ as header ->
    --       if String.contains "mw-headline" clazz && List.member headline [ "Citations", "Notes", "References" ] then
    --           text ""

    --       else
    --           convert header

      -- hide references section
    --   Element "div" (( "class", clazz ) :: _) _ as el ->
    --       if String.startsWith "reflist" clazz then
    --           text ""

    --       else
    --           convert el

      -- hide superscript tags, they're citation links
    --   Element "sup" _ _ ->
    --       text ""

      el ->
          convert el