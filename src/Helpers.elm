module Helpers exposing (..)

import Array
import Articles
import Bitwise
import Html exposing (Html, node)
import Html.Attributes
import Html.Parser as Parser
import Html.Parser.Util
import Random


strToSeed : String -> Random.Seed
strToSeed s =
    let
        hash =
            String.foldl (\c h -> (h |> Bitwise.shiftLeftBy 5) + h + Char.toCode c) 5381 s
    in
    Random.initialSeed hash


{-| pop the given item off the front of a list if `f this == f head`,
-}
popBy : (a -> b) -> a -> List a -> List a
popBy f this items =
    case items of
        (x :: xs) as thebunch ->
            if f x == f this then
                xs

            else
                thebunch

        [] ->
            []



{---Elm automatically escapes html text nodes, so directly using unicode to show an arrow wont work.
-- this workaround converts html string straight to DOM node-}


type Dir
    = Up
    | Down
    | Right


{-| unicode arrow
-}
arrow : Dir -> Float -> Html msg
arrow dir size =
    let
        em =
            String.fromFloat size ++ "em"

        code =
            case dir of
                Up ->
                    "&uarr;"

                Down ->
                    "&darr;"

                Right ->
                    "&rarr;"
    in
    case Parser.run <| "<span style=\"font-size: " ++ em ++ ";\">" ++ code ++ "</span>" of
        Ok nodes ->
            case List.head <| Html.Parser.Util.toVirtualDom nodes of
                Just node ->
                    node

                Nothing ->
                    Html.text ""

        Err _ ->
            Html.text ""


uparrow : Float -> Html msg
uparrow size =
    arrow Up size


rightarrow size =
    arrow Right size


downarrow size =
    arrow Down size


{-| pick a title with the given index. uses modulus to fix range
-}
pickTitle : Int -> String
pickTitle seed =
    Array.get (seed |> modBy (Array.length Articles.titles)) Articles.titles |> Maybe.withDefault "Kevin_Bacon"


randomTitle : Random.Generator String
randomTitle =
    Random.map pickTitle <| Random.int 0 (Array.length Articles.titles)


{-| generates list of titles given a seed
-}
getDestinations : Int -> Random.Seed -> ( List String, Random.Seed )
getDestinations num seed =
    Tuple.pair [ "United States", "Long Island", "Queens" ] <| Random.initialSeed 0



{- case num of
   0 ->
       ( [], seed )

   n ->
       let
           ( title, newSeed ) =
               getRandomTitle seed

           ( dests, lastSeed ) =
               getDestinations (n - 1) newSeed
       in
       ( title :: dests, lastSeed )
-}


getRandomTitle : Random.Seed -> ( String, Random.Seed )
getRandomTitle seed =
    let
        ( title, newSeed ) =
            Random.step randomTitle seed
    in
    ( String.replace "_" " " title, newSeed )


{-| replace the first oldItem found in the list with newItem if `f newItem == f oldItem`
-}
replaceFirstBy : (a -> b) -> a -> a -> List a -> List a
replaceFirstBy f oldItem newItem items =
    case items of
        [] ->
            []

        thisItem :: rest ->
            if f oldItem == f thisItem then
                newItem :: rest

            else
                thisItem :: replaceFirstBy f oldItem newItem rest


{-| convert Parser attribute to Html attribute
-}
attr2htmlattr : Parser.Attribute -> Html.Attribute msg
attr2htmlattr ( prop, val ) =
    Html.Attributes.attribute prop val


{-| query all the elements of the given tag from the parent node (including the parent node)
-}
grabElements : String -> Parser.Node -> List Parser.Node
grabElements tag node =
    case node of
        Parser.Text _ ->
            []

        (Parser.Element nTag _ children) as element ->
            let
                rest =
                    children |> List.concatMap (grabElements tag)
            in
            if tag == nTag then
                element :: rest

            else
                rest

        Parser.Comment _ ->
            []


{-| retrieve all the nodes of a class from this parent node (including the parent)
-}
grabByClass : String -> Parser.Node -> List Parser.Node
grabByClass clazz node =
    case node of
        Parser.Text _ ->
            []

        (Parser.Element _ attrs children) as element ->
            let
                rest =
                    children |> List.concatMap (grabByClass clazz)
            in
            case getClass attrs of
                Just classStr ->
                    if String.contains clazz classStr then
                        element :: rest

                    else
                        rest

                Nothing ->
                    rest

        Parser.Comment _ ->
            []


{-| extract the class value from the given list of parser attributes
-}
getClass : List Parser.Attribute -> Maybe String
getClass attrs =
    case attrs of
        ( attrName, value ) :: rest ->
            if attrName == "class" then
                Just value

            else
                getClass rest

        [] ->
            Nothing


{-| monoidal combining method for Maybes
-}
maybeFirst : Maybe a -> Maybe a -> Maybe a
maybeFirst left right =
    case left of
        Nothing ->
            right

        justLeft ->
            justLeft


{-| create a bootstrap row with one element
-}
singleRow element =
    Html.div [ Html.Attributes.class "row" ] [ Html.div [ Html.Attributes.class "col" ] [ element ] ]
