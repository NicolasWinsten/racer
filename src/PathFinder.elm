module PathFinder exposing (pathFind, Model, dead, Msg, Terminal(..), workToBeDone, work, update, splitDisamb)

import Types exposing (..)
import Set exposing (Set)
import PriorityQueue exposing (PriorityQueue)
import PriorityQueue as PQ
import Basics.Extra
import Regex
import PageFetch
import Either exposing (Either(..))
import Maybe.Extra
import Helpers exposing (..)
import Dict exposing (Dict)
import Deque exposing (Deque)
import Log
import List.Extra


{-|

Provided is AI logic that will connect two wikipedia articles

The AI will follow titles that appear in the goal page's html frequently
and will rank pages based on their overlap of wikilinks with the goal page.

This module is structured such that external code can run this pathfinder using a stepper
(So that it can be paired with requestAnimationFrame for example)
-}


type alias Article = PageFetch.WikiText

type alias ArticleStats =
  { occurrencesOfGoalOnText : Int
  , sharedLinksWithGoal : Set Title
  }

type alias LinkStats =
  { parentStats : ArticleStats
  , occurrencesOnGoalText : Int
  , titleOverlap : Int
  }

type alias Link =
  { resolvedPath : IncompleteLeg
  , parent : Article
  , parentStats : ArticleStats
  , title : Title
  }

type LinkToFetch = LinkToFetch
  { resolvedPath : IncompleteLeg
  , title : Title
  , parent : Title
  , stats : LinkStats
  , priority : Float
  }

titleOf : LinkToFetch -> Title
titleOf (LinkToFetch {title}) = title

{-| debug string to help understand the calculated priority of a link
-}
fetchLinkToString : LinkToFetch -> String
fetchLinkToString (LinkToFetch {title, parent, stats, priority}) =
  let
    sharedLinks = String.join "|"
      <| Set.toList
      <| stats.parentStats.sharedLinksWithGoal
    sharedLinksSize = Set.size stats.parentStats.sharedLinksWithGoal
  in
  String.concat
  [parent, "->", title, " : "
  , "countedOnGoal(", String.fromInt stats.occurrencesOnGoalText
  , ") titleOverlap(", String.fromInt stats.titleOverlap
  , ") parentLinkSetOverlap(", String.fromInt sharedLinksSize, ":", sharedLinks
  , ") goalCountedOnParent(", String.fromInt stats.parentStats.occurrencesOfGoalOnText, ") "
  , "priority=", String.fromFloat priority
  ]

comparator : PQ.Priority LinkToFetch
comparator (LinkToFetch {priority} )= priority * 1000 |> round >> negate

emptyPQ : PriorityQueue LinkToFetch
emptyPQ = PQ.empty comparator

dequeue : Int -> PriorityQueue a -> (List a, PriorityQueue a)
dequeue num q =
  let
    popped = PQ.take num q
    pruned = PQ.drop num q
  in (popped, pruned)

prune : Int -> PriorityQueue LinkToFetch -> PriorityQueue LinkToFetch
prune num q =
  let (items, _) = dequeue num q
  in PQ.fromList comparator items


type alias PathFinderState =
  { goal : Article
  , visited : Set Title
  , linksOnGoal : Set Title    -- used to predict the proximity of a page by its links
  
  -- when there's no more link titles to inspect,
  -- pick the most promising link off the queue and fetch its article content
  , linksToFetch : PriorityQueue LinkToFetch

  -- store links here before we estimate their priority, then push them to linksToFetch
  , linksToInspect : Deque Link
  , totalRequests : Int
  , totalRequestLimit : Int
  , pendingRequestLimit : Int
  , pendingRequests : Dict Title LinkToFetch
    -- track the pages requested (this allows me to easily ignore stale api requests)
  , verbose : Bool
  }


type Model
  -- before beginning the search, request the article content of the goal page
  = WaitingOnDestinationContent
    { start : Either Title Article, goal : Either Title Article }
  | Working PathFinderState
  | Done Terminal

type Msg
  = GotContentOfLink { requestedTitle : Title, result : (Result String Article) }

type Terminal
  = Stuck
  | RequestLimitReached
  | Dead
  | Finished

dead : Model
dead = Done Dead

readyToFetch : PathFinderState -> Bool
readyToFetch ({linksToFetch, linksToInspect} as state) =
  not (waitingOnRequests state)
  && Deque.isEmpty linksToInspect
  && not (PQ.isEmpty linksToFetch)

titleOccurrenceWeight = 5
sharedLinkWeight = 1

gatherArticleStats :
  { titleText : String
  , goal : Title
  , linksOnGoal : Set Title
  , linksOnTitle : Set Title
  } -> ArticleStats
