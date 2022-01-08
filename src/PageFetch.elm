module PageFetch exposing (PageContent, getPage)

import Helpers exposing (..)
import Html.Parser exposing (Attribute, Node(..))
import Http
import Json.Decode exposing (Decoder, field, map2, string)
import List
import Maybe
import Parser exposing ((|.), (|=), Parser, chompUntil, getChompedString, succeed, symbol)
import Result
import Set



{-
   This module provides functionality for fetching the content of wikipages
-}


type FetchResult
    = FetchResult (Result Http.Error PageHtml)


type alias PageHtml =
    { title : String, html : String }


type alias PageContent =
    { title : String, content : Html.Parser.Node, desc : String, image : Maybe Html.Parser.Node }


pageDecoder : Decoder PageHtml
pageDecoder =
    field "parse" <| map2 PageHtml (field "title" string) (field "text" (field "*" string))


requestPage : String -> Cmd FetchResult
requestPage title =
    let
        fixedTitle =
            String.replace "&" "%26" title
    in
    Http.get
        { url = "https://still-woodland-82497.herokuapp.com/https://en.wikipedia.org/w/api.php?action=parse&prop=text&redirects=true&format=json&page=" ++ fixedTitle
        , expect = Http.expectJson FetchResult pageDecoder
        }


getPage : String -> Cmd (Result Http.Error PageContent)
getPage title =
    requestPage title |> Cmd.map content


{-| convert the api parse result to a parsed Node
-}
content : FetchResult -> Result Http.Error PageContent
content (FetchResult res) =
    case res of
        Ok page ->
            let
                desc =
                    extractShortDesc page.html
            in
            Ok <|
                case Html.Parser.run page.html of
                    Ok (node :: _) ->
                        { title = page.title
                        , content = node
                        , desc = desc
                        , image = grabImg node
                        }

                    _ ->
                        { title = page.title
                        , content =
                            Element "div"
                                []
                                [ Text "This page is malformed and can't be displayed, but here are the links from it (use Ctrl+f)"
                                , createBackUpLinkList page.html
                                ]
                        , desc = desc
                        , image = Nothing
                        }

        Err error ->
            Err error


{-| try and pull out the first image in the infobox of a wikipage
-}
grabImg : Html.Parser.Node -> Maybe Html.Parser.Node
grabImg wikipage =
    let
        imgs =
            -- first try the infobox
            grabByClass "infobox" >> List.concatMap (grabElements "img") <| wikipage

        withBackups =
            imgs ++ grabElements "img" wikipage
    in
    withBackups |> List.filter (getAttr "width" >> Maybe.andThen String.toInt >> Maybe.map ((<) 50) >> Maybe.withDefault False) |> List.head


wikilink : Parser String
wikilink =
    succeed identity
        |. symbol "<a href=\"/wiki/"
        |= (getChompedString <|
                succeed ()
                    |. chompUntil "\""
           )


shortDescription : Parser String
shortDescription =
    succeed identity
        |. symbol "<div class=\"shortdescription"
        |. chompUntil ">"
        |. symbol ">"
        |= (getChompedString <|
                succeed ()
                    |. chompUntil "<"
           )


{-| try parsing the some string at every spot that begins with the given marker
-}
findMatches : String -> Parser a -> String -> List a
findMatches startMarker parser source =
    let
        indices =
            String.indexes startMarker source

        parseAt : Int -> Maybe a
        parseAt idx =
            case Parser.run parser (String.dropLeft idx source) of
                Ok parsed ->
                    Just parsed

                Err _ ->
                    Nothing
    in
    List.map parseAt indices |> flatten


{-| pull out the short description from the wikipage html
-}
extractShortDesc : String -> String
extractShortDesc html =
    findMatches "<div class=\"shortdescription" shortDescription html
        |> maxBy String.length
        |> Maybe.withDefault "No description found"


{-| retrieve all the wikilink ahref tags from the source html
-}
linksOn : String -> List String
linksOn html =
    let
        isUnwanted title =
            List.any (\ns -> String.startsWith (ns ++ ":") title) unwantedNamespaces
    in
    findMatches "<a href=" wikilink html |> List.filter (isUnwanted >> not)


{-| convert wikipage html to just a list of its wikilinks
-}
createBackUpLinkList : String -> Node
createBackUpLinkList html =
    let
        anchorTexts =
            linksOn html
                |> Set.fromList
                |> Set.toList
                |> List.map (\wl -> Element "a" [ ( "href", "/wiki/" ++ wl ) ] [ Text <| String.replace "_" " " wl ])
    in
    List.intersperse (Element "br" [] []) anchorTexts |> Element "div" []
