import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CatNav from "./components/CatNav";
import About from "./pages/About";
import Clients from "./pages/Clients";
import Items from "./pages/Items";
import Header from "./components/Header";
import SelectedItems from "./pages/SelectedItems";
import Form from "./components/Form";
// import Footer from "./components/Footer";

import Login from "./pages/Login";
import NewUser from "./pages/NewUser";

class App extends Component {
  state = {
    loggedIn: false
  };


  render() {
    return (
      <Router>
        <div>
          <Header />
          <CatNav />
          <Switch>
            <Route exact path="/" component={About} />
            <Route exact path="/about" component={About} />
            <Route exact path="/selected-items" component={SelectedItems} />
            <Route exact path="/clients" component={Clients} />
            <Route
              exact
              path="/category/:item"
              render={props => <Items {...props} />}
            />
            <Route exact path="/register" component={NewUser} />
            <Route exact path="/login" component={Form} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
