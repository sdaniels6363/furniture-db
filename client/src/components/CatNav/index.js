import React, { Component } from "react";
import API from "../../utils/API";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "../../styles/CatNav.css";

class CatNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      clients: [],
      rooms: []
    }

    this.updatesessionStorage = this.updatesessionStorage.bind(this);

  }


  updatesessionStorage = () => {
    let client = document.querySelector("#current-client").value;
    sessionStorage.setItem("selectedClient", client);
    // sends callback to update clientItemsList
    this.props.updateTackboardCB();
  }


  componentDidMount() {
    this.fetchClients();
    this.getRooms();
  }


  getRooms = () => {
    API.getRooms()
      .then(res => {
        let data = res.data.sort()
        // console.log(res.data);
        this.setState({
          rooms: data
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

      <nav className="navbar navbar-expand-lg" id="catNavBar">

        {/* All navigation links with the exception of the About page are derived from a database call.
        Which occurs via the getCategories function.
        This will allow us to load links dynamically based on the category of furniture in the database. */}

        {/* {this.state.categories.map((category, i) => {
          return (
            <a
              key={i}
              className="navbar-brand"
              href={`/category/${category}`}>
              {category.toUpperCase()}
            </a>
          );
        })} */}

        {/* All navigation links with the exception of the About page are derived from a database call.
        Which occurs via the getRooms function.
        This will allow us to load links dynamically based on the rooms in the database. */}

        {/* New CatNav menu creation to hadle both rooms and categories for each room. */}
        {this.state.rooms.map((room, i) => {
          return (<>
            <DropdownButton title={room.name.toUpperCase()} className="roomMenu">
              {room.categories.map((category, j) => {
                return (
                  <Dropdown.Item href={`/${room.name}/${category}`} className="categoryMenu">
                    {category.toUpperCase()}
                  </Dropdown.Item>
                )
              })}
            </DropdownButton>
          </>
          )
        })}

        <div className="admin-controls-client">
          <select className="my-select" name="clients" id="current-client" onChange={this.updatesessionStorage}>
            <option className="my-option" value="-Please select a client-">-Please select a client-</option>
            {/* <option className="my-option">Clients from db here</option> */}

            {this.state.clients.map((client, j) => {
              return (
                <option
                  className="my-option"
                  key={j}
                  value={[client.name]}>
                  {[client.name]}
                </option>
              );
            })}
          </select>
        </div>

        <div className="admin-controls dropdown">
          <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-bars fa-1x" id="myicon"></i>
          </button>
          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="/about">HOME</a>
            <a className="dropdown-item" href="/clients">CLIENTS</a>
            <a className="dropdown-item" href="/tackboard">TACKBOARD</a>
            {/* <a className="dropdown-item" href="#">CHANGE PASSWORD</a> */}
            {/* <a className="dropdown-item" href="#">LOGOUT</a> */}
          </div>
        </div>
      </nav >
    );
  }
}

export default CatNav;
