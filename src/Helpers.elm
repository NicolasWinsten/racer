module Helpers exposing
    ( cmdIf
    , generateColorForNewPlayer
    , msToDisplayTime
    , unwantedNamespaces
    , decodeTitle
    , encodeTitle
    , window
    , strToSeed
    )

import Array exposing (Array)
import Bitwise
import Random
import Element exposing (Color, rgb255, rgb, toRgb)
import Dict
import List.Extra
import Random.Array
import Url
import Tuple


decodeTitle : String -> Maybe String
decodeTitle = Url.percentDecode >> Maybe.map (String.replace "_" " ")

encodeTitle : String -> String
encodeTitle = String.replace " " "_" >> Url.percentEncode

{-| guard a Cmd with a boolean flag
if the flag is False, then No-op
-}
cmdIf : Bool -> Cmd msg -> Cmd msg
cmdIf flag cmd = if flag then cmd else Cmd.none

colorPool : Array Color
colorPool =
    Array.fromList
        [ rgb255 222 120 132
        , rgb255 181 4 24
        , rgb255 235 167 89
        , rgb255 180 93 217
        , rgb255 153 207 91
        , rgb255 100 192 232
        , rgb255 223 176 245
        ]

randomColor : Random.Generator Color
randomColor = let float = Random.float 0 0.75 in Random.map3 rgb float float float


{-| given a list of player colors in use, generate an unused color
-}
generateColorForNewPlayer : List Color -> Random.Seed -> Color
generateColorForNewPlayer playerColors seed_ =
    let
        seed = case playerColors of
            [] -> seed_
            some -> some
                |> List.map (toRgb >> .red >> String.fromFloat)
                |> List.sort >> String.concat >> strToSeed 

        unusedColors = Array.filter
            (\c -> not <| List.member c playerColors)
            colorPool

    -- try and pick out an unused color from the pool
    -- otherwise randomly generate a color
    in case Random.step (Random.Array.sample unusedColors) seed of
        (Just c, _) -> c
        _ -> Tuple.first <| Random.step randomColor seed


strToSeed : String -> Random.Seed
strToSeed s =
    let
        hash =
            String.foldl (\c h -> (h |> Bitwise.shiftLeftBy 5) + h + Char.toCode c) 5381 s
    in
    Random.initialSeed hash


msToDisplayTime : Int -> {min : Int, sec : Int, ms : Int}
msToDisplayTime ms =
    let
        mins = ms // 60000
        secs = (ms // 1000) - (60*mins)
        msleft = ms - secs*1000 - mins*60000
    in {min=mins, sec=secs, ms=msleft}


{-| ignore the wikipedia pages from these namespaces
-}
unwantedNamespaces =
    [ "File", "Special", "Wikipedia", "Category", "Talk", "Help", "Template", "Template_talk", "Portal" ]



{-| give a sliding window of the given list of size two

    window [1,2,3,4] = [(1,2), (2,3), (3,4)]
-}
window : List a -> List (a, a)
window xs = case xs of
    first :: second :: rest ->
        List.Extra.scanl (\item (a, b) -> (b, item)) (first, second) rest
    _ -> []

