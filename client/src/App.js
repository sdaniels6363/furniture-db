import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CatNav from "./components/CatNav";
import About from "./pages/About";
import Clients from "./pages/Clients";
import Items from "./pages/Items";
import Header from "./components/Header";
<<<<<<< HEAD
import Form from "./components/Form";
// import Footer from "./components/Footer";
=======
import Login from "./pages/Login";
import NewUser from "./pages/NewUser";
>>>>>>> b413ceefdaea4078d1a16fb76c3b2fed660ce609

class App extends Component {
  state = {
    loggedIn: false
  };

<<<<<<< HEAD
function App() {
  return (
    <Router>
      <div>
        <Header />
        <CatNav />
        <Switch>
          <Route exact path="/" component={About} />
          <Route exact path="/about" component={About} />
          <Route exact path="/login" component={Form} />
          <Route exact path="/clients" component={Clients} />
          <Route exact path="/category/:item" render={(props) => <Items {...props} />} />
        </Switch>
        {/* <Footer /> */}
      </div>
    </Router>
  );
=======
  render() {
    return (
      <Router>
        <div>
          <Header />
          <CatNav />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/about" component={About} />
            <Route exact path="/clients" component={Clients} />
            <Route
              exact
              path="/category/:item"
              render={props => <Items {...props} />}
            />
            <Route exact path="/register" component={NewUser} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    );
  }
>>>>>>> b413ceefdaea4078d1a16fb76c3b2fed660ce609
}

export default App;
