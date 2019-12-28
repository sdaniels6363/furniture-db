import React from "react";
import "../../styles/Clients.css";
import API from "../../utils/API";

class SelectClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.deleteClient = this.deleteClient.bind(this);
  }

  handleChange(event) {
    this.setState({ selected: event.target.value });
  }

  deleteClient(event) {
    event.preventDefault();
    const body = { id: this.state.selected };
    API.deleteClient(body).then((res, err) => {
      if (err) {
        console.log(err);
      }
      console.log(res);
    });
  }

  componentDidMount() {
    // when the component mounts automatically define the first entry as the selected entry in state
    API.getClients().then(res => {
      if (res.data.length === 0) {
        this.setState({
          selected: [],
        });
      } else {
        let clients = res.data.sort((a, b) => a.name.localeCompare(b.name));
        let firstEntry = clients[0]
        this.setState({
          selected: firstEntry._id
        });

      }
    });
  }

  render() {
    return (
      <div>
        <h4 id="client-card-text" className="top-spacer">
          Select Client
        </h4>
        <div className="input-group" id="client-select-dropdown">
          <select
            value={this.state.selected}
            onChange={this.handleChange}
            className="form-control"
          >
            {this.props.clients.map(client => {
              return (
                <option key={client.name} value={client._id}>
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
