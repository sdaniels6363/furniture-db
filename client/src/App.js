import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CatNav from "./components/CatNav"
import About from "./pages/About";
import Items from "./pages/Items";
import SearchPage from "./pages/SearchPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import Beds from "./pages/Beds";
// import Benches from "./pages/Benches"
// import Nightstands from "./pages/Nightstands";
// import Mirrors from "./pages/Mirrors";
// import Dressers from "./pages/Dressers";
// import Cabinets from "./pages/Cabinets";

function App() {
  return (
    <Router>
      <div>
        <Header />
        {/* <CatNav /> */}
        <Switch>
          <Route exact path="/" component={About} />
          <Route exact path="/about" component={About} />
          <Route exact path="/category/:item" render={(props) => <Items {...props} />} />
          <Route exact path="/test/category/:item" render={(props) => <SearchPage {...props} />} />
          {/* <Route exact path="/category/beds" component={Beds} />
          <Route exact path="/category/benches" component={Benches} />
          <Route exact path="/category/cabinets" component={Cabinets} />
          <Route exact path="/category/dressers" component={Dressers} />
          <Route exact path="/category/mirrors" component={Mirrors} />
          <Route exact path="/category/nightstands" component={Nightstands} /> */}
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
