module Toast exposing (Toasts, ToastMsg, init, update, view, infoMessage, errorMessage, subscription)

{-
https://dev.to/lucamug/elm-beginners-tutorial-how-to-make-animated-snackbars-with-zero-css-12g1

This module provides functionality for a snackbar/toast component which is good for making alerts
-}


import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Events exposing (..)
import Element.Font as Font
import Element.Input as Input
import Colors.Opaque as Color
import Time
import List.Extra


type Toast
  = Stubborn (Element ToastMsg)
  | Temp Int (Element ToastMsg)

type alias Toasts = List Toast

type ToastMsg
  = Add Toast
  | Close Int
  | Tick
  | NoOp

init : Toasts
init = []


decTimeLeft : Toast -> Toast
decTimeLeft toast = case toast of
  Stubborn _ -> toast
  Temp secs content -> Temp (secs - 1) content

isDone : Toast -> Bool
isDone toast = case toast of
  Stubborn _ -> False
  Temp secs _ -> secs <= 0

update : ToastMsg -> Toasts -> Toasts
update msg toasts = case msg of
  Add toast -> toast :: toasts

  Close idx -> List.Extra.removeAt idx toasts

  Tick -> -- a second has passed so reduce the remaining seconds on each toast
    List.map decTimeLeft toasts
      |> List.filter (isDone >> not)
  
  NoOp -> toasts

subscription : Sub ToastMsg
subscription = Time.every 1000 (\_ -> Tick)



viewToast : Int -> Toast -> Element ToastMsg
viewToast index toast =
  let (content, isPerm) = case toast of
        Stubborn c -> (c, True)
        Temp _ c -> (c, False)
  in
  Input.button
    [centerX]
    { onPress = Just (Close index)
    , label = content
    }

view : Toasts -> Element ToastMsg
view toasts = column [spacing 5]
  <| List.indexedMap viewToast (List.reverse toasts)


infoMessage : String -> ToastMsg
infoMessage str = Add <| Temp 5 <|
  paragraph
  [ padding 5
  , Border.rounded 2
  , Border.width 2
  , Background.color Color.floralwhite
  , mouseOver [Border.glow Color.grey 2]
  , Border.glow Color.grey 1
  , width fill
  ]
  [text str]


errorMessage : String -> ToastMsg
errorMessage str = Add <| Stubborn <|
  row
  [ padding 5
  , Border.rounded 2
  , Border.width 2
  , Border.color Color.red
  , Background.color Color.salmon
  , mouseOver [Border.glow Color.darksalmon 2]
  , Border.glow Color.darksalmon 1
  , width fill
  ]
  [paragraph [] [text str], el [alignRight] (text "✕")]

