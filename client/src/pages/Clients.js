import React, { Component } from "react";
import RecentClients from "../components/RecentClients";
import AddClient from "../components/AddClient";

class Clients extends Component {
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
                            <AddClient />
                </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Clients;
