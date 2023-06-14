module WikiGraphView exposing (view)

import Types exposing (..)
import Dict exposing (Dict)
import List.Extra
import Color
import Helpers exposing (encodeTitle)
import Set
import WikiGraph exposing (..)

import TypedSvg exposing (circle, rect, g, line, svg, image)
import TypedSvg.Attributes as A
import TypedSvg.Attributes.InPx as AInPx
import TypedSvg.Core exposing (Svg, text, attribute)
import TypedSvg.Types exposing (Paint(..), Transform(..))
import Dict.Extra
import Html.Events exposing (onMouseEnter)
import Html.Events exposing (onMouseLeave)
import Maybe.Extra
import TypedSvg.Types exposing (FontWeight(..))
import Model exposing (Msg(..))
import Zoom exposing (Zoom)

type alias ColorMap = Dict PeerId Color.Color

{-| set the alpha channel of a color
-}
setAlpha : Float -> Color.Color -> Color.Color
setAlpha a color =
  let {red,green,blue} = Color.toRgba color
  in Color.rgba red green blue a

hideAlpha = 0.3

{-| for each edge in the wikigraph, color it according to all the players that have used it
-}
svgEdge : WikiGraph -> ColorMap -> Edge -> Svg msg
svgEdge {nodes} colormap edge =
  let
      source = List.Extra.find (\n -> n.id == edge.source) nodes
          |> Maybe.map (\{x,y} -> {x=x, y=y})
          |> Maybe.withDefault {x=0,y=0}  -- will not happen

      target = List.Extra.find (\n -> n.id == edge.target) nodes
          |> Maybe.map (\{x,y} -> {x=x, y=y})
          |> Maybe.withDefault {x=0,y=0}  -- will not happen

      colors = Set.toList edge.visitors
        |> List.filterMap (\player -> Dict.get player colormap)
  in
      coloredPath colors source.x source.y target.x target.y

{-| Create a svg group that draws a colored line from one x,y point to another

-}
coloredPath : List Color.Color -> Float -> Float -> Float -> Float -> Svg msg
coloredPath colors sourceX sourceY targetX targetY =
    let
        portionThickness : Float
        portionThickness = 3
        mkLine i color =
            line
                [ AInPx.strokeWidth portionThickness
                , A.stroke <| Paint <| color
                , AInPx.x1 0
                , AInPx.y1 <| (toFloat i)*portionThickness + portionThickness/2
                , AInPx.x2 100
                , AInPx.y2 <| (toFloat i)*portionThickness + portionThickness/2
                ]
                []
        dist = sqrt <| (sourceX - targetX)*(sourceX - targetX) + (sourceY - targetY)*(sourceY - targetY)
        -- scale the path to match the distance between points
        scale = Scale (dist/100) 1

        totalThickness = (toFloat <| List.length colors)*portionThickness
        -- start line at the source point
        translate = Translate sourceX (sourceY - totalThickness/2)

        -- compute x,y vector from source to target point
        (x_,y_) = (targetX - sourceX, targetY - sourceY)
        degrees = (atan2 y_ x_) * 180 / pi
        -- rotate the line to match vector from source to target
        rotation = Rotate degrees sourceX sourceY

    in g [ A.class ["links"], A.transform [rotation, translate, scale] ]
        <| List.indexedMap mkLine colors


{-| render a destination node as its thumbnail in a circle
-}
mkPictureNode : {url : String, width : Float, height : Float} -> Pos -> Float -> Title -> Svg msg
mkPictureNode {url, width, height} {x,y} radius title =
  let id = encodeTitle title
        |> String.replace "(" "lp"
          >> String.replace ")" "rp"
          >> String.replace "%" "pc"
      sizeAttr =
        if width > height then
          AInPx.height (radius*2)
        else
          AInPx.width (radius*2)
      img = image
        [ A.href url
        , AInPx.x 0
        , AInPx.y 0
        , sizeAttr
        ]
        []

      bg = TypedSvg.pattern
        [ A.id <| id ++ "-pattern"
        , A.patternUnits TypedSvg.Types.CoordinateSystemUserSpaceOnUse
        , AInPx.height (radius*2)
        , AInPx.width (radius*2)
        ]
        [ img ]
      
      circ = circle
          [ AInPx.cx radius, AInPx.cy radius, AInPx.r radius
          , attribute "fill" <| "url(#" ++ id ++ "-pattern)"
          , A.stroke <| Paint Color.black
          , AInPx.strokeWidth 2
          ] 
          []
    in g [A.transform [Translate (x - radius) (y - radius)]] [TypedSvg.defs [] [bg], circ]


