module Views exposing (view)

import Dict
import Helpers exposing (..)
import Html exposing (Html, br, button, div, h1, h2, h3, h5, input, node, span, text)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import Html.Parser as Parser exposing (Node(..))
import Model exposing (..)


{-| add these styles to an element for a hover tooltip
-}
toolTipStyles bodyText =
    [ Html.Attributes.attribute "data-bs-toggle" "tooltip"
    , Html.Attributes.attribute "data-bs-placement" "bottom"
    , Html.Attributes.attribute "data-bs-container" "body"
    , Html.Attributes.title bodyText
    ]


{-| welcome page
-}
viewWelcome : Options -> Html Msg
viewWelcome options =
    let
        break num =
            span [] <| List.repeat num (br [] [])

        formFloating =
            div [ class "form-floating" ]

        usernameInput =
            div [ class "container" ]
                [ div [ class "row" ]
                    [ div [ class "col" ] [ h3 [] [ text "Enter your username: " ] ]
                    , div [ class "col-6" ]
                        [ formFloating
                            [ input [ id "username", class "form-control", placeholder "username", value options.username, onInput <| changeUsername options ] []
                            , Html.label [ Html.Attributes.for "username" ] [ text "Your username" ]
                            ]
                        ]
                    ]
                ]

        descSection =
            singleRow <|
                Html.p []
                    [ Html.img [ class "m-2", style "float" "right", src "assets/wikilogo.png", width 300 ] []
                    , Html.p []
                        [ text """
                              The aim of the game is to race through wikipedia while hitting all the important pages in order.
                              Enter your username and either host your own game or join a friend's.
                              """
                        , break 2
                        , text """
                            To host your own game, pick a game seed (eg 'deadbeef' or 'pq9 83&#$hfl' or whatever you want) and specify the number of destinations you want in your game.
                            """
                        , break 2
                        , text """To join a game, paste in the Join ID given by the game's host"""
                        , break 2
                        , text """Once in the game, you must hit every destination in order to complete the game. Race your friends and see who is the fastest wikiracer"""
                        , break 2
                        , text """You can play alone just by hosting your own game and forgetting to invite your friends"""
                        , break 2
                        , text """It is also possible that you will run into issues connecting with your friends for a variety of reasons.
                                If that's the case then you might just agree on a seed together and everyone host their own game"""
                        ]
                    ]

        hostGameSection =
            div []
                [ h3 [] [ text "Host" ]
                , formFloating
                    [ input [ class "form-control", id "seed", placeholder "Game Seed", value options.seedStr, onInput <| changeSeed options ] []
                    , Html.label [ Html.Attributes.for "seed" ] [ text "Game Seed" ]
                    ]
                , br [] []
                , formFloating
                    [ input [ class "form-select", id "numDests", type_ "number", value <| String.fromInt options.numDestinations, Html.Attributes.min "2", onInput <| changeNumDestinations options ] []
                    , Html.label [ Html.Attributes.for "numDests" ] [ text "Number of destinations" ]
                    ]
                , br [] []
                , button [ onClick <| ClickedJoinOrHost { isHost = True } ] [ text "Host Game" ]
                ]

        joinGameSection =
            div []
                [ h3 [] [ text "Join" ]
                , div [ class "form-floating" ]
                    [ input [ id "joinid", class "form-control", placeholder "Join ID", value options.joinId, onInput <| changeJoinId options ] []
                    , Html.label [ Html.Attributes.for "joinid" ] [ text "Join ID" ]
                    ]
                , br [] []
                , button [ onClick <| ClickedJoinOrHost { isHost = False } ] [ text "Join Game" ]
                ]
    in
    div []
        [ Html.small [ class "d-inline", style "float" "right" ] [ text "go back to ", Html.a [ href "https://nicolaswinsten.com" ] [ text "my page" ] ]
        , div [ class "container" ]
            [ singleRow <| h1 [] [ text "Let's Race" ]
            , descSection
            , Html.hr [] []
            , singleRow usernameInput
            , Html.hr [] []
            , singleRow <| div [ class "container" ] [ div [ class "row" ] [ div [ class "col" ] [ hostGameSection ], div [ class "col" ] [ joinGameSection ] ] ]
            ]
        ]


