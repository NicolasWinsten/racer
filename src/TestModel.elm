module TestModel exposing (..)
import Types exposing (..)
import Helpers exposing (..)
import List.Extra
import WikiGraph
import Either exposing (Either(..))


mkDummyPreview title = {title=title, thumbnail=Nothing, description=Nothing, shortdescription=Nothing}

start = "Marine propulsion"
goal = "Battle of Wagram"
destinations = DestinationList
  (mkDummyPreview start)
  (mkDummyPreview goal)
  []

legs =
  [ Left <| Incomplete {start=start, steps=[], goal=goal}
  , Left <| Incomplete {start=start, steps=["Russia"], goal=goal}
  , Left <| Incomplete {start=start, steps=["Russia", "Heat pump"], goal=goal}
  ]


mkLegIntoPath leg = initPath (getStart leg) (getGoal leg) []
  |> updatePathWithLeg leg

graph = List.foldl (\leg g -> WikiGraph.update "computer" (mkLegIntoPath leg) 10 g) (WikiGraph.init destinations) legs