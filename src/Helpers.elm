module Helpers exposing
    ( generateColorForNewPlayer
    , msToDisplayTime
    , decodeTitle
    , encodeTitle
    , window
    , strToSeed
    , computerColor
    , colorPool
    , when
    )

import Array
import Bitwise
import Random
import Element exposing (Color, rgb255, rgb, toRgb)
import List.Extra
import Random.Array
import Url
import Tuple



decodeTitle : String -> Maybe String
decodeTitle = Url.percentDecode >> Maybe.map (String.replace "_" " ")

{-| wikipedia articles are normalized by replacing spaces with underscores
-}
encodeTitle : String -> String
encodeTitle = String.replace " " "_"

when : Bool -> (a -> a) -> a -> a
when guard f = if guard then f else identity

colorPool : List Color
colorPool =
        [ rgb255 203 192 173    -- dun
        , rgb255 222 120 132    -- light coral
        , rgb255 235 167 89     -- earth yellow (orange)
        , rgb255 255 255 80    -- icterine (yellow)
        , rgb255 180 220 127    -- pistachio
        , rgb255 146 200 230    -- baby blue
        , rgb255 223 176 245    -- mauve
        ]

computerColor = rgb255 159 171 191

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
            (Array.fromList colorPool)

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

{-| convert a number of milliseconds to a string in minutes:ss:mmm format
-}
msToDisplayTime : Int -> {displayMillis : Bool} -> String
msToDisplayTime ms_ {displayMillis} =
    let ms = abs ms_
        mins = ms // 60000
        secs = (ms // 1000) - (60*mins)
        msleft = ms - secs*1000 - mins*60000
    in
    String.concat
    [ if ms_ < 0 then "-" else ""
    , String.padLeft 2 '0' (String.fromInt mins)
    , ":"
    , String.padLeft 2 '0' (String.fromInt secs)
    , if displayMillis then "." ++ String.padLeft 3 '0' (String.fromInt msleft)
        else ""
    ]


{-| give a sliding window of the given list of size two

    window [1,2,3,4] = [(1,2), (2,3), (3,4)]
-}
window : List a -> List (a, a)
window xs = case xs of
    first :: second :: rest ->
        List.Extra.scanl (\item (a, b) -> (b, item)) (first, second) rest
    _ -> []