{-| convert parser Node to custom Html, stripping out the unnecessary bits
-}
viewNode : Parser.Node -> Html Msg
viewNode n =
    case n of
        -- we want to reroute the wikilinks to onClick events
        Element "a" (( "href", link ) :: attrs) children ->
            if String.startsWith "/wiki/File:" link || String.startsWith "/wiki/Special:" link then
                -- do not allow File links to be clicked
                Html.a (List.map attr2htmlattr attrs) (List.map viewNode children)

            else if String.startsWith "/wiki/" link then
                Html.a [ class "wikilink", href "#", onClick (ClickedLink <| String.dropLeft 6 link) ] (List.map viewNode children)

            else if String.startsWith "#" link then
                -- catch other inpage reference tags such as section navigators
                Html.a (href link :: List.map attr2htmlattr attrs) (List.map viewNode children)

            else
                Html.a (List.map attr2htmlattr attrs) (List.map viewNode children)

        Element "a" _ children ->
            -- try and catch external links and mask them
            span [] (List.map viewNode children)

        -- hide edit sections
        Element "span" (( "class", "mw-editsection" ) :: _) _ ->
            text ""

        -- underline the section links in the contents navigator
        Element "span" (( "class", "toctext" ) :: attrs) children ->
            span (style "text-decoration" "underline" :: List.map attr2htmlattr attrs) (List.map viewNode children)

        --ignore coordinates info for places
        Element "span" (( "id", "coordinates" ) :: _) _ ->
            text ""

        Element "form" _ _ ->
            text ""

        -- hide boring headers
        Element "span" (( "class", clazz ) :: ( "id", headline ) :: attrs) children ->
            if String.contains "mw-headline" clazz && List.member headline [ "Citations", "Notes", "References" ] then
                text ""

            else
                span (class clazz :: id headline :: List.map attr2htmlattr attrs) (List.map viewNode children)

        -- hide references section
        Element "div" (( "class", clazz ) :: attrs) children ->
            if String.startsWith "reflist" clazz then
                text ""

            else
                div (class clazz :: List.map attr2htmlattr attrs) (List.map viewNode children)

        -- hide superscript tags, they're citation links
        Element "sup" _ _ ->
            text ""

        Element tag attrlist children ->
            node tag (List.map attr2htmlattr attrlist) (List.map viewNode children)

        Text string ->
            text string

        Comment _ ->
            text ""


{-| view each connected peer and the last destination they hit
-}
viewPeerLocs : List Peer -> Html Msg
viewPeerLocs peers =
    let
        peerView peer =
            singleRow <| div [] [ Html.b [] [ text peer.username ], br [] [], text peer.lastDest ]

        theView =
            List.intersperse (Html.hr [] []) <| List.map peerView peers
    in
    div [ class "container" ] theView


{-| view the path of titles highlighting the ones that are also destinations
-}
viewPath : List String -> List String -> Bool -> Html msg
viewPath titles dests reversed =
    let
        toText title =
            if List.member title dests then
                Html.b [] [ text title ]

            else
                text title

        titleTexts =
            List.map toText titles

        withArrows =
            let
                arrow =
                    if reversed then
                        uparrow 2

                    else
                        downarrow 2
            in
            List.intersperse arrow titleTexts
    in
    div [ class "container" ] <| List.map singleRow withArrows