gatherArticleStats params =
  let
    occurrences = countTitleOccurrences params.goal params.titleText
    sharedLinks = Set.intersect params.linksOnGoal params.linksOnTitle
  in { occurrencesOfGoalOnText=occurrences, sharedLinksWithGoal=sharedLinks}

calculateBias : ArticleStats -> Float
calculateBias {occurrencesOfGoalOnText, sharedLinksWithGoal} =
  toFloat occurrencesOfGoalOnText * titleOccurrenceWeight
  + toFloat (Set.size sharedLinksWithGoal) * sharedLinkWeight

gatherLinkStats :
  { link : Link
  , goal : Article
  } -> LinkStats
gatherLinkStats {link, goal} =
  let occurrences = countTitleOccurrences link.title goal.wikitext

      overlapAmount sub str =
        if String.contains (String.toLower sub) (String.toLower str) then
          List.length (String.words sub)
        else 0

      overlap =
        let (t,_) = splitDisamb link.title
            (g,_) = splitDisamb goal.title
        in
        if String.length t > 5 && String.length g > 5 then
          max (overlapAmount t g) (overlapAmount g t)
        else 0
  in
  { parentStats=link.parentStats
  , occurrencesOnGoalText=occurrences
  , titleOverlap=overlap
  }

calculatePriority : LinkStats -> Float
calculatePriority stats =
  calculateBias stats.parentStats
  + toFloat stats.occurrencesOnGoalText * titleOccurrenceWeight
  + toFloat stats.titleOverlap * 50

countOccurrences : String -> String -> Int
countOccurrences target content =
  let
    targetRegex =
      target
        |> escapeForRegex
        |> \t -> "\\b" ++ t ++ "\\b"
        |> Regex.fromStringWith { caseInsensitive = True, multiline = False }
        |> Maybe.withDefault Regex.never
  in
  Regex.find targetRegex content
      |> List.length


escapeForRegex : String -> String
escapeForRegex value =
  let
    specialCharacters =
        "[.*+?^${}()|[\\]\\\\]"
            |> Regex.fromString
            |> Maybe.withDefault Regex.never

    escape match =
        "\\" ++ match
  in
  Regex.replace specialCharacters (.match >> escape) value

{-| if the given title is long/unique enough, count its occurrences on some html
-}
countTitleOccurrences : Title -> String -> Int
countTitleOccurrences title text =
  let
    (base, disamb) = splitDisamb title
    target = base

    disambOccurrences = case disamb of
      Just tag -> countOccurrences tag text
      Nothing -> 0

    dontCountOccurrences =
          String.length base < 6 -- title should be distinct enough so that we don't get a lot of false positives
          || (Maybe.Extra.isJust disamb && disamb /= Just "disambiguation" && disambOccurrences == 0)
    
  in if dontCountOccurrences then 0 else countOccurrences target text


-- rather than getHTML we should get the wikitext since it is smaller
getTextOfLink : Title -> Cmd Msg
getTextOfLink link = Cmd.map
  (\result -> GotContentOfLink {requestedTitle=link, result=result})
  (PageFetch.getWikiText link)

{-| initialize the pathfinder with the links on the start page
-}
initPathFinder : {start : Article, goal : Article, pendingRequestLimit : Int, totalRequestLimit : Int}
  -> PathFinderState
initPathFinder {start, goal, pendingRequestLimit, totalRequestLimit} =
  { goal=goal
  , linksOnGoal=getLinksOnWikiText goal.wikitext |> Set.fromList
  , visited=Set.empty
  , linksToFetch=emptyPQ
  , totalRequests=0
  , totalRequestLimit=totalRequestLimit
  , linksToInspect=Deque.empty
  , pendingRequestLimit=pendingRequestLimit
  , pendingRequests=Dict.empty
  , verbose=False
  } |> processArticle (initLeg start.title goal.title) start


{-| initiate the ai pathfinder to connect two wikipedia articles
-}
pathFind : Title -> Title -> (Model, Cmd Msg)
pathFind start goal =
  ( WaitingOnDestinationContent {start=Left start, goal=Left goal}
  , Cmd.batch [ getTextOfLink start, getTextOfLink goal]
  )

workToBeDone : Model -> Bool
workToBeDone model = case model of
  Working state -> (not <| exhausted state) || readyToFetch state
  _ -> False

exhausted : PathFinderState -> Bool
exhausted state = Deque.isEmpty state.linksToInspect
  && PQ.isEmpty state.linksToFetch

waitingOnRequests : PathFinderState -> Bool
waitingOnRequests state = not <| Dict.isEmpty state.pendingRequests

