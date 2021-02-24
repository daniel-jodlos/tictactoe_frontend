# About
This repository contains a code for a TicTacToe frontend - a React SPA. It serves as extension of one of my older projects, TicTacToe implementation in C++ that has been modified to communicate with a browser. It operates in a very simple way. Upon entering user creates a new game, and receives URL address that they are expected to share with a person they want to play. Their opponent is expected to open the link and they are joining the game, rest is hopefully self explanatory.

## Technology stack
This repository contains code for a TicTacToe frontend single page application written in React (with react-router and JSS). [Backend](https://github.com/daniel-jodlos/tictactoe_cpp/tree/daniel-jodlos/issue1) is a little unusual - it is websocket only and the API doesn't contain even a single REST route, all communication happens on the websocket. Reasoning behind it is very simple: websocket would have to be setup anyway, so there was no reason not to use it.

As mentioned previously, backend used to be a self sufficient application, so all of the logic is done there - this application is strictly responsible for displaying information, and communicating user actions to the server.

# How to run it?
There is only one requirement for host machine: **npm** has to be installed, preferably version 6 (stable at the time of commit).

Before proceeding with the following steps, please run:
```bash
$ npm install
```

And **set the following environment variables**:
```.env
REACT_APP_DOMAIN=<domain where the app is served>
REACT_APP_WEBSOCKET=<address of the server>
```
If you are unsure how to do that, create `.env` file in a root folder of cloned repository, paste the above block of code and set required values.

*NOTE* Please make sure that REACT_APP_WEBSOCKET address starts with `ws://`

**Don't forget to start the server!** Instructions can be found in [it's repository](https://github.com/daniel-jodlos/tictactoe_cpp/tree/daniel-jodlos/issue1)

## Development mode
To run the app in production environment simply run:
```bash
$ npm run start
```

## Creating production build and deployment
To create production optimized build run
```bash
npm run build
```
New folder *build* will be created, containing production build of the application. Contents of that folder can be served using **any static server**