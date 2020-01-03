import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CatNav from "./components/CatNav";
import About from "./pages/About";
import Clients from "./pages/Clients";
import Items from "./pages/Items";
import Header from "./components/Header";
import SelectedItems from "./pages/SelectedItems";
import Tackboard from "./pages/TackBoard";
import NewUser from "./pages/NewUser";
// import Unauthorized from "./pages/Unauthorized"; // uncomment this later
import FourOhFour from "./pages/FourOhFour"; // default 404 page.
import API from "./utils/API";



function unauthenticatedPages() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={About} />
          <Route exact path="/about" component={About} />
          <Route component={FourOhFour} />
        </Switch>
      </div>
    </Router>
  );
}

function authenticatedPages(
  selectedClient,
  clientUpdateCB,
  selectedClientTackboard,
  updateClientListTackboardCB,
  updateClientItemList
) {
  return (
    <Router>
      <div>
        <Header />
        <CatNav 
          client={selectedClient} 
          updateCb={clientUpdateCB} 
          updateTackboardCB={updateClientListTackboardCB} 
        />
        <Switch>
          <Route exact path="/" component={About} />
          <Route exact path="/about" component={About} />
          <Route exact path="/selected-items" component={SelectedItems} />
          <Route exact path="/clients" component={Clients} />
          <Route
            exact
            path="/tackboard"
            render={props => <Tackboard {...props}
              client={selectedClient}
              clientItems={selectedClientTackboard}
              updateItemsCB={updateClientItemList}
            />}
          />
          <Route
            exact
            path="/category/:item"
            render={props => <Items {...props} />}
          />
          <Route exact path="/register" component={NewUser} />
          <Route component={FourOhFour} />
        </Switch>
      </div>
    </Router>
  );
}

class App extends Component {
  state = {
    loggedIn: true,  // set to false by default, leaving as true for dev.
    selectedClient: "",
    selectedClientTackboard: []
  };

  componentDidMount() {
    this.loadSelectedClient();
    this.loadClientItems();
  }

  loadSelectedClient = () => {
    let client = sessionStorage.getItem("selectedClient")
    this.setState({ selectedClient: client || "-Please select a client-" }) // retrieve selected client from session storage or use default
    setTimeout(() => {
      document.querySelector("#current-client").value = client
    }, 100)
  }


  loadClientItems = () => {
    let client = sessionStorage.getItem("selectedClient");

    if (client === "") {
      alert("Please Select a Client");
      return;
    }
    API.getClientItems({ client: client })
      .then(res => {
        this.setState({ selectedClientTackboard: res.data });
      })
      .catch(err => console.log(err));
  };

  // **** callback functions *****

  clientUpdateCB = () => {
    this.loadSelectedClient()
  }

  updateClientListTackboardCB = () => {
    this.loadClientItems();
  }

  render() {
    if (this.state.loggedIn) {
      // if logged in
      return authenticatedPages(
        this.state.selectedClient,
        this.clientUpdateCB,
        this.state.selectedClientTackboard,
        this.updateClientListTackboardCB,
        this.loadClientItems
      );
    } else {
      return unauthenticatedPages();
    }

  }
}

export default App;
