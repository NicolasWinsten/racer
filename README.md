
### Wikipedia Game

This is a toy project I made while learning Elm.

This game is a peer-to-peer ([PeerJS](https://peerjs.com/)) version of the [WikiGame](https://en.wikipedia.org/wiki/Wikipedia:Wiki_Game) you can play with your friends.

Play the game [here](https://nicolaswinsten.github.io/racer).

If there's something not working or you want to tell me why my code is bad, please make an issue

# Roadmap

- [X] Real-time graph viz of the player's wikipaths in the post-game review
- [x] Display the other players that are on the page with you (and were there) 
- [] Computer pathfinder in background to display in post-game review
- [] Serialized trie of the title pool to reduce payload & memory consumption
- [] Track total pages visited and total number of link clicks
- [X] Display table of contents for easier page navigation
- [] Display collapsible table of contents
- [] Send P2P message on give up
- [] add ElmUI snackbar for errors, other messages

# Bugs
- Late-joining players will have out-of-sync wikigraphs (solution: either disallow late-joiners or send the whole wikigraph to new player in gamestate info)