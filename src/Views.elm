module Views exposing (view)

import Dict
import Helpers exposing (..)
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Events exposing (..)
import Element.Font as Font
import Element.Input as Input
import Html exposing (Html)
import Html.Attributes
import Model exposing (..)
import Types exposing (..)
import List.Extra
import Maybe.Extra
import Colors.Opaque as EColor
import Time
import Either exposing (Either(..))
import Basics.Extra
import Html
import Loading
import Html.Events
import WikiGraph
import Toast

{-
   This is where I keep all the ugly view code
-}


toCssString color =
    let {red, green, blue} = toRgb color
        rgb = List.map ((*) 255 >> round >> String.fromInt) [red, green, blue]
    in String.concat <|
        "rgb(" :: List.intersperse "," rgb ++ [")"]

linkStyle = [Font.underline, Font.color EColor.blue]

{-| tab out external link
-}
simpleLink url label = newTabLink linkStyle {url=url, label=text label}

buttonStyle =
    [ Background.color EColor.floralwhite
    , Border.width 2
    , Border.rounded 2  
    --, height (px 32)
    , padding 3
    , Font.size 16
    , mouseOver [Border.glow EColor.grey 2]
    , mouseDown [scale 1.1]
    ]

disabledButtonStyle =
    [ Border.color EColor.grey
    , Border.width 2
    , Border.rounded 2  
    --, height (px 32)
    , padding 1
    , Font.size 16
    , Font.color EColor.grey
    ]

inputStyle =
    [ Background.color EColor.ghostwhite
    , Border.width 2
    , Border.rounded 2
    , Font.center
    , mouseOver [Border.innerGlow (rgb255 208 210 196) 3]
    ]

rightarrow size = el [Font.size size] <| text "\u{2192}"

downarrow size = el [Font.size size] <| text "\u{2193}"

{-| animated loading spinner
-}
spinner =
    let config = Loading.defaultConfig
    in html <| Loading.render
        Loading.Circle
        {config | color=String.concat ["rgb(", String.fromInt 208, ",", String.fromInt 210, ",", String.fromInt 196, ")"]}
        Loading.On

pagebreak = el
    [ width fill, Border.color (rgb255 208 210 196)
    , Border.widthEach {bottom=2, left=0, right=0, top=0}
    ]
    none

clipboard = image [width (px 20), basicToolTip onLeft "Copy to clipboard"]
    {src="assets/clippy.svg", description="copy lobby code to clipboard"}

{-| recursive list item for bulleted lists
-}
type Li msg
    = Li (Element msg) (List (Li msg))

viewLi : Li msg -> Element msg
viewLi (Li item children) =
    row [ spacing 12, width fill ]
        [ el [ alignTop ] (text "•")
        , column [ spacing 6, width fill] (item :: List.map viewLi children)
        ]

{-| display some text when hovering over something

Ex: el [tooltip above "Im a tooltip"] (text "Hover me")
-}
tooltip : (Element msg -> Attribute msg) -> Element Never -> Attribute msg
tooltip usher content =
    inFront <| el
            [ width fill
            , height fill
            , transparent True
            , mouseOver [ transparent False ]
            , usher << Element.map never <|
                el
                [ htmlAttribute (Html.Attributes.style "pointerEvents" "none") ]
                content
            ]
            none

basicToolTipStyle =
    [ Background.color EColor.black
    , Font.color EColor.white
    , padding 4
    , Border.rounded 5
    , Font.size 14
    , Border.shadow { offset = ( 0, 3 ), blur = 6, size = 0, color = rgba 0 0 0 0.32 }
    ]


basicToolTip : (Element msg -> Attribute msg) -> String -> Attribute msg
basicToolTip usher content = tooltip usher (el basicToolTipStyle (text content))


type DescOption = Short | Full | None
{-| view a preview of a wikipedia article with its title, thumbnail, and description in a column
-}
viewPagePreview :
    { showDesc : DescOption
    , showLabelAbove : Bool
    } -> PagePreview -> Element msg
