import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CatNav from "./components/CatNav"
import About from "./pages/About";
import Beds from "./pages/Beds";
import Benches from "./pages/Benches"
import Nightstands from "./pages/Nightstands";
import Mirrors from "./pages/Mirrors";
import Dressers from "./pages/Dressers";
import Cabinets from "./pages/Cabinets";

function App() {
  return (
    <Router>
      <div>
        <CatNav />
        <Switch>
          <Route exact path="/" component={About} />
          <Route exact path="/about" component={About} />
          <Route exact path="/category/beds" component={Beds} />
          <Route exact path="/category/benches" component={Benches} />
          <Route exact path="/category/cabinets" component={Cabinets} />
          <Route exact path="/category/dressers" component={Dressers} />
          <Route exact path="/category/mirrors" component={Mirrors} />
          <Route exact path="/category/nightstands" component={Nightstands} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
