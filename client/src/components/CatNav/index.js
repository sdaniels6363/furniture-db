import React, { Component } from "react";
import API from "../../utils/API";
import "../../styles/CatNav.css";

class CatNav extends Component {
  state = {
    categories: [],
    clients: []
  };

  componentDidMount() {
    this.getCategories();
    this.fetchClients();
  }

  getCategories = () => {
    API.getCategories()
      .then(res => {
        let data = res.data.sort()
        // console.log(res.data);
        this.setState({
          categories: data
        });
      })
      .catch(err => console.log(err));
  }

  fetchClients = () => {
    API.getClients().then(res => {
      if (res.data.length === 0) {
        this.setState({
          clients: [],
        });
      } else {
        let clients = res.data.sort((a, b) => a.name.localeCompare(b.name));
        this.setState({
          clients: clients,
        });
      }
    });
  }

  selectClientCB = () => {
    this.fetchClients();
  }

    render() {
      return (
        // <nav className="navbar navbar-expand-lg" id="catNavBar">

        //   All navigation links with the exception of the About page are derived from a database call.
        //   Which occurs via the getCategories function.
        //   This will allow us to load links dynamically based on the category of furniture in the database.

        //   {this.state.categories.map((category,i) => {
        //     return (
        //       <a 
        //         key={i}
        //         className="navbar-brand" 
        //         href={`/category/${category}`}>
        //         {category.toUpperCase()}
        //       </a>
        //     );
        //   })}
        //   <div className="admin-controls">
        //     <a className="navbar-brand" href="/clients">CLIENTS</a>
        //     <a className="navbar-brand" href="/about">ABOUT</a>
        //   </div>
        // </nav>

        <nav className="navbar navbar-expand-lg" id="catNavBar">

          {/* All navigation links with the exception of the About page are derived from a database call.
        Which occurs via the getCategories function.
        This will allow us to load links dynamically based on the category of furniture in the database. */}

          {this.state.categories.map((category, i) => {
            return (
              <a
                key={i}
                className="navbar-brand"
                href={`/category/${category}`}>
                {category.toUpperCase()}
              </a>
            );
          })}
          {/* <div className="admin-controls-client dropdown">
          <button className="dropdown-toggle" type="button" id="client-selector" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Select Client</button>
          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="client-selector">

            <a className="dropdown-item" id="current-client">Client list goes here</a>

          </div>
        </div> */}

          <div className="admin-controls-client">
            <select className="my-select" name="clients" id="current-client">
              <option className="my-option" value="">-Please select a client-</option>
              {/* <option className="my-option">Clients from db here</option> */}

              {this.state.clients.map((client, j) => {
                return (
                  <option 
                  className="my-option"
                  key={j}>
                    {[client.name]}
                  </option>
                );
              })}

              {/* <option className="my-option">Clients from db here</option> */}
            </select>
          </div>


          <div className="admin-controls dropdown">
            <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="fas fa-bars fa-1x" id="myicon"></i>
            </button>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="/clients">CLIENTS</a>
              <a className="dropdown-item" href="#">CHANGE PASSWORD</a>
              <a className="dropdown-item" href="/about">ABOUT</a>
              <a className="dropdown-item" href="#">LOGOUT</a>
            </div>
          </div>
        </nav>
      );
    }
  }

  export default CatNav;