viewPagePreview {showDesc, showLabelAbove} {title, thumbnail, description, shortdescription} =
    let
        previewImageWidth = 150
        img = Maybe.map (\{src} -> image [width (px previewImageWidth), centerX] {src=src, description=src}) thumbnail
            |> Maybe.withDefault none
        desc =
            let short = (Maybe.map Right shortdescription)
                full = Maybe.Extra.or (Maybe.map Left description) short
            in case showDesc of
                Full -> full
                Short -> short
                None -> Nothing

        label = paragraph [Font.size 16, Font.center, Font.bold, width (minimum previewImageWidth fill), centerX] [text title]

        content = column [spacing 5] <| case desc of
            Nothing -> if showLabelAbove then [label, img] else [img, label]
            Just (Left fullDesc) ->
                let imgPlusDesc = paragraph [centerX, Font.size 14] [el [alignLeft, padding 1] img, text fullDesc]
                in if showLabelAbove then [label, imgPlusDesc] else [imgPlusDesc, label]
            Just (Right shortdesc) ->
                if showLabelAbove then [label, img, text shortdesc] else [img, label, text shortdesc]
    in content


{-| render the player's colored name
-}
viewPlayerName : {hollow : Bool} -> Player b -> Element msg
viewPlayerName {hollow} {name, color} =
    let hollowAttrs =
            [ htmlAttribute (Html.Attributes.style "-webkit-text-stroke" ("1px " ++ toCssString color))
            , htmlAttribute (Html.Attributes.style "-webkit-text-fill-color" "rgba(0,0,0,0)")
            ]
    in el ([Font.color color, Font.bold] ++ if hollow then hollowAttrs else [])
        (text name)

