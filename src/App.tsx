import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Nav } from "./components/Nav";
import CreateGamePage from './pages/CreateGame'
import Home from './pages/Home'
import {StateProvider} from './contexts/all_context'
import JoinGamePage from "./pages/JoinGame";
import Game from "./pages/Game";
import { Container, CssBaseline } from "@material-ui/core";

export default function BasicExample(){
  return (
    <StateProvider>
      <CssBaseline/>
      <Router>
        <div>
          <Nav />

          <Container maxWidth="sm">
            <Switch>
              <Route exact path='/'>
                <Home/>
              </Route>

              <Route exact path="/create">
                <CreateGamePage/>
              </Route>
              
              <Route path="/join/:oid">
                <JoinGamePage />    
              </Route>
              
                <Route path="/game/:id">
                  <Game/>
              </Route>
            </Switch>
          </Container>
        </div>
      </Router>
    </StateProvider>
  );
}
