module TestModel exposing (..)
import Types exposing (..)
import Helpers exposing (..)
import List.Extra
import WikiGraph

players = ["john", "bart", "hugh"]

colors = List.foldl (\p cs -> generateColorForNewPlayer cs (strToSeed p) :: cs) [] players


destinations = [
  {title="goal1", thumbnail=Nothing, description=Nothing, shortdescription=Nothing},
  {title="goal2", thumbnail=Nothing, description=Nothing, shortdescription=Nothing},
  {title="goal3", thumbnail=Nothing, description=Nothing, shortdescription=Nothing},
  {title="goal4", thumbnail=Nothing, description=Nothing, shortdescription=Nothing}
]


mkPlayers = List.Extra.zip players colors
  |> List.map
    (\(name, color) ->
      { name=name
      , color=color
      , gameState=initialGameState (List.map .title destinations)
      , connected=True
      }
    )

initialWikigraph = WikiGraph.init destinations