module Views exposing (view)

import Dict
import Helpers exposing (..)
import Html exposing (Html, br, button, div, h1, h2, h3, h5, input, label, li, node, span, text, ul)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import Html.Parser as Parser exposing (Node(..))
import Model exposing (..)
import Regex


{-
   This is where I keep all the ugly view code
-}


{-| add these styles to an element for a hover tooltip
-}
toolTipStyles bodyText =
    [ Html.Attributes.attribute "data-bs-toggle" "tooltip"
    , Html.Attributes.attribute "data-bs-placement" "bottom"
    , Html.Attributes.attribute "data-bs-container" "body"
    , Html.Attributes.title bodyText
    ]


backToMyPageLink =
    Html.small [ class "d-inline m-2", style "float" "right" ] [ text "go back to ", Html.a [ class "wikilink", href "https://nicolaswinsten.github.io" ] [ text "my page" ] ]


break num =
    span [] <| List.repeat num (br [] [])


{-| welcome page
-}
viewWelcome : Options -> Html Msg
viewWelcome options =
    let
        formFloating =
            div [ class "form-floating" ]

        usernameInput =
            div [ class "container" ]
                [ div [ class "row" ]
                    [ div [ class "col" ] [ h3 [] [ text "Enter your username: " ] ]
                    , div [ class "col-6" ]
                        [ formFloating
                            [ input [ id "username", class "form-control", placeholder "username", value options.username, onInput <| changeUsername options ] []
                            , label [ Html.Attributes.for "username" ] [ text "Your username" ]
                            ]
                        ]
                    ]
                ]

        descSection =
            singleRow <|
                Html.p []
                    [ Html.img [ class "m-2", style "float" "right", src "assets/wikilogo.png", width 300, alt "Wikipedia Game" ] []
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
                                If that's the case then you might just agree on a seed together and everyone host their own game."""
                        ]
                    ]

        hostGameSection =
            div []
                [ h3 [] [ text "Host" ]
                , formFloating
                    [ input [ class "form-control", id "seed", placeholder "Game Seed", value options.seedStr, onInput <| changeSeed options ] []
                    , label [ Html.Attributes.for "seed" ] [ text "Game Seed" ]
                    ]
                , br [] []
                , formFloating
                    [ input [ class "form-select", id "numDests", type_ "number", value <| String.fromInt options.numDestinations, Html.Attributes.min "2", onInput <| changeNumDestinations options ] []
                    , label [ Html.Attributes.for "numDests" ] [ text "Number of destinations" ]
                    ]
                , br [] []
                , button [ onClick <| ClickedJoinOrHost { isHost = True } ] [ text "Host Game" ]
                ]

        joinGameSection =
            div []
                [ h3 [] [ text "Join" ]
                , div [ class "form-floating" ]
                    [ input [ id "joinid", class "form-control", placeholder "Join ID", value options.joinId, onInput <| changeJoinId options ] []
                    , label [ Html.Attributes.for "joinid" ] [ text "Join ID" ]
                    ]
                , br [] []
                , button [ onClick <| ClickedJoinOrHost { isHost = False } ] [ text "Join Game" ]
                ]

        notesSection =
            singleRow <|
                div [ class "m-3" ]
                    [ h3 [] [ text "Notes" ]
                    , ul []
                        [ li [] [ text "This game was built with Elm and PeerJS. ", Html.a [ class "wikilink", href "https://github.com/NicolasWinsten/racer" ] [ text "source code" ] ]
                        , li [] [ text "All feedback and complaints go to nicolasd DOT winsten AT gmail DOT com" ]
                        ]
                    ]
    in
    div []
        [ backToMyPageLink
        , div [ class "container" ]
            [ singleRow <| h1 [] [ text "peer-to-peer Wikipedia game" ]
            , descSection
            , Html.hr [] []
            , singleRow usernameInput
            , Html.hr [] []
            , singleRow <| div [ class "container" ] [ div [ class "row" ] [ div [ class "col" ] [ hostGameSection ], div [ class "col" ] [ joinGameSection ] ] ]
            , Html.hr [] []
            , notesSection
            ]
        ]


viewLink : List String -> String -> Html msg
viewLink dests title =
    let
        element =
            Html.a [ class "hoverUnderline", href <| "https://en.wikipedia.org/wiki/" ++ title, target "_blank" ] [ text title ]
    in
    if List.member title dests then
        Html.b [] [ element ]

    else
        element


viewPath : { username : Maybe String, path : List String, dests : List String, showLength : Bool } -> Html msg
viewPath { username, path, dests, showLength } =
    let
        first =
            List.head path |> Maybe.withDefault ""

        final =
            last path |> Maybe.withDefault ""

        isComplete =
            List.member first dests && List.member final dests && List.length path > 1

        lengthText =
            if isComplete then
                " : (" ++ String.fromInt (List.length path - 1) ++ ")"

            else
                " : (DNF)"
    in
    span []
        [ Maybe.map (\u -> Html.b [] [ text <| u ++ " : " ]) username |> Maybe.withDefault (text "")
        , span [] (path |> List.map (viewLink dests) |> List.intersperse (rightarrow 1))
        , if showLength then
            Html.b [] [ text lengthText ]

          else
            text ""
        ]


