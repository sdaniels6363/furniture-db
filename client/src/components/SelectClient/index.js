import React from "react";
import "../../styles/Clients.css";
import API from "../../utils/API";

class SelectClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
    };

    this.deleteClient = this.deleteClient.bind(this);
  }

  deleteClient(event) {
    event.preventDefault();
    // Get current selected value of Client dropdown.
    let selected = document.querySelector("select").value;
    // Create object to pass to API to delete client.
    const body = { name: selected };
    API.deleteClient(body)
      .then(res => {
        console.log(res)
        alert(selected + " was deleted")
        //Use the provided callback function to reload the client list from the DB.
        this.props.cb();
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h4 id="client-card-text" className="top-spacer">
          Select Client
        </h4>
        <div className="input-group" id="client-select-dropdown">
          <select
            className="form-control"
          >
            {this.props.clients.map(client => {
              return (
                <option
                  key={client.name}
                  value={client.name}
                >
                  {client.name}
                </option>
              );
            })}
          </select>
          <div className="input-group-append">
            <button className="btn btn-outline-danger" onClick={this.deleteClient}>
              Delete
          </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SelectClient;