{-| how many total requests are left
-}
requestsLeft : PathFinderState -> Int
requestsLeft {totalRequestLimit, totalRequests} =
  totalRequestLimit - totalRequests |> Basics.Extra.atLeast 0

requestLimitReached : PathFinderState -> Bool
requestLimitReached state = requestsLeft state <= 0

{-| how many requests could i make right now
-}
requestsAvailableToMake : PathFinderState -> Int
requestsAvailableToMake state = state.pendingRequestLimit - Dict.size state.pendingRequests
  |> Basics.Extra.atMost (requestsLeft state)

{-| pop the most promising paths to continue and fetch the html for their next pages
-}
makeRequests : PathFinderState -> (PathFinderState, Cmd Msg)
makeRequests state =
  let
    numRequests = requestsAvailableToMake state
    (pagesToFetch, remainingLinks) = dequeue numRequests state.linksToFetch
    logLinks = List.map Log.info
          <| List.map fetchLinkToString
          <| Tuple.first
          <| dequeue 10 state.linksToFetch
    
  in
    ( { state
      | linksToFetch=prune 10 remainingLinks
      , totalRequests=List.length pagesToFetch + state.totalRequests
      , pendingRequests=List.foldl
        (\link -> Dict.insert (titleOf link) link)
        state.pendingRequests
        pagesToFetch
      } 
    , let pages = List.map titleOf pagesToFetch in
      Cmd.batch
        [ (Log.info <| "Pathfinder requesting articles " ++ String.join ", " pages)
        , Cmd.batch (List.map getTextOfLink pages)
        , if state.verbose then Cmd.batch logLinks else Cmd.none
        ]
    )

{-| inspect the next link, estimate its priority, push it to the queue
-}
processLink : Link -> PathFinderState -> PathFinderState
processLink lead state = 
    let
      stats = gatherLinkStats {link=lead, goal=state.goal}
      priority =
        if lead.title == state.goal.title then Basics.Extra.maxSafeInteger
        else if isTroubleTitle lead.title then 0
        else calculatePriority stats
    in 
    { state
    -- queue up this link, so we can fetch its HTML later
    | linksToFetch=PQ.insert
        ( LinkToFetch
          { title=lead.title
          , resolvedPath=lead.resolvedPath
          , stats=stats
          , priority=priority
          , parent=lead.parent.title
          }
        )
        state.linksToFetch
    }

{-| check if the article is the goal page, in which case return the completed route
  otherwise read the page's links, and calculate the base priority of the page

-}
processArticle : IncompleteLeg -> Article -> PathFinderState -> PathFinderState
processArticle route page state =
  let
    linksOnArticle = getLinksOnWikiText page.wikitext
    linkSet = Set.fromList linksOnArticle
    visitedTitleSet = Set.insert page.title state.visited
    shouldFollow link = (not <| Set.member link visitedTitleSet)
      && isArticleNamespace link

    articleStats = gatherArticleStats
      { titleText=page.wikitext
      , goal=state.goal.title
      , linksOnGoal=state.linksOnGoal
      , linksOnTitle=linkSet
      }

  in
  {state
  | visited=Set.union linkSet visitedTitleSet
  , linksToInspect=List.foldr
      (\link -> 
        if shouldFollow link then Deque.pushBack
          {title=link, resolvedPath=route, parent=page, parentStats=articleStats}
        else identity
      )
      state.linksToInspect
      (List.Extra.unique linksOnArticle)
  }


{-| pop the first n elements from the deque
-}
popTake : Int -> Deque a -> (List a, Deque a)
popTake num deque =
  if num <= 0 then ([], deque)
  else case Deque.popFront deque of
    (Just item, rest) -> popTake (num - 1) rest |> Tuple.mapFirst ((::) item)
    _ -> ([], deque)

{-| work on processing found links,
  and make requests to the best links found currently
-}
work : Int -> Model -> (Model, Cmd Msg)
work steps model = case model of
  Working state ->
    if requestLimitReached state && not (waitingOnRequests state) then
      (Done RequestLimitReached, Log.info "Pathfinder request limit reached")
    else if exhausted state && not (waitingOnRequests state) then
      (Done Stuck, Log.info "Pathfinder stuck!")
    else
    let
      (linksToProcess, linksLeftOver) = popTake steps state.linksToInspect
      processed = List.foldl processLink { state | linksToInspect=linksLeftOver } linksToProcess
    in
    if readyToFetch processed then
      makeRequests processed |> Tuple.mapFirst Working
    else
      (Working processed, Cmd.none)
  
  _ -> (model, Cmd.none)


