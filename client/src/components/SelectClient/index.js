import React from "react";
import "../../styles/Clients.css";
import API from "../../utils/API";

class SelectClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            selected: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }

    componentDidMount() {
        API.getClients().then(res => this.setState({ clients: res.data.sort() }));
    }



    render() {
        return (
            <div>

                <h4 id="client-card-text" className="top-spacer">Select Client</h4>
                <div className="form-group">
                    <select value={this.state.selected} className="form-control" id="exampleFormControlSelect1">
                        {this.state.clients.map((client) => {
                            return (
                                <option data-id={client._id}>{client.name}</option>
                            )
                        })}
                    </select>
                    <button className="btn btn-danger">Delete Client</button>
                </div>

            </div>
        )
    }
}

export default SelectClient;