{-| welcome page
-}
viewWelcome : WelcomeOpts -> Element Msg
viewWelcome options =
    let
        usernameInput = Input.text inputStyle
            { onChange = \input -> OnInputWelcomeParams {joinId=options.inputJoinId, name=input}
            , text = options.inputName
            , placeholder = Just <| Input.placeholder [] (el [Font.color (rgb255 208 210 196)] <| text "display name") 
            , label = Input.labelHidden "display name"
            }
        
        joinIdInput = Input.text inputStyle
            { onChange = \input -> OnInputWelcomeParams {joinId=input, name=options.inputName}
            , text = options.inputJoinId
            , placeholder = Just <| Input.placeholder [] (el [Font.color (rgb255 208 210 196)] <| text "lobby code") 
            , label = Input.labelHidden "lobby code"
            }

        noName = options.inputName == ""
        noJoinId = options.inputJoinId == ""
        hostGameButton = Input.button (if noName then disabledButtonStyle else buttonStyle)
            { label=text "Host Game", onPress=Just ClickedHostGame}
        joinGameButton = Input.button (if noName || noJoinId then disabledButtonStyle else buttonStyle)
            { label=text "Join Game", onPress=Just ClickedJoinGame }

        inputSection = column [spacing 5]
            [ usernameInput
            , el [centerX] hostGameButton
            , joinIdInput
            , el [centerX] joinGameButton
            ]

        displayPages = 
                let (page1, page2) = options.displayPages
                    viewExampleTitle mpage = el [width (fillPortion 2)] <| case mpage of
                        Just page -> el [alignBottom] <| viewPagePreview {showDesc=None, showLabelAbove=False} page
                        Nothing -> el [centerY] spinner
                in
                row [spacing 20, centerX, alignBottom]
                    [ viewExampleTitle page1
                    , el [Font.extraBold, centerY, centerX] (rightarrow 64)
                    , viewExampleTitle page2
                    ]

        descSection = textColumn [Font.size 16, spacing 20]
            [ paragraph [] <|
                [ text
                    """
                    The aim of the game is to race through wikipedia while hitting all the important pages in order.
                    Enter your username and either host your own game or join a friend's.
                    """
                ]
            , paragraph [] <|
                [ text
                    """
                    To host your own game, click "Host Game" and distribute the lobby code to your friends.
                    """
                ]
            , paragraph [] <| [text """To join a game, paste in the lobby code given by the game's host"""]
            , paragraph [] <| [text """Once in the game, you must hit every destination in order to complete the game. Race your friends and see who is the fastest wikiracer"""]
            , paragraph [] <| [text """You can play alone just by hosting your own game and forgetting to invite your friends"""]
            , paragraph [] <|
                [ text
                    """
                    Note: It is possible that your browser is incompatible with some game features.
                    If you're having trouble connecting to a game, then you may consider trying a different browser.
                    """
                ]
            ]
        
        -- bulleted list of some notes on the game
        notesSection = column [Font.size 14, spacing 5, padding 10] <| List.map viewLi
            [ Li (el [Font.bold] (text "How did I build this?"))
                [ Li
                    ( paragraph []
                        [ text "The game logic and most of the styling is programmed in "
                        , simpleLink "https://elm-lang.org/" "Elm"
                        , text ", and P2P support is provided by "
                        , simpleLink "https://peerjs.com/" "PeerJS"
                        ]
                    )
                    []
                , Li
                    ( paragraph []
                        [ text "A very large pool of interesting articles were collected by a webscraper that accessed the Wikipedia "
                        , simpleLink "https://en.wikipedia.org/w/api.php?action=help&modules=parse" "API"
                        , text ", specifically looking for pages that are popularly visited"
                        ]
                    )
                    []
                , Li
                    ( paragraph []
                        [ text "You can visit the source code "
                        , simpleLink "https://github.com/NicolasWinsten/racer" "here"
                        ]
                    )
                    []
                ]
            , Li (el [Font.bold] (text "What makes this version different?"))
                [ Li
                    ( paragraph []
                        [ text "There are other versions of the wikipedia game available such as "
                        , simpleLink "https://www.thewikigame.com/" "this popular option"
                        , text ", so what makes my version different?"
                        ]
                    )
                    []
                , Li
                    ( paragraph []
                        [ text """
                        The game linked above only allows one destination page per round. This makes each round
                        very quick since experienced players can usually complete a path to a popular page in under 30 seconds.
                        Here you can configure the number of destination pages for each game to create longer gameplay.
                        """
                        ]
                    )
                    []
                , Li
                    ( paragraph []
                        [text "Each round creates a real-time visualization of the current game's players and their paths. An example is provided below."]
                    )
                    []
                ]
            , Li
                ( paragraph []
                    [ text "All feedback and complaints can be posted as an issue "
                    , simpleLink "https://github.com/NicolasWinsten/racer/issues" "here"
                    ]
                )
                []
            ]
        
        backToMyPageLink = paragraph []
            [ text "go back to "
            , link linkStyle
                { url="https://nicolaswinsten.github.io"
                , label=text "my page"
                }
            ]

        -- display the page title and some example titles for hype
        header = wrappedRow [width fill, spacing 10, height (px 300)]
            [ column [width (fillPortion 1), Font.center, centerX, spacing 10]
                [ paragraph [width (fillPortion 1), Font.bold, Font.size 36 ]
                    [text "peer-to-peer Wikipedia game"]
                , paragraph [Font.hairline] [backToMyPageLink]
                ]
            , el [width (fillPortion 2)] displayPages
            ]

    in column [centerX, width (maximum 1200 fill)] 
        [ column [padding 30, spacing 10, centerX]
            [ header
            , pagebreak
            , row []
                [ descSection
                , el [alignRight] inputSection
                ]
            , pagebreak
            , column [centerX]
                [ el [Font.bold, Font.size 18] (text "Notes")
                , notesSection
                ]
            ]
        , image [centerX]
            {src="assets/vizexample.png", description="wikigraph example"}
        ]
    


type ProgressDisplayTitle
    = MetDestination Title
    | CurrentLeg Title
    | UnMetDestination Title