viewPagePreviews : List LoadingDestination -> Html Msg
viewPagePreviews dests =
    let
        resizedImg img =
            div [ class "previewImage" ] [ img ]

        viewPagePreview : LoadingDestination -> Html Msg
        viewPagePreview page =
            singleRow <|
                div [ class "container" ] <|
                    List.map singleRow <|
                        case page of
                            Loading title ->
                                [ h5 [] [ text title ], div [ class "spinner-border" ] [] ]

                            Loaded loadedPage ->
                                [ h5 [] [ text loadedPage.title ]
                                , Maybe.map viewNode loadedPage.image
                                    |> Maybe.withDefault (text "")
                                    |> resizedImg
                                , Html.i [] [ text loadedPage.desc ]
                                ]

        downArrowElement =
            singleRow <| downarrow 5

        header =
            h1 [] [ text "The Destinations" ]
    in
    List.map viewPagePreview dests |> List.intersperse downArrowElement |> (::) header |> div [ class "container", style "text-align" "center" ]


view : Model -> Html Msg
view model =
    case model.window of
        PreGame ->
            viewWelcome model.options

        Preview ->
            let
                copyIdBox =
                    if model.options.isHost then
                        div [ class "m-2" ]
                            [ text "Copy this game ID and send it to your friends:"
                            , div [ class "d-inline-block" ]
                                [ input [ id "hostid", value model.options.peerId, readonly True ] []
                                , button (class "clippybtn" :: Html.Attributes.attribute "data-clipboard-target" "#hostid" :: toolTipStyles "Copy to clipboard") [ Html.img [ src "assets/clippy.svg", width 13 ] [] ]
                                ]
                            ]

                    else
                        text ""

                peersView =
                    let
                        peerEl peer =
                            singleRow <|
                                Html.b []
                                    [ text <|
                                        if peer.isHost then
                                            "Host: " ++ peer.username

                                        else
                                            "" ++ peer.username
                                    ]

                        peerList =
                            List.map peerEl <| Dict.values model.peers
                    in
                    div [ class "container border border-2 border-dark p-2" ] ((singleRow <| h5 [] [ text "Other players" ]) :: Html.hr [] [] :: peerList)

                doneLoading =
                    List.all destIsLoaded model.loadingDests

                refreshDisabled =
                    model.seedChange == model.options.seedStr

                ( startBtn, refreshBtn ) =
                    if doneLoading && model.options.isHost then
                        ( button [ onClick <| StartGame, class "m-2" ] [ text "Start game" ]
                        , div [ class "p-2" ]
                            [ input [ placeholder "new game seed", value model.seedChange, onInput ChangeSeedWhileInPreview ] []
                            , button [ disabled refreshDisabled, onClick Refresh ] [ text "Refresh" ]
                            ]
                        )

                    else if model.options.isHost then
                        ( text "Waiting for destinations to finish loading...", text "" )

                    else
                        ( text "Waiting for host to start game...", text "" )
            in
            div [ class "container", style "text-align" "center" ]
                [ div [ class "row" ]
                    [ div [ class "col-4" ] [ viewPagePreviews model.loadingDests ]
                    , div [ class "col-5 mt-5" ] [ copyIdBox, refreshBtn, startBtn ]
                    , div [ class "col-3 mt-5" ] [ peersView ]
                    ]
                ]

        InPage page ->
            let
                toHeader dest =
                    span (style "padding" "5px" :: style "font-size" "1.1em" :: toolTipStyles dest.desc) [ text dest.title ]

                titleAndDests =
                    h2 [ style "display" "inline" ] [ text page.title ] :: List.map toHeader model.gameState.remainingDests

                withPastDests =
                    List.map toHeader (List.reverse <| popBy .title page model.gameState.pastDests) ++ titleAndDests

                withArrows =
                    div [ class "nav-item" ] <| List.intersperse (rightarrow 2) withPastDests

                goBackBtn =
                    if List.length model.gameState.path > 1 then
                        button [ class "btn btn-outline-dark", onClick GoBack ] [ text "Go Back" ]

                    else
                        text ""

                timeDisplay =
                    let
                        timeInSec =
                            model.gameState.time // 100
                    in
                    h3 [] [ text <| String.fromInt timeInSec ++ "s" ]

                navbar =
                    node "nav"
                        [ class "navbar navbar-light border-bottom border-secondary border-3 fixed-top" ]
                    <|
                        [ div [ class "container-fluid" ] [ withArrows, timeDisplay, goBackBtn ] ]

                dummyNavbar =
                    -- this dummy navbar is used to pad the body content so that the real navbar doesn't overlap it.
                    -- just using padding doesn't work well because the navbar's size is not fixed
                    node "nav"
                        [ class "navbar invisible" ]
                    <|
                        [ div [ class "container-fluid" ] [ withArrows, timeDisplay, goBackBtn ] ]

                rightSideView =
                    if Dict.size model.peers == 0 then
                        let
                            destTitles =
                                List.map .title model.dests

                            pathTitles =
                                List.map .title model.gameState.path
                        in
                        viewPath pathTitles destTitles True

                    else
                        viewPeerLocs <| Dict.values model.peers

                bodyContainer =
                    div [ class "container-fluid pt-4" ]
                        [ div [ class "row" ]
                            [ div [ class "col-10" ] [ viewNode page.content ]
                            , div [ class "col-2" ] [ rightSideView ]
                            ]
                        ]
            in
            div [] [ dummyNavbar, navbar, bodyContainer ]

        Fetching title ->
            h1 [] [ text <| "Fetching " ++ title ++ " ..." ]

        Review playeruuid ->
            let
                timeInSec time =
                    time // 100

                you =
                    { emptyPeer | username = model.options.username, path = List.map .title model.gameState.path, uuid = model.options.uuid, time = model.gameState.time }

                playerList =
                    you :: Dict.values model.peers

                finishedPlayers =
                    List.filter (.path >> List.length >> (<) 0) playerList

                {- create a leaderboard of the players sorted by `f` and displaying `player |> f |> toString` -}
                leaderboard header f toString =
                    let
                        playerView player =
                            [ Html.a [ class "hoverUnderline", onClick <| ReviewPlayer player.uuid ] [ text player.username ], text <| " " ++ toString (f player) ]
                                |> span []

                        sortedPlayersView =
                            List.map playerView (List.sortBy f finishedPlayers)
                    in
                    (h3 [] [ text header ] :: Html.hr [ class "border border-dark border-1" ] [] :: sortedPlayersView)
                        |> List.map singleRow
                        |> div [ class "container border border-dark border-2 bg-light m-3", style "text-align" "center" ]

                timeBoard =
                    leaderboard "Time" .time (timeInSec >> String.fromInt >> (\t -> t ++ "s"))

                lengthBoard =
                    leaderboard "Path Length" (.path >> List.length) ((+) -1 >> String.fromInt >> (\l -> l ++ " steps"))

                pathView =
                    case List.filter (.uuid >> (==) playeruuid) playerList of
                        player :: _ ->
                            let
                                viewLink title =
                                    if List.member title <| List.map .title model.dests then
                                        Html.b [] [ text title ]

                                    else
                                        Html.a [ class "hoverUnderline", href <| "https://en.wikipedia.org/wiki/" ++ title, target "_blank" ] [ text title ]

                                listView =
                                    List.map viewLink player.path |> List.intersperse (rightarrow 1) |> div []
                            in
                            if List.member player finishedPlayers then
                                div [ class "container" ] [ singleRow <| h3 [] [ text <| player.username ++ "'s path" ], singleRow listView ]

                            else
                                h3 [] [ text <| player.username ++ " has not finished yet" ]

                        [] ->
                            text "Problem displaying player path"
            in
            div [ class "container" ]
                [ div [ class "row" ]
                    [ div [ class "col" ] [ timeBoard ]
                    , div [ class "col" ] [ lengthBoard ]
                    ]
                , Html.hr [] []
                , singleRow <| text "Click on a player's name to see their path"
                , Html.br [] []
                , Html.br [] []
                , singleRow pathView
                ]

        Bad msg ->
            div [] [ text "There was a problem: ", text msg ]
