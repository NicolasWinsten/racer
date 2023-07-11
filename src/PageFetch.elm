module PageFetch exposing (PageHtml, PageContent, WikiText, getPage, getPreview, getHtml, getWikiText)

import Helpers exposing (..)
import Html.Parser exposing (Node(..))
import Parser exposing (DeadEnd)
import Http exposing (Response(..))
import Json.Decode exposing (Decoder, field, string)
import Json.Decode as Decode
import List
import Maybe
import Parser
import Result
import Types exposing (..)
import Parse
import Url.Builder as UrlB
import Url

{-
   This module provides functionality for fetching the content of wikipedia articles by their titles
-}


type alias PageHtml =
    { title : Title, html : String, sections : List Section }

type alias PageContent msg = Page msg
type alias PageSummary = PagePreview

pageDecoder : Decoder PageHtml
pageDecoder =
    field "parse"
        <| Decode.map3 PageHtml
            (field "title" string)
            (field "text" (field "*" string))
            (field "sections" (Decode.list tocSectionDecoder))

tocSectionDecoder : Decoder Section
tocSectionDecoder = Decode.map2 (\level anchor -> {level=level, anchor=anchor})
    (field "toclevel" Decode.int)
    (field "linkAnchor" Decode.string)


wikipedia = UrlB.crossOrigin "https://en.wikipedia.org"

getHtml : Title -> Cmd (Result String PageHtml)
getHtml title =
    Http.get
        { url = wikipedia ["w", "api.php"]
            [ UrlB.string "action" "parse"
            , UrlB.string "prop" "text|sections"
            , UrlB.string "redirects" "true"
            , UrlB.string "format" "json"
            , UrlB.string "page" (encodeTitle title)
            , UrlB.string "origin" "*"
            ]
            --"https://en.wikipedia.org/w/api.php?action=parse&prop=text|sections&redirects=true&format=json&origin=*&page=" ++ encodeTitle title
        , expect = Http.expectJson (Result.mapError errorToString) pageDecoder
        }

type alias WikiText = {title : Title, wikitext : String}

wikiTextResponseDecoder : Decoder WikiText
wikiTextResponseDecoder = Decode.at ["query", "pages", "0"]
    <| ( Decode.map2 WikiText
        (field "title" string)
        (Decode.at ["revisions", "0", "slots", "main", "content" ] Decode.string)
    )


getWikiText : Title -> Cmd (Result String WikiText)
getWikiText title =
    Http.get
        { --method = "GET"
        -- , headers = []
        -- , body = Http.emptyBody
        url = wikipedia ["w", "api.php"]
            [ UrlB.string "action" "query"
            , UrlB.string "prop" "revisions|links"
            , UrlB.int "redirects" 1
            , UrlB.string "format" "json"
            , UrlB.int "formatversion" 2
            , UrlB.string "rvprop" "content"
            , UrlB.string "rvslots" "main"
            , UrlB.string "titles" (encodeTitle title)
            , UrlB.int "plnamespace" 0
            , UrlB.string "pllimit" "max"
            , UrlB.string "origin" "*"
            ]
        -- , timeout = Nothing
        , expect = Http.expectJson (Result.mapError errorToString) wikiTextResponseDecoder
        }

previewDecoder : Decoder PageSummary
previewDecoder =
    let thumbnailDecoder = Decode.map3
            (\source width height -> {src=source, width=width, height=height})
            (field "source" string)
            (field "width" Decode.float)    
            (field "height" Decode.float)
        
        nonNullString str = case String.trim str of
            "" -> Nothing
            chars -> Just chars
    in
    Decode.map4
        (\title thumbnail description shortdesc -> {title=title, thumbnail=thumbnail, description=description, shortdescription=shortdesc})
        (field "title" string)
        (Decode.maybe (field "thumbnail" thumbnailDecoder))
        (Decode.map (Maybe.andThen nonNullString) (Decode.maybe (field "extract" string)))
        (Decode.map (Maybe.andThen nonNullString) (Decode.maybe (field "description" string)))