{-| display ordered list of previous met destinations, the current leg, and the remaining destinations to hit

titles in the current leg can be clicked on to return to.

display players above the page they're currently on, so you'll know if they're on your tail or ahead of you.
-}
viewProgress : InProgressGame -> Page a -> Bool -> Element Msg
viewProgress game {sections} displayToc=
    let
        state = game.self.gameState

        -- get the destinations reached and the destinations needed
        (metDestinations, remainingDestinations) = List.map .title game.destinations
            |> List.Extra.splitAt (List.length state.previousLegs + 1)

        -- titles in the player's current leg (including the last destination they reached)
        currentLeg = legToList state.currentLeg

        -- list of titles in display order
        -- we're displaying the previously met destinations, the current leg, and the unmet destinations
        -- depending on whether the title is a destination or part of the current leg, display them differently
        titleList = List.Extra.init metDestinations
            |> Maybe.withDefault []
            |> \metDests ->
                List.map MetDestination metDests
                ++ List.map CurrentLeg currentLeg
                ++ List.map UnMetDestination remainingDestinations

        -- which title should the player be displayed over?
        -- indicates their progress in the game
        playersMarkedTitle player =
            let onSameLeg = state.currentLeg.goal == player.gameState.currentLeg.goal
                playersPage = player.gameState.currentLeg.currentPage
                playerMetDest dest = List.member dest (getMetDestinations player.gameState)
            in
            List.reverse titleList
            |> List.Extra.find (\t -> case t of
                    UnMetDestination dest -> playerMetDest dest
                    CurrentLeg currTitle -> onSameLeg && currTitle == playersPage
                    MetDestination dest -> not onSameLeg && playerMetDest dest
                )

        -- render the players that should be displayed above some title
        -- TODO just display player color
        displayPlayersAbove title = Dict.values game.players
            |> List.filter (\player -> playersMarkedTitle player == Just title)
            |> List.map (\{color} -> el [width fill, height fill, Background.color color] (text ""))
            |> row [width fill, height (px 10)]

        -- table of contents section so that larger pages are easier to navigate
        toc =
            if displayToc then
                List.filter (.level >> (==) 1) sections -- TODO allow expanding the sections
                    |> List.map (\{anchor} -> link [Font.underline, Font.size 14] {url="#"++anchor, label=text <| String.replace "_" " " anchor})
                    |> column
                        [ spacing 5
                        , Border.widthEach {bottom=2, top=0, left=2, right=2}
                        , Border.color EColor.darkgrey
                        , Background.color (rgb255 208 210 196)
                        , padding 5
                        , moveRight 5
                        ]
            else none

        viewCurrentLegTitle title =
            if title == state.currentLeg.currentPage then
                -- hovering the mouse over the current page header will display a table of contents for navigation
                el [Font.size 24, Font.bold, onMouseEnter (DisplayToc True), below toc] (text title)
            else
                -- allow the user to click on any past title from the current leg to return back to it
                Input.button []
                    { onPress=Just (ClickedLink title)
                    , label=el [Font.light, htmlAttribute (Html.Attributes.class "hoverUnderline")] <| text title
                    }

        -- destination titles are bolded, with a 
        viewDestinationTitle title =
            let shortdescTip = basicToolTip below
                    <| Maybe.withDefault "no description"
                    <| Maybe.andThen .shortdescription 
                    <| List.Extra.find (.title >> (==) title) game.destinations
            in el [Font.semiBold, shortdescTip] (text title)
        viewTitle title =
            let displayTitle = case title of
                    CurrentLeg currTitle -> viewCurrentLegTitle currTitle
                    MetDestination dest -> viewDestinationTitle dest
                    UnMetDestination dest -> viewDestinationTitle dest
            in column [Font.size 16, alignBottom] [displayPlayersAbove title, displayTitle]

    in List.map viewTitle titleList
        |> List.intersperse (el [alignBottom] (rightarrow 16))
        |> wrappedRow [width fill, spacingXY 0 10]


{-| view a list of page previews as a column with arrows in between
-}
viewPagePreviews : List PagePreview -> Element msg
viewPagePreviews previews = List.map (viewPagePreview {showLabelAbove=True, showDesc=Full}) previews
    |> List.intersperse (downarrow 64)
    |> List.map (el [centerX])
    |> column [spacing 10]

{-| view the lobby code as the host,
provide copy-to-clipboard button
-}
gameIdView : Maybe PeerId -> Element Msg
gameIdView muuid = case muuid of
    Just uuid -> row []
        [ Input.text (Font.size 14 :: height (px 30) :: inputStyle)
            { onChange=\_ -> NoOp
            , text = uuid
            , placeholder = Nothing
            , label = Input.labelAbove [Font.size 14] (text "Copy this lobby code to send to your friends")
            }
        , Input.button (alignBottom :: buttonStyle)
            { onPress=Just (CopyToClipboard uuid)
            , label=clipboard
            }
        ]
    Nothing -> text "No peer agent. Try refreshing if you want to play with friends"