{-| store any received articles to inspect later,
    make fetch requests by pulling from the priority queue of links to follow
-}
update : Msg -> Model -> (Model, Maybe (Either IncompleteLeg CompleteLeg), Cmd msg)
-- TODO change to Msg -> Model -> (Model, Maybe (Either IncompleteLeg Terminal), Cmd msg)
update (GotContentOfLink {requestedTitle, result}) model =
    let doNothing = (model, Nothing, Cmd.none)
    in case model of
    -- first check if the received data is stale or not, ignore if it is.
    -- otherwise report the resulting route
      Working state -> case Dict.get requestedTitle state.pendingRequests of
        Nothing -> doNothing
        Just (LinkToFetch {resolvedPath}) -> case result of
          Ok page -> case updateLeg page.title resolvedPath of
            -- the fetched article completes the path!
            Right finishedLeg -> (Done Finished, Just <| Right finishedLeg, Cmd.none)
            -- the fetched article does not complete the path, so process the links on it
            Left incompleteLeg ->
              let
                processed = processArticle incompleteLeg page
                  { state | pendingRequests=Dict.remove requestedTitle state.pendingRequests}
              
              in (Working processed, Just <| Left incompleteLeg, Cmd.none)

          Err err ->
            ( Working { state | pendingRequests=Dict.remove requestedTitle state.pendingRequests}
            , Nothing
            , Log.error (String.concat ["Pathfinder failed to fetch title ", requestedTitle, ": ", err])
            )
      
      -- before pathfinding, we fetch the articles for the start and goal page
      WaitingOnDestinationContent params ->
        let default err =
              ( Done Stuck
              , Nothing
              , Log.error <| String.concat
                [ "Pathfinder failed to load destination "
                , requestedTitle, ": ", err
                ]
              )
            
            place page =
              if params.goal == Left requestedTitle then { params | goal=Right page }
              else if params.start == Left requestedTitle then { params | start=Right page }
              else params
            
        in case result of
          Ok page ->
            let set = place page
            in case (set.start, set.goal) of
              (Right start, Right goal) ->
                ( Working <| initPathFinder {start=start, goal=goal, totalRequestLimit=20, pendingRequestLimit=1}
                , Nothing
                , Log.info <| String.concat ["starting pathfinder to connect ", start.title, " -> ", goal.title]
                )
              
              (start, goal) -> -- still waiting on start or goal article
                (WaitingOnDestinationContent set, Nothing, Cmd.none)
          Err err -> default err

      Done _ -> doNothing
        

splitDisamb : Title -> (Title, Maybe String)
splitDisamb title =
  let pattern = Maybe.withDefault Regex.never
        <| Regex.fromString "(.+) \\((.+)\\)"
      match = Regex.find pattern title
        |> List.head
        |> Maybe.map .submatches
  in case match of
    Just (Just base :: disamb :: _) -> (base, disamb)
    _ -> (title, Nothing)
    
{-| drop an internal reference
-}
dropInternalHref : Title -> Title
dropInternalHref title = case String.split "#" title of
  t :: _ -> String.trim t
  _ -> title

{-| some links are bad to follow, so ignore them
-}
isTroubleTitle : Title -> Bool
isTroubleTitle title =
  let
    (baseTitle, disamb) = splitDisamb title

    tooShort =
        String.length baseTitle <= 1

    isBlacklisted =
        List.member (String.toLower baseTitle)
        <| List.map String.toLower
            [ "ISBN"
            , "ISSN"
            , "OCLC"
            , "DOI"
            , "Identifier"
            , "International Standard Book Number"
            , "International Standard Serial Number"
            , "Digital object identifier"
            , "PubMed"
            , "JSTOR"
            , "Bibcode"
            , "Wayback Machine"
            , "Virtual International Authority File"
            , "Integrated Authority File"
            , "Geographic coordinate system"
            , "Google"
            , "United States"
            , "Cambridge"
            ]

    blacklistedDisamb = List.member disamb <|
      List.map Just ["journal", "magazine"]

  in tooShort || isBlacklisted || blacklistedDisamb


getLinksOnWikiText : String -> List Title
getLinksOnWikiText wikitext =
  let pattern = Maybe.withDefault Regex.never
        <| Regex.fromString "\\[\\[([^\\]]+)\\]\\]"
      
      dropPipe opt = case String.split "|" opt of
        title :: _ -> title
        _ -> opt

      capitalize str = case String.uncons str of
        Just (head, tail) -> String.cons (Char.toUpper head) tail
        _ -> str
  in
  Regex.find pattern wikitext
  |> List.filterMap (.submatches >> Maybe.Extra.orList)
  |> List.map (dropPipe >> dropInternalHref >> capitalize) 
  |> List.filter isArticleNamespace


