import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CatNav from "./components/CatNav"
import About from "./pages/About";
import Items from "./pages/Items";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import NewUser from "./pages/NewUser";

class App extends Component {
  state = {
    loggedIn: false
  }

  return (
    <Router>
      <div>
        <Header />
        <CatNav />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/about" component={About} />
          <Route exact path="/category/:item" render={(props) => <Items {...props} />} />
          <Route exact path="/register" component={NewUser} />
          <Route exact path="/login" component={Login} />
        </Switch>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