{-| slider to adjust the number of destinations
-}
numDestinationsSlider : Int -> Element Msg
numDestinationsSlider num = Input.slider
    [
    -- Here is where we're creating/styling the "track"
    behindContent
        (el
            [ width fill
            , height (px 4)
            , centerY
            , Background.color EColor.grey
            , Border.rounded 2
            ]
            none
        )
    ]
    { onChange = round >> \i -> OnInputLobbyParams {numDestinations=i}
    , label = Input.labelAbove [Font.size 14] (el [centerX]<| text <| "number of destinations: " ++ String.fromInt num)
    , min = 2
    , max = 10
    , step = Just 1
    , value = toFloat num
    , thumb = Input.thumb
        [ width (px 16)
        , height (px 16)
        , Border.rounded 8
        , Border.width 1
        , Border.color (EColor.black)
        , Background.color EColor.floralwhite
        ]
    }
{-| display the lobby with a preview of the goals on the left side
and the player list on the right side
-}
viewLobby : Lobby -> LobbyOpts -> Element Msg
viewLobby lobby opts =
    let
        doneLoading = List.length lobby.destinations == lobby.numDestinations
        startButton =
            if doneLoading then
                Input.button buttonStyle { onPress=Just ClickedStartGame, label=text "Start game"}
            else
                Input.button disabledButtonStyle { onPress=Nothing, label=text "Start game"}
        
        refreshLobbyButton = Input.button buttonStyle { onPress=Just RefreshLobby, label=text "Refresh" }

        hostInputSection = column [spacing 25]
            [ el [Font.bold, centerX] (text "You are the host")
            , gameIdView lobby.uuid
            , numDestinationsSlider opts.numDestinationsInput
            , row [spacing 5, width fill]
                <| List.map (el [width fill])
                <| List.map (el [centerX]) [ refreshLobbyButton, startButton ]
            ]

        playerList = column [Font.center, centerX, spacing 5]
            <| List.map (el [centerX])
            <| List.map (viewPlayerName {hollow=False}) (allPlayers lobby)
    in
    row [width fill, padding 20, spacing 10, centerX]
        [ column [spacing 10, width fill]
            [ el [centerX, Font.size 32, Font.bold] (text "The Destinations")
            , el [centerX] (if doneLoading then none else spinner) 
            , el [centerX] <| viewPagePreviews lobby.destinations
            ]
        , column [ alignTop, alignRight, spacing 20, width fill ]
            [ el [centerX] <| if lobby.amHost then hostInputSection else text "Waiting for host to start game"
            , pagebreak
            , el [Font.size 24, Font.bold, centerX] (text "Players")
            , playerList
            ]
        ]



