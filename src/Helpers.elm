module Helpers exposing (..)

import Array
import Articles
import Bitwise
import Html exposing (Html, node)
import Html.Attributes
import Html.Parser as Parser
import Html.Parser.Util
import Random



{-
   Some helper functions to get stuff done
-}


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
    case num of
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


transpose : List (List a) -> List (List a)
transpose data =
    case data of
        [] :: rest ->
            transpose rest

        [] ->
            []

        x ->
            let
                heads =
                    List.map List.head x |> flatten

                tails =
                    List.map List.tail x |> flatten
            in
            heads :: transpose tails


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
        (Parser.Element nTag _ children) as element ->
            let
                rest =
                    children |> List.concatMap (grabElements tag)
            in
            if tag == nTag then
                element :: rest

            else
                rest

        _ ->
            []


{-| retrieve all the nodes of a class from this parent node (including the parent)
-}
grabByClass : String -> Parser.Node -> List Parser.Node
grabByClass clazz node =
    case node of
        (Parser.Element _ _ children) as element ->
            let
                rest =
                    children |> List.concatMap (grabByClass clazz)
            in
            case getAttr "class" element of
                Just classStr ->
                    if String.contains clazz classStr then
                        element :: rest

                    else
                        rest

                Nothing ->
                    rest

        _ ->
            []


{-| extract the value of the given attribute from this node
-}
getAttr : String -> Parser.Node -> Maybe String
getAttr attr node =
    let
        get : String -> List Parser.Attribute -> Maybe String
        get name attributes =
            case attributes of
                ( attrName, value ) :: rest ->
                    if attrName == name then
                        Just value

                    else
                        get name rest

                [] ->
                    Nothing
    in
    case node of
        Parser.Element _ attributes _ ->
            get attr attributes

        _ ->
            Nothing


{-| flatten a list of maybes by filtering out the Nothings
-}
flatten : List (Maybe a) -> List a
flatten data =
    case data of
        Nothing :: rest ->
            flatten rest

        (Just x) :: rest ->
            x :: flatten rest

        [] ->
            []


{-| create a bootstrap row with one element
-}
singleRow element =
    Html.div [ Html.Attributes.class "row" ] [ Html.div [ Html.Attributes.class "col" ] [ element ] ]


dropWhile : (a -> Bool) -> List a -> List a
dropWhile f data =
    case data of
        (x :: xs) as all ->
            if f x then
                dropWhile f xs

            else
                all

        [] ->
            []


{-| takeWhile function that also returns the dropped tail
-}
pull : (a -> Bool) -> List a -> ( List a, List a )
pull f data =
    case data of
        (x :: xs) as all ->
            if f x then
                let
                    ( left, right ) =
                        pull f xs
                in
                ( x :: left, right )

            else
                ( [], all )

        [] ->
            ( [], [] )


last : List a -> Maybe a
last data =
    case data of
        x :: [] ->
            Just x

        _ :: rest ->
            last rest

        [] ->
            Nothing


{-| find every segment of length more than 1 in a list such that it begins and ends with an element satisfying the function
-}
segments : (a -> Bool) -> List a -> List (List a)
segments f data =
    case dropWhile (f >> not) data of
        x :: xs ->
            case pull (f >> not) xs of
                ( ys, z :: zs ) ->
                    (x :: ys ++ [ z ]) :: segments f (z :: zs)

                _ ->
                    []

        [] ->
            []


{-| same as segments but the threads dont have to be completed
f only needs to return true for the head of a thread
-}
threads : (a -> Bool) -> List a -> List (List a)
threads f data =
    case dropWhile (f >> not) data of
        x :: xs ->
            case pull (f >> not) xs of
                ( ys, z :: [] ) ->
                    [ x :: ys ++ [ z ] ]

                ( ys, z :: zs ) ->
                    (x :: ys ++ [ z ]) :: threads f (z :: zs)

                ( ys, [] ) ->
                    [ x :: ys ]

        [] ->
            []


maxBy : (a -> comparable) -> List a -> Maybe a
maxBy f data =
    let
        g item mitem =
            case mitem of
                Just x ->
                    if f item > f x then
                        Just item

                    else
                        Just x

                Nothing ->
                    Just item
    in
    List.foldl g Nothing data


maxesBy : (a -> comparable) -> List a -> List a
maxesBy f data =
    case maxBy f data of
        Just x ->
            let
                fx =
                    f x
            in
            List.filter (f >> (==) fx) data

        Nothing ->
            []


sliding2 : List a -> List ( a, a )
sliding2 data =
    case data of
        x :: y :: rest ->
            ( x, y ) :: sliding2 (y :: rest)

        _ ->
            []


{-| helper code that finds the best segments from the players' paths
-}
type alias Segment =
    { username : String, seq : List String }


{-| return the best segment that connects each consecutive pair of destinations
-}
bestSegs : List String -> List Segment -> List Segment
bestSegs dests segs =
    let
        best : ( String, String ) -> List Segment
        best ( from, to ) =
            segs
                |> List.filter (\s -> List.head s.seq == Just from && last s.seq == Just to)
                |> maxesBy (.seq >> List.length >> negate)
    in
    sliding2 dests |> List.concatMap best


unwantedNamespaces =
    [ "File", "Special", "Wikipedia", "Category", "Talk", "Help", "Template", "Template_talk", "Portal" ]
