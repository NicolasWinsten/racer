module PageFetch exposing (WikiText, getPreview, getWikiText, fetchPage, Msg, PageFetcher, onMsg)

import Helpers exposing (..)
import Html.Parser exposing (Node(..))
import Http exposing (Response(..))
import Json.Decode exposing (Decoder, field, string)
import Json.Decode as Decode
import Maybe
import Result
import Types exposing (..)
import Url.Builder as UrlB
import Url
import Either exposing (Either(..))

import Html.Parser exposing (Node(..))
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Regex
import Types exposing (..)
import Helpers exposing (..)
import Maybe.Extra
import List.Extra
import Basics.Extra
import Parser exposing (DeadEnd)

{-
   This module provides functionality for fetching the content of wikipedia articles by their titles
-}
type alias Resolution = {title : Title, sections : List Section}

resolutionDecoder : Decoder Resolution
resolutionDecoder =
    field "parse"
        <| Decode.map2 Resolution
            (field "title" string)
            -- (field "text" (field "*" string))
            (field "sections" (Decode.list tocSectionDecoder))

tocSectionDecoder : Decoder Section
tocSectionDecoder = Decode.map2 (\level anchor -> {level=level, anchor=anchor})
    (field "toclevel" Decode.int)
    (field "linkAnchor" Decode.string)

absoluteEnglishWikiHost = "https://en.wikipedia.org"

wikipedia = UrlB.crossOrigin absoluteEnglishWikiHost

