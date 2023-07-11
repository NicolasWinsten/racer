
# Wikipedia Game

This is a toy project I made while learning Elm.

This game is a peer-to-peer ([PeerJS](https://peerjs.com/)) version of the [WikiGame](https://en.wikipedia.org/wiki/Wikipedia:Wiki_Game) you can play with your friends.

Play the game [here](https://nicolaswinsten.github.io/racer).

If there's something not working or you want to tell me why my code is bad, please make an issue

### What makes this version different?
A real-time visualization of the player's paths is provided for each game!
![image](https://github.com/NicolasWinsten/racer/assets/56099103/e04aee57-7e81-4faa-adad-beb0a8d88a82)
![image](https://github.com/NicolasWinsten/racer/assets/56099103/90162c18-fddc-4c34-9fef-ffd02c8e56ee)

Additionally, an AI pathfinder will play along side you


### Roadmap

- [X] Real-time graph viz of the player's wikipaths in the post-game review
- [x] Display the other players that are on the page with you (and were there) 
- [X] Computer pathfinder in background to display in post-game review
- [] Serialized trie of the title pool to reduce payload & memory consumption
- [X] Track total pages visited
- [X] Display table of contents for easier page navigation
- [] Display collapsible table of contents
- [] Send P2P message on give up
- [X] add ElmUI snackbar for errors, other messages
- [] Display most obscure pages touched by the players in post game screen
- [] Display X on nodes where players gave up

# Bugs
- Late-joining players will have out-of-sync wikigraphs (solution: either disallow late-joiners or send the whole wikigraph to new player in gamestate info)