{-| display the shortest paths produced by all the players for each leg of the game

color the paths with the player colors in between the thumbnails of the destinations
-}
bestLegsDisplay : InProgressGame -> Element msg
bestLegsDisplay game =
    let
        -- view a leg as a row of titles and external links to wikipedia
        viewLeg leg =
            let (start, steps, goal) = legParts leg
                viewStep title = newTabLink [htmlAttribute (Html.Attributes.class "hoverUnderline")]
                    { url="https://en.wikipedia.org/wiki/" ++ encodeTitle title, label=text title }

                arr = rightarrow 14
                els = List.map viewStep steps
                    |> List.intersperse arr
                    |> (::) arr
                    |> \ells -> if List.isEmpty steps then [] else ells ++ [arr]

            in wrappedRow [width fill, spaceEvenly] els

        getLength (player, leg) = List.length leg.previousPages
        shortestLength = List.map getLength >> List.minimum >> Maybe.withDefault Basics.Extra.maxSafeInteger
        allLegs = allPlayers game
            |> List.concatMap (\player -> List.map (Tuple.pair player) (getCompletedLegs player.gameState))

        getBestLegsFor : Title -> List (Player InGameAttributes, Leg)
        getBestLegsFor title = List.filter (Tuple.second >> .goal >> (==) title) allLegs
            |> \legs -> List.filter (getLength >> (==) (shortestLength legs)) legs
                
        viewBestLegsFor : PagePreview -> PagePreview -> Element msg
        viewBestLegsFor start goal =
            let bestLegs = getBestLegsFor goal.title
                legsView = bestLegs
                    |> List.map (\(player, leg) ->
                        el [Background.color player.color, width fill, paddingXY 10 3] (viewLeg leg))
                    |> column [spaceEvenly, width fill, centerY]
                
                numSteps = case bestLegs of
                    (_, leg) :: _ ->
                        let n = List.length leg.previousPages
                        in text (String.fromInt n ++ " steps")
                    [] -> none

            in row [width fill]
                [ viewPagePreview {showLabelAbove=False, showDesc=None} start
                -- , column [width fill, centerY, spacing 10]
                --     [ el [centerX, Font.bold] numSteps, el [width fill, centerY] legsView ]
                , if List.isEmpty bestLegs then paragraph [Font.center] [text "Waiting for player to connect these titles..."]
                    else el [width fill, centerY, above <| el [Font.bold, centerX, padding 5] numSteps] legsView
                , viewPagePreview {showLabelAbove=False, showDesc=None} goal
                ]
    in column [Font.size 14, spacing 25]
        <| List.intersperse pagebreak
        <| List.map (Basics.Extra.uncurry viewBestLegsFor) (window game.destinations)


{-| render the post game review screen

when player finishes or gives up, enter the game review screen where
they can view the leaderboards and the best wikiladders from the players
-}
viewPostGame : InProgressGame -> WikiGraph.WikiGraphState -> Element Msg
viewPostGame game wikigraph =
    let
        players = allPlayers game
        finishedPlayers = List.filter (.gameState >> isGameFinished) players
        unfinishedPlayers = List.filter
            (Basics.Extra.flip List.member finishedPlayers >> not) players

        byTimeLeaderboard =
            let playerTime = (.gameState >> .finishTime >> Maybe.withDefault Basics.Extra.maxSafeInteger)

                displayTimeOfPlayer {gameState} = case gameState.finishTime of
                    Just timeInMs ->
                        if isGameFinished gameState then
                            let {min,sec,ms} = msToDisplayTime timeInMs
                            in text <| String.concat [String.fromInt min, "m ", String.fromInt sec, ".", String.fromInt ms, "s"]
                        else
                            text "(gave up)"
                    Nothing -> text "(not finished)"
            in mkLeaderBoard "Time" playerTime displayTimeOfPlayer

        byLengthLeaderboard =
            let playersByLength = (.gameState >> numSteps)
                displayNumSteps {gameState} = text <| String.fromInt (numSteps gameState)
                    ++ if isGameFinished gameState then "" else " (not finished)"
            in mkLeaderBoard "Total Path Length" playersByLength displayNumSteps
        
        -- create a table that displays the scores of the players by some metric
        mkLeaderBoard : String -> (Player InGameAttributes -> Int) -> (Player InGameAttributes -> Element msg) -> Element msg
        mkLeaderBoard headerTitle comparator scoreView =
            let table_ = table [Font.alignRight, spacing 5]
                    { data = List.sortBy comparator finishedPlayers ++ List.sortBy comparator unfinishedPlayers
                    , columns =
                        [
                            { header=none
                            , width=fill
                            , view=\player -> viewPlayerName {hollow=not player.connected} player
                            }
                            ,
                            { header=none
                            , width=fill
                            , view=scoreView
                            }
                        ]
                    }
            in column
                [ Background.color EColor.floralwhite
                , Border.color EColor.black
                , Border.width 2
                , padding 10
                , spacing 5
                ]
                [ el [Font.bold, centerX] <| text headerTitle
                , pagebreak
                , table_
                ]

        svgWikiGraph =
            let playerColorMap = game.players
                    |> Dict.insert (Maybe.withDefault "" game.uuid) game.self
                    |> Dict.map (\_ {color} -> toRgb color )
            in Element.map Model.WikiGraphMsg
                <| html 
                <| WikiGraph.view wikigraph playerColorMap
            
        newGameButton = Input.button buttonStyle {onPress=Just ClickedNewGame, label=text "New Game"}

    in column [centerX, spacing 15, padding 15]
        [ row [spaceEvenly, centerX]
            [ byTimeLeaderboard, byLengthLeaderboard]
        , el [centerX, Border.width 2] svgWikiGraph
        , column [spacing 10, centerX] [ el [Font.bold, centerX] (text "Best paths"), bestLegsDisplay game]
        , el [centerX] <| if game.amHost then newGameButton else (text "Waiting for host to start a new game...")
        ]