{-| request the redirected title, thumbnail, and description of a wikipedia article

TODO also request the media list from the rest api to get backup images
-}
getPreview : Title -> Cmd (Result String PageSummary)
getPreview title = Http.get
        { url = wikipedia
            ["api", "rest_v1", "page", "summary", Url.percentEncode <| encodeTitle title]
            [UrlB.string "redirect" "true"]
        , expect = Http.expectJson (Result.mapError errorToString) previewDecoder
        }

{-|retrieve the and parse the HTML of the given wikipedia article -}
getPage : (Title -> msg) -> Title -> Cmd (Result String (PageContent msg))
getPage onLinkClick title =
    getHtml title
        |> Cmd.map (Result.andThen (content onLinkClick))


{-| convert the api parse result to a parsed Node

-- TODO this should be moved to parse.elm
-}
content : (Title -> msg) -> PageHtml -> Result String (PageContent msg)
content onLinkClick {title, html, sections} =
    case Html.Parser.run Html.Parser.allCharRefs html of
        Ok (node :: _) -> Ok <|
            { title = title
            , content = Parse.viewArticle onLinkClick node
            , sections = sections
            }
        
        Ok [] -> Err "I parsed no html. This shouldn't happen"

        Err deadEnds -> Err ("I ran into an issue parsing the page for " ++ title ++ " : " ++ deadEndsToString deadEnds)



{-| elm/parser's implementation of `deadEndsToString` is still "TODO deadEndsToString" in 2023
https://github.com/elm/parser/blob/02839df10e462d8423c91917271f4b6f8d2f284d/src/Parser.elm#L171

very funny, so we roll our own
-}
deadEndsToString : List DeadEnd -> String
deadEndsToString deadEnds =
    let
        deadEndToString : DeadEnd -> String
        deadEndToString deadEnd =
            let
                position : String
                position =
                    "row:" ++ String.fromInt deadEnd.row ++ " col:" ++ String.fromInt deadEnd.col ++ "\n"
            in
            case deadEnd.problem of
                Parser.Expecting str ->
                    "Expecting " ++ str ++ "at " ++ position

                Parser.ExpectingInt ->
                    "ExpectingInt at " ++ position

                Parser.ExpectingHex ->
                    "ExpectingHex at " ++ position

                Parser.ExpectingOctal ->
                    "ExpectingOctal at " ++ position

                Parser.ExpectingBinary ->
                    "ExpectingBinary at " ++ position

                Parser.ExpectingFloat ->
                    "ExpectingFloat at " ++ position

                Parser.ExpectingNumber ->
                    "ExpectingNumber at " ++ position

                Parser.ExpectingVariable ->
                    "ExpectingVariable at " ++ position

                Parser.ExpectingSymbol str ->
                    "ExpectingSymbol " ++ str ++ " at " ++ position

                Parser.ExpectingKeyword str ->
                    "ExpectingKeyword " ++ str ++ "at " ++ position

                Parser.ExpectingEnd ->
                    "ExpectingEnd at " ++ position

                Parser.UnexpectedChar ->
                    "UnexpectedChar at " ++ position

                Parser.Problem str ->
                    "ProblemString " ++ str ++ " at " ++ position

                Parser.BadRepeat ->
                    "BadRepeat at " ++ position
    in
    List.foldl (++) "" (List.map deadEndToString deadEnds)




errorToString : Http.Error -> String
errorToString err =
    case err of
        Http.Timeout ->
            "Timeout exceeded"

        Http.NetworkError ->
            "Network error"

        Http.BadStatus code ->
            "Status " ++ String.fromInt code

        Http.BadBody resp ->
            "Unexpected response from api: " ++ resp

        Http.BadUrl url ->
            "Malformed url: " ++ url