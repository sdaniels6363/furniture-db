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
import { ToastContainer, Flip, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./styles/Toast.css";



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
  updateClientItemList,
  notify
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
        <ToastContainer transition={Flip}/>
        <Switch>
          <Route exact path="/" component={About} />
          <Route exact path="/about" component={About} />
          <Route exact path="/selected-items" component={SelectedItems} />
          <Route exact path="/clients" component={Clients} />
          <Route
            exact
            path="/tackboard"
            render={props => (
              <Tackboard
                {...props}
                client={selectedClient}
                clientItems={selectedClientTackboard}
                updateItemsCB={updateClientItemList}
              />
            )}
          />
          <Route
            exact
            path="/:room/:category" // sets the path for a specific room/category combo
            render={props => (
              <Items 
                {...props} 
                toastCB={notify} // callback function for toast notification
              />
            )}
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
    loggedIn: false, // set to false by default, leaving as true for dev.
    selectedClient: "",
    selectedClientTackboard: []
  };

  componentDidMount() {
    //First, check if there is a token/verify token.  loadClientItems/loadSelectClient will run once a token is determined to exist or not.
    this.checkToken();
  }

  loadSelectedClient = () => {
    let client = sessionStorage.getItem("selectedClient") || "-Please select a client-";
    this.setState({ selectedClient: client }); // update the state.
    setTimeout(() => {
      document.querySelector("#current-client").value = client;
    }, 100);
  };

  loadClientItems = () => {
    let client = sessionStorage.getItem("selectedClient");

    if (
      window.location.pathname === "/tackboard" &&
      (!client || client === "-Please select a client-")
    ) {
      // only throws the alert if the user is on the tackboard and hasn't selected a client yet.
      alert("Please Select a Client");
      return;
    }
    API.getClientItems({ client: client })
      .then(res => {
        this.setState({ selectedClientTackboard: res.data });
      })
      .catch(err => console.log(err));
  };

  // toast popup
  notify = (message) => toast.info(message,{
    className: 'custom-toast'
  })

  clientUpdateCB = () => {
    this.loadSelectedClient();
  };

  updateClientListTackboardCB = () => {
    this.loadClientItems();
  };

  //Check session token, and set up the rest of the page.
  checkToken = () => {
    //Check if token exists in sessionStorage.
    if (!sessionStorage.token) {
      //Set loggedIn state to false
      this.setState({
        loggedIn: false
      });
    } else {
      //Make an API call, passing the token.  This will verify the token, then, verify the data passed in the token.
      API.verifyToken(sessionStorage.token).then(res => {
        //If response is Token Verified, then load the other functions for CatNav
        if (res.data === "Token Verified!") {
          this.setState({
            loggedIn: true
          });
          this.loadSelectedClient();
          this.loadClientItems();
        }else{
          //Token fails verification
          this.setState({
            loggedIn: false
          });
          sessionStorage.removeItem("token");
          window.location.href = "/"
        }
      });
    }
  }

  render() {
    if (this.state.loggedIn) {
      // if logged in
      return authenticatedPages(
        this.state.selectedClient,
        this.clientUpdateCB,
        this.state.selectedClientTackboard,
        this.updateClientListTackboardCB,
        this.loadClientItems,
        this.notify
      );
    } else {
      return unauthenticatedPages();
    }
  }
}

export default App;