view : Model -> Html Msg
view model =
    let
        toastView toasts = mapAttribute ToastMsg
            <| inFront
            <| el [alignBottom, alignRight, moveLeft 15, moveUp 15, Font.size 16]
            <| Toast.view toasts
            
    in 
    case model.phase of
    -- welcome screen
    Welcome opts -> layout [toastView model.toasts] <| viewWelcome opts

    -- lobby screen where players typically join in and see the goal titles for the game
    Lobby lobby opts -> layout [toastView model.toasts] <| viewLobby lobby opts
        
    -- while in game, display your progress at the top
    -- display the article content
    InGame (Right page) game opts _ -> 
        let
            giveUpBtn = Input.button buttonStyle { onPress=Just GiveUp, label=text "Give Up"}

            timeDisplay =
                let
                    {min, sec} = msToDisplayTime (Time.posixToMillis opts.currentTime - Time.posixToMillis opts.startTime)
                in 
                text <| String.fromInt min ++ "m " ++ String.fromInt sec ++ "s"

            -- we're only using ElmUI to create the top progress display while in game
            -- trying to wrap the article content in ElmUI breaks its styling
            progressbar = layout
                [ Border.widthEach {bottom=2, top=0, left=0, right=0}
                , Border.color EColor.darkgrey
                , Background.color (rgb255 208 210 196)
                , htmlAttribute (Html.Attributes.style "position" "-webkit-sticky")
                , htmlAttribute (Html.Attributes.style "position" "sticky")
                , htmlAttribute (Html.Attributes.style "top" "0")
                , htmlAttribute (Html.Attributes.style "z-index" "100") -- the wikipedia infobox elements were appearing above the progress bar
                , toastView model.toasts
                ]
                <| row [width fill, spacing 10, padding 10]
                    [ viewProgress game page opts.displayToc
                    , el [alignRight] timeDisplay
                    , el [alignRight] giveUpBtn
                    ]

            articleContent = Html.div
                [ Html.Events.onMouseEnter (DisplayToc False) -- put the table of contents navigator away when mouse is back on page
                , Html.Attributes.style "margin" "0 5%"
                ]
                [page.content]

            playerCurrentlyHere player = player.gameState.currentLeg.currentPage == page.title
            -- get all the players that are currently on the same page as you
            playersHere = Dict.values game.players
                |> List.filter playerCurrentlyHere
                |> List.filter .connected
                |> List.map 
                    (\({name} as p) -> el [basicToolTip below (name ++ " is on this page")] <| viewPlayerName {hollow=False} p)

            -- get all the players that aren't here but previously were
            playersThatWereHere =
                let beenHere {gameState} = gameState.currentLeg :: gameState.previousLegs
                        |> List.concatMap legToList
                        |> List.member page.title
                in Dict.values game.players
                    |> List.filter beenHere
                    |> List.filter (not << playerCurrentlyHere)
                    |> List.map
                        (\({name} as p) -> el [basicToolTip below (name ++ " was on this page")] <| viewPlayerName {hollow=True} p)

            -- display the names of any players that have visited the page you're on
            playerList = layoutWith {options=[noStaticStyleSheet]} [] <| row [spacing 10, padding 10]
                <| playersHere ++ playersThatWereHere

        in
        -- the wikipage article body using external styling, so mixing it in with Elm UI breaks it,
        -- so unfortunately I can't align the body with Elm UI
        Html.div [] [progressbar, playerList, articleContent]

    InGame (Left title) _ _ _ -> layout [toastView model.toasts] <|
        el [padding 20] (text ("Fetching " ++ title ++ "..."))

    PostGameReview game wikigraph -> layout [toastView model.toasts] (viewPostGame game wikigraph)
