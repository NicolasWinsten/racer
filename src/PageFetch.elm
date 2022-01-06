module PageFetch exposing (PageContent, getPage)

import Helpers exposing (..)
import Html.Parser as Parser exposing (Attribute, Node(..))
import Http
import Json.Decode exposing (Decoder, field, map2, string)
import List exposing (head)
import Maybe
import Result



{-
   This module provides functionality for fetching the content of wikipages
-}


type FetchResult
    = FetchResult (Result Http.Error PageHtml)


type alias PageHtml =
    { title : String, html : String }


type alias PageContent =
    { title : String, content : Parser.Node, desc : String, image : Maybe Parser.Node }


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
            Ok <|
                case Parser.run page.html of
                    Ok nodes ->
                        { title = page.title
                        , content = Maybe.withDefault (Text "Content couldn't be parsed. GO BACK") (head nodes)
                        , desc = Maybe.andThen extractShortDesc >> Maybe.withDefault "No description found" <| head nodes
                        , image = Maybe.andThen grabImg <| head nodes
                        }

                    Err _ ->
                        { title = page.title
                        , content = Text "This page isn't well formed. GO BACK"
                        , desc = "No description found"
                        , image = Nothing
                        }

        Err error ->
            Err error


{-| try and pull out the short description from page content
-}
extractShortDesc : Parser.Node -> Maybe String
extractShortDesc node =
    case node of
        Text _ ->
            Nothing

        Element "div" (( "class", clazz ) :: _) [ Text desc ] ->
            if String.contains "shortdescription" clazz then
                Just desc

            else
                Nothing

        Element _ _ children ->
            List.foldr firstMaybe Nothing <| List.map extractShortDesc children

        Comment _ ->
            Nothing


{-| try and pull out the first image in the infobox of a wikipage
-}
grabImg : Parser.Node -> Maybe Parser.Node
grabImg wikipage =
    let
        imgs =
            grabByClass "infobox" >> List.concatMap (grabElements "img") <| wikipage
    in
    imgs |> List.filter (getAttr "width" >> Maybe.andThen String.toInt >> Maybe.map ((<=) 50) >> Maybe.withDefault False) |> List.head
