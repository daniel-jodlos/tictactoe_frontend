import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Nav } from "./Nav";
import Home from './pages/InitGame'
import {StateProvider} from './contexts/all_context'

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
        </Switch>
      </div>
      </Router>
    </StateProvider>
  );
}
