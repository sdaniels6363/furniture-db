import React, { Component } from "react";
import RecentClients from "../components/RecentClients";
import AddClient from "../components/AddClient";
import SelectClient from "../components/SelectClient";
import API from "../utils/API"

class Clients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: []
        };
    }


    componentDidMount() {
        // when the component mounts, fetch all clients and sort them by alphabetical order
        this.fetchClients();
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
            <div>
                <div className="container" id="client-container">
                    <div className="row">
                        <div className="col-md">
                            <h1 id="client-card-title">Clients</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md">
                            <RecentClients />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md">
                            <AddClient
                                cb={this.selectClientCB}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md">
                            <SelectClient
                                clients={this.state.clients}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Clients;