{-| draw a simple node circle, color it according to any players currently on it
-}
svgNode : WikiGraph -> ColorMap -> Node -> Svg Msg
svgNode wikigraph colormap node =
  let playercolor = wikigraph.playerLocations
        |> Dict.Extra.find (\player nodeid -> nodeid == node.id)
        |> Maybe.andThen (\(player, _) -> Dict.get player colormap)

      fillcolor = Maybe.withDefault Color.black playercolor

      playerIsHere = Maybe.Extra.isJust playercolor

      destinationPreview =
        List.Extra.find (.title >> (==) (Tuple.first node.id)) wikigraph.destinations
      
      isDestination = Maybe.Extra.isJust destinationPreview

      radius =
        if isDestination then 10
        else if playerIsHere then 5
        else 3

      -- rotate the label for easier reading and then place it at the node
      -- TODO we could link a dangling dummy node to each node, and the edge's force-directed layout becomes the label's layout!
      labelTransform =
        if node.y <= (WikiGraph.height/2) then
          [Translate node.x (node.y - (radius+3)), Rotate -55 0 0]
        else
          -- if the node is on the bottom side of the graph then draw the labels going down
          [ Translate node.x (node.y + radius*1.5)
          , Rotate 55 0 0
          ]

      nodeTitle = Tuple.first node.id

      labelText = -- TODO add option to highlight and display titles of particular player
        if True then
          TypedSvg.text_
          [ A.fontFamily ["sans-serif"]
          , AInPx.fontSize 10
          , A.transform labelTransform
          , A.pointerEvents "none"
          , A.fontWeight
              <| if isDestination then FontWeightBold else FontWeightNormal
          ]
          [text nodeTitle]
        else
          text ""

      nodeCircle = case Maybe.andThen .thumbnail destinationPreview of
        Just {src,width,height} ->
          mkPictureNode {url=src, width=width, height=height} {x=node.x, y=node.y} radius nodeTitle
        Nothing ->
          circle
            [ AInPx.r radius
            , A.fill <| Paint fillcolor
            , AInPx.cx node.x
            , AInPx.cy node.y
            , onMouseEnter (HoverWikiGraphNode <| Just node.id) -- TODO hovering over node highlights that player's path
            , onMouseLeave (HoverWikiGraphNode Nothing)
            ]
            [ TypedSvg.title [] [ text <| Tuple.first node.id ]]

      link = TypedSvg.a
        [ A.href ("https://en.wikipedia.org/wiki/" ++ encodeTitle nodeTitle)
        , A.target "_blank"
        ]

  in g [A.class ["node"]]
    [ link [nodeCircle]
    , labelText
    ]

view : WikiGraphState -> Dict PeerId { red : Float, green : Float, blue : Float, alpha : Float} -> Zoom -> Svg Msg
view (graph, _) colors zoom =
    let
        colormap = Dict.map (\_ {red,green,blue} -> Color.rgb red green blue) colors

        nodeElements = graph.nodes
            |> List.map (svgNode graph colormap)
            |> g [A.class ["nodes"]]
        edgeGroups = graph.edges
            |> List.map (svgEdge graph colormap)
    in
    -- the svg element has fixed dimensions
    -- if we want it to be resizable then we would need to update the Zoom with the new dimensions
    -- by subscribing to OnResize and 
    svg
      [ AInPx.width WikiGraph.width
      , AInPx.height WikiGraph.height
      ] --[viewBox 0 0 WikiGraph.width WikiGraph.height]
      [ rect
        ([ A.width <| TypedSvg.Types.Percent 100
        , A.height <| TypedSvg.Types.Percent 100
        , A.fill <| Paint <| Color.rgb255 235 236 229
        ]
          ++ Zoom.events zoom ZoomPan -- dragging and mousewheel are registered on background rect
        )
        []
        -- the actual zoom and pan transforms are done on the drawn content
      , g [Zoom.transform zoom] (edgeGroups ++ [nodeElements])
      ]