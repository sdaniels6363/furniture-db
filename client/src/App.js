import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CatNav from "./components/CatNav"
import About from "./pages/About";
import Clients from "./pages/Clients";
import Items from "./pages/Items";
import Header from "./components/Header";
import SelectedItems from "./pages/SelectedItems";
// import Footer from "./components/Footer";


function App() {
  return (
    <Router>
      <div>
        <Header />
        <CatNav />
        <Switch>
          <Route exact path="/" component={About} />
          <Route exact path="/about" component={About} />
          <Route exact path="/clients" component={Clients} />
          <Route exact path="/selected-items" component={SelectedItems} />
          <Route exact path="/category/:item" render={(props) => <Items {...props} />} />
        </Switch>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
