module PageFetch exposing (PageContent, getPage, getPreview)

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
import Task exposing (Task)
import Types exposing (..)

{-
   This module provides functionality for fetching the content of wikipages
-}

type alias PageHtml =
    { title : Title, html : String, sections : List Section }

type alias PageContent = Page
type alias PageSummary = PagePreview

-- TODO figure out how to retrieve the table of contents back

resolver : Decoder a -> Response String -> Result String a
resolver decoder response = case response of
    BadUrl_ str -> Err str
    Timeout_ -> Err "timeout"
    NetworkError_ -> Err "network error"
    BadStatus_ meta _ -> Err <|
        String.concat [ String.fromInt meta.statusCode, " ", meta.statusText, " : ", meta.url ]
    GoodStatus_ _ body ->
        Decode.decodeString decoder body
            |> Result.mapError (always <| "could not parse body of http response: \n" ++ body)


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

requestPage : Title -> Task String PageHtml
requestPage title =
    Http.task
        { method = "GET"
        , headers = []
        , body = Http.emptyBody
        , url = "https://en.wikipedia.org/w/api.php?action=parse&prop=text|sections&redirects=true&format=json&origin=*&page=" ++ encodeTitle title
        , timeout = Just 5000
        , resolver = Http.stringResolver <| resolver pageDecoder
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
-}
getPreview : Title -> Task String PageSummary
getPreview title = Http.task
        { method = "GET"
        , headers = []
        , body = Http.emptyBody
        , url = "https://en.wikipedia.org/api/rest_v1/page/summary/" ++ encodeTitle title ++ "?redirect=true&origin=*"
        , timeout = Just 5000
        , resolver = Http.stringResolver <| resolver previewDecoder
        }

{-|retrieve the and parse the HTML of the given wikipedia article -}
getPage : Title -> Task String PageContent
getPage title =
    requestPage title
        |> Task.andThen
            (\r -> case content r of
                Ok pageContent -> Task.succeed pageContent
                Err parseError -> Task.fail parseError
            )


{-| convert the api parse result to a parsed Node
-}
content : PageHtml -> Result String PageContent
content {title, html, sections} =
    case Html.Parser.run Html.Parser.allCharRefs html of
        Ok (node :: _) -> Ok <|
            { title = title
            , content = node
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