{-| resolve a title and retrieve it's toc sections
-}
resolveTitle : Title -> Cmd (Result String Resolution)
resolveTitle title =
    Http.get
        { url = wikipedia ["w", "api.php"]
            [ UrlB.string "action" "parse"
            , UrlB.string "prop" "sections"
            , UrlB.string "redirects" "true"
            , UrlB.string "format" "json"
            , UrlB.string "page" (encodeTitle title)
            , UrlB.string "origin" "*"
            ]
            --"https://en.wikipedia.org/w/api.php?action=parse&prop=text|sections&redirects=true&format=json&origin=*&page=" ++ encodeTitle title
        , expect = Http.expectJson (Result.mapError errorToString) resolutionDecoder
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
        { url = wikipedia ["w", "api.php"]
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
        , expect = Http.expectJson (Result.mapError errorToString) wikiTextResponseDecoder
        }

previewDecoder : Decoder PagePreview
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
        PagePreview
        (field "title" string)
        (Decode.maybe (field "thumbnail" thumbnailDecoder))
        (Decode.map (Maybe.andThen nonNullString) (Decode.maybe (field "extract" string)))
        (Decode.map (Maybe.andThen nonNullString) (Decode.maybe (field "description" string)))

{-| request the redirected title, thumbnail, and description of a wikipedia article

TODO also request the media list from the rest api to get backup images
-}
getPreview : Title -> Cmd (Result String PagePreview)
getPreview title = Http.get
        { url = wikipedia
            ["api", "rest_v1", "page", "summary", Url.percentEncode <| encodeTitle title]
            [UrlB.string "redirect" "true"]
        , expect = Http.expectJson (Result.mapError errorToString) previewDecoder
        }




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


fetchHtml : Title -> Cmd (Result String String)
fetchHtml title = Http.get
    { url = wikipedia ["w", "rest.php", "v1", "page", Url.percentEncode (encodeTitle title), "html"] []
        -- [ UrlB.string "origin" "*" ]
    , expect = Http.expectString (Result.mapError errorToString)
    }


{-| for each wikipedia title,
    we need to resolve it, collect the section names, and get its html document

    The best way I could find to do this is in two api requests:

    once to en.wikipedia.org/w/api.php to resolve the title and gather its section names

    and another request to en.wikipedia.org/w/rest.php for the styled html
    
    (the first api did not provide a generated stylesheet with the html)
-}

type PageFetcher
    = Fetching
    | HasResolution Resolution
    | HasDocument String

type Msg
    = GotResolution (Result String Resolution)
    | GotDocument (Result String String)


fetchPage : Title -> (PageFetcher, Cmd Msg)
fetchPage title =
    ( Fetching
    , Cmd.batch
        [ Cmd.map GotDocument (fetchHtml title)
        , Cmd.map GotResolution (resolveTitle title)
        ]
    )

type alias PageHtml = {title : Title, sections : List Section, html : String}

onMsg : Msg -> PageFetcher -> (Title -> msg) -> Either PageFetcher (Result String (Page msg))
onMsg msg fetcher linkClickMsg = case msg of
    GotDocument (Ok html) -> case fetcher of
        Fetching ->
            Left <| HasDocument html
        HasResolution {title, sections} ->
            Right <| parseDocument linkClickMsg (PageHtml title sections html)
        
        HasDocument _ -> Left fetcher
    
    GotDocument (Err err) -> Right (Err err)

    GotResolution (Ok resolution) -> case fetcher of
        Fetching -> Left <| HasResolution resolution

        HasDocument html ->
            Right <| parseDocument linkClickMsg (PageHtml resolution.title resolution.sections html)
        
        HasResolution _ -> Left fetcher
    
    GotResolution (Err err) -> Right (Err err)


{- the HTML document for an article is fetched.
Here we convert the HTML string to Elm Html
-}
type alias AttrList = List (String, String) 

type alias Attr = (String, String)

isTag : String -> Node -> Bool
isTag tag node = case node of
    Element t _ _ -> t == tag
    _ -> False

getAttrs : Node -> AttrList
getAttrs node = case node of
    Element _ attrs _ -> attrs
    _ -> []

getChildren : Node -> List Node
getChildren node = case node of
    Element _ _ children -> children
    _ -> []

getTag : String -> Node -> Maybe Node
getTag tag node =
    if isTag tag node then Just node
    else List.Extra.findMap (getTag tag) (getChildren node)

getAttr : String -> Node -> Maybe String
getAttr attr = getAttrs
    >> (List.Extra.find (Tuple.first >> (==) attr))
    >> Maybe.map Tuple.second

updateAttr : String -> (String -> Maybe String) -> Node -> Node
updateAttr attr update node =
    let traverse attrlist = case attrlist of
            ((tag, value) :: attrs) ->
                if tag == attr then case update value of
                    Just newValue -> (tag, newValue) :: attrs
                    Nothing -> attrs
                else (tag, value) :: traverse attrs
            [] -> []
    in case node of
        Element tag attrlist children -> Element tag (traverse attrlist) children
        n -> n

convertAttr : Attr -> Html.Attribute msg
convertAttr = Basics.Extra.uncurry Html.Attributes.attribute

relativeWikimediaHost = "//upload.wikimedia.org" -- TODO add word boundary at start?

mkRegex = Maybe.withDefault Regex.never
    << Regex.fromString
relativeWikimediaHostPattern = mkRegex relativeWikimediaHost


-- replace the relative urls links with absolute urls including https protocol 
mkCanonical : String -> String
mkCanonical = Regex.replace relativeWikimediaHostPattern (.match >> (++) "https:")
    
fixUrlAttr : Attr -> Attr
fixUrlAttr (prop, val) =
    if List.member prop ["src", "srcset", "poster"]
    then (prop, mkCanonical val) else (prop, val)

underline = Html.Attributes.style "text-decoration" "underline"

{-| given a parsed anchor tag,

hook it up with an onClick Msg if it is a wikilink
or mask the external hyperlink
-}
handleAnchor : (Title -> msg) -> Node -> Html msg
handleAnchor onLinkClick anchor =
    let isInternalLink = String.startsWith "#"
        maskHyperlink = updateAttr "href"
            (\target ->
                if isInternalLink target
                then Just target else Nothing
            )

        attrs = maskHyperlink anchor
            |> getAttrs >> List.map (fixUrlAttr >> convertAttr)

        mk title = case Maybe.Extra.filter isArticleNamespace title of
            Just articleTitle -> Html.a
                (onClick (onLinkClick articleTitle) :: underline :: attrs)
                (List.map (parseNode onLinkClick) (getChildren anchor))
            Nothing -> Html.span attrs
                (List.map (parseNode onLinkClick) (getChildren anchor))
            

        isWikiLink = getAttr "rel" anchor == Just "mw:WikiLink"
    in
    if isWikiLink then mk (getAttr "title" anchor)
    else mk Nothing

parseNode : (Title -> msg) -> Html.Parser.Node -> Html msg
parseNode linkClickMsg n =
    let
      -- make the straightforward conversion to Html object
        default parsedNode = case parsedNode of
            Element tag attrs children -> Html.node
                tag
                (List.map (fixUrlAttr >> convertAttr) attrs)
                (List.map (parseNode linkClickMsg) children)
            Text s -> Html.text s
            Comment _ -> Html.text ""
    in
    if isTag "a" n then handleAnchor linkClickMsg n
    else default n


isStyleSheet : Node -> Bool
isStyleSheet node =
    isTag "link" node && (getAttr "rel" node == Just "stylesheet")


{-| convert the html from the api into Html

-}
parseDocument : (Title -> msg) -> PageHtml -> Result String (Page msg)
parseDocument onLinkClick {title, sections, html} =
    case Html.Parser.runDocument Html.Parser.allCharRefs html of
        Ok {root} -> case (getTag "head" root, getTag "body" root) of
            (Just head, Just body) ->
                let stylesheet = List.Extra.find isStyleSheet (getChildren head)
                        |> Maybe.map (updateAttr "href" (Just << (++) "https://en.wikipedia.org"))
                    -- we have to grab the generated stylesheet link from the head

                    children = case stylesheet of
                        Just ss -> ss :: getChildren body
                        Nothing -> getChildren body
                in Ok <| Page title sections
                    <| parseNode onLinkClick
                    <| Element "div" (getAttrs body) children
            
            _ -> Err "There was an issue parsing the article"
        
        Err deadEnds -> Err ("I ran into an issue parsing the page for " ++ deadEndsToString deadEnds)


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