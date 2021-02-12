import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Nav } from "./Nav";
import Home from './pages/InitGame'
import {StateProvider} from './contexts/all_context'
import PlayGame from "./pages/PlayGame";
import Game from "./pages/Game";

export default function BasicExample(){
  return (
  <StateProvider>
    <Router>
      <div>
        <Nav />
        <hr />

        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          
          <Route path="/play/:oid">
            <PlayGame />    
          </Route>
          
            <Route path="/game/:id">
              <Game/>
          </Route>
        </Switch>
      </div>
      </Router>
    </StateProvider>
  );
}