{-| display the best path segments from the players for each consecutive pair of destinations
-}
viewBestSegments : List Peer -> List String -> Html msg
viewBestSegments players dests =
    let
        getSegments : Peer -> List Segment
        getSegments player =
            segments (\x -> List.member x dests) player.path
                |> List.map (\path -> { username = player.username, seq = List.reverse path })

        bests =
            bestSegs dests <| List.concatMap getSegments players

        viewSeg : Segment -> Html msg
        viewSeg seg =
            div [ class "row mb-3" ]
                [ singleRow <| viewPath { username = Just seg.username, path = seg.seq, dests = dests, showLength = True }
                ]

        segViews =
            List.map viewSeg bests
    in
    if List.isEmpty bests then
        text ""

    else
        div [ class "container-fluid" ] <|
            (singleRow <| h3 [] [ text "best wikiladders" ])
                :: segViews


{-| convert parser Node to custom Html, stripping out the unnecessary bits
-}
viewNode : Parser.Node -> Html Msg
viewNode n =
    let
        -- the html fetched from the wiki api has local urls in their links
        -- so we need to add https 
        imgurlstart = Maybe.withDefault Regex.never <|
            Regex.fromString "//upload.wikimedia.org"
        fixurls = Regex.replace imgurlstart (\_ -> "https://upload.wikimedia.org")

        attr2htmlattr (prop, val) = case prop of
            "src" -> Html.Attributes.attribute "src" (fixurls val)
            "srcset" -> Html.Attributes.attribute "srcset" (fixurls val)
            _ -> Html.Attributes.attribute prop val
        
        -- make the straightforward conversion to Html object
        convert parsedNode = case parsedNode of
            Element tag attrs children -> node tag (List.map attr2htmlattr attrs) (List.map viewNode children)
            Text s -> text s
            Comment _ -> text ""
    in
    case n of
        -- we want to reroute the wikilinks to onClick events
        Element "a" (( "href", link ) :: attrs) children ->
            let
                isUnwantedNamespace =
                    List.any (\ns -> String.startsWith ("/wiki/" ++ ns ++ ":") link) unwantedNamespaces
            in
            if isUnwantedNamespace then
                -- do not allow File, Category, Wikipedia links to be clicked
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
        Element "span" (( "class", clazz ) :: ( "id", headline ) :: _) _ as header ->
            if String.contains "mw-headline" clazz && List.member headline [ "Citations", "Notes", "References" ] then
                text ""

            else
                convert header

        -- hide references section
        Element "div" (( "class", clazz ) :: _) _ as el ->
            if String.startsWith "reflist" clazz then
                text ""

            else
                convert el

        -- hide superscript tags, they're citation links
        Element "sup" _ _ ->
            text ""

        el ->
            convert el


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
viewPathVertical : List String -> List String -> Html msg
viewPathVertical titles dests =
    let
        toText title =
            if List.member title dests then
                Html.b [] [ text title ]

            else
                text title

        titleTexts =
            List.map toText titles

        withArrows =
            List.intersperse (uparrow 2) titleTexts
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
                                , Maybe.map (\url -> Html.img [src url] []) loadedPage.image
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
                    if not <| List.isEmpty peerList then
                        div [ class "container border border-2 border-dark p-2" ] ((singleRow <| h5 [] [ text "Other players" ]) :: Html.hr [] [] :: peerList)

                    else
                        text ""

                allDestsLoaded =
                    doneLoading model.loadingDests

                refreshDisabled =
                    model.seedChange == model.options.seedStr && model.numDestsChange == model.options.numDestinations

                ( startBtn, refreshOptions ) =
                    let
                        refreshBtn_ =
                            let
                                changeSeed str =
                                    ChangeOptsWhileInPreview { seed = str, numDests = model.numDestsChange }

                                changeNum str =
                                    String.toInt str |> Maybe.withDefault model.numDestsChange |> (\num -> ChangeOptsWhileInPreview { seed = model.seedChange, numDests = num })
                            in
                            div [ class "container-fluid" ]
                                [ div [ class "input-group" ]
                                    [ input [ id "num-dests", class "form-control", placeholder "num destinations", type_ "number", value <| String.fromInt model.numDestsChange, Html.Attributes.min "2", onInput changeNum ] []
                                    , input [ id "seed", class "form-control", placeholder "new game seed", value model.seedChange, onInput changeSeed ] []
                                    , button [ disabled refreshDisabled, onClick Refresh ] [ text "Refresh" ]
                                    ]
                                ]
                    in
                    if allDestsLoaded && model.options.isHost then
                        ( button [ onClick <| StartGame, class "m-2" ] [ text "Start game" ]
                        , refreshBtn_
                        )

                    else if model.options.isHost then
                        ( text "Waiting for destinations to finish loading...", refreshBtn_ )

                    else
                        ( text "Waiting for host to start game...", text "" )
            in
            div [ class "container", style "text-align" "center" ]
                [ div [ class "row" ]
                    [ div [ class "col" ] [ viewPagePreviews model.loadingDests ]
                    , div [ class "col mt-5" ] [ copyIdBox, refreshOptions, startBtn, peersView ]
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

                giveUpBtn =
                    button [ class "btn btn-outline-dark m-3", onClick GiveUp ] [ text "Give Up" ]

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
                        viewPathVertical pathTitles destTitles

                    else
                        viewPeerLocs <| Dict.values model.peers

                bodyContainer =
                    div [ class "container-fluid pt-4" ]
                        [ div [ class "row" ]
                            [ div [ class "col-10" ] [ viewNode page.content ]
                            , div [ class "col-2" ] [ giveUpBtn, rightSideView ]
                            ]
                        ]
            in
            div [] [ dummyNavbar, navbar, bodyContainer ]

        Fetching title ->
            h1 [] [ text <| "Fetching " ++ title ++ " ..." ]

        Review playersToCompare ->
            let
                timeInSec time =
                    time // 100

                destTitles =
                    List.map .title model.dests

                you : Peer
                you =
                    { username = model.options.username
                    , path = List.map .title model.gameState.path
                    , uuid = model.options.uuid
                    , time = model.gameState.time
                    , lastDest = List.head model.gameState.pastDests |> Maybe.map .title |> Maybe.withDefault ""
                    , isHost = model.options.isHost
                    , finished = True
                    , currentTitle = List.head model.gameState.path |> Maybe.map .title |> Maybe.withDefault ""
                    }

                gotToEnd player =
                    Just player.lastDest == last destTitles

                playerList : List Peer
                playerList =
                    you :: Dict.values model.peers

                unfinishedPlayers =
                    List.filter (.finished >> not) playerList

                playersThatGotToEnd =
                    List.filter gotToEnd playerList

                playersThatGaveUp =
                    List.filter (\p -> not (gotToEnd p) && p.finished) playerList

                {- create a leaderboard of the players sorted by `f` and displaying `player |> f |> toString` -}
                leaderboard header f toString =
                    let
                        playerView player =
                            let
                                stat =
                                    if gotToEnd player then
                                        toString (f player)

                                    else
                                        "DNF"

                                name =
                                    if model.options.username == player.username then
                                        Html.b [] [ text player.username ]

                                    else
                                        text player.username
                            in
                            [ Html.a [ class "hoverUnderline", href "#", onClick <| ToggleReviewPlayer player.uuid ] [ name ], text <| " " ++ stat ]
                                |> span []

                        sortedPlayersView =
                            List.map playerView <| List.sortBy f playersThatGotToEnd ++ playersThatGaveUp
                    in
                    (h3 [] [ text header ] :: Html.hr [] [] :: sortedPlayersView)
                        |> List.map singleRow
                        |> div [ class "container border border-dark border-2 bg-light m-3 p-2", style "text-align" "center" ]

                timeBoard =
                    leaderboard "Time" .time (timeInSec >> String.fromInt >> (\t -> t ++ "s"))

                lengthBoard =
                    leaderboard "Path Length" (.path >> List.length) ((+) -1 >> String.fromInt >> (\l -> l ++ " steps"))

                boardsView =
                    div [ class "container" ]
                        [ div [ class "row" ] [ div [ class "col" ] [ timeBoard ], div [ class "col" ] [ lengthBoard ] ]
                        ]

                comparePlayersView =
                    -- compare the path segments of the highlighted players
                    let
                        players =
                            List.filter (\p -> List.member p.uuid playersToCompare) playerList

                        getPathSegments player =
                            player.path
                                |> List.reverse
                                |> threads (\dest -> List.member dest destTitles)
                                |> List.map (Tuple.pair player.username)

                        playersSegments =
                            List.map getPathSegments players
                                |> transpose

                        viewPlayerSegment ( username, seg ) =
                            div [ class "row mb-2" ]
                                [ singleRow <| viewPath { username = Just username, path = seg, dests = destTitles, showLength = True }
                                ]
                    in
                    List.map (List.map viewPlayerSegment >> div [ class "row mb-5" ]) playersSegments |> div [ class "container-fluid mb-5" ]

                unfinishedPlayersView =
                    let
                        viewPlayer player =
                            div [ class "col-3" ] [ Html.b [] [ text player.username ], Html.br [] [], viewLink destTitles player.currentTitle ]
                    in
                    if List.length unfinishedPlayers > 0 then
                        div [ class "container-fluid mb-5" ] [ singleRow <| h3 [] [ text "unfinished players" ], div [ class "row" ] <| List.map viewPlayer unfinishedPlayers ]

                    else
                        text ""
            in
            div [ class "container-fluid" ]
                [ boardsView
                , Html.hr [] []
                , singleRow <| text "Click on a player's name to see their paths"
                , break 2
                , comparePlayersView
                , unfinishedPlayersView
                , viewBestSegments playerList destTitles
                , break 2
                , singleRow <|
                    if model.options.isHost then
                        button [ onClick <| ClickedNewGame ] [ text "New Game" ]

                    else
                        text "Waiting on host to make a new game..."
                ]

        Bad msg ->
            div [] [ text "There was a problem: ", text msg ]
