import React from "react";
import "../../styles/Clients.css";

class RecentClients extends React.Component {
    render() {
        return (
            <div>

                <h4 id="client-card-text">Recent Clients</h4>
                <div className="card" id="client-card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md">
                                <button type="button" class="btn btn-light btn-block">Recent Client 1</button>
                            </div>
                            <div className="col-md">
                                <button type="button" class="btn btn-light btn-block">Recent Client 2</button>
                            </div>
                            <div className="col-md">
                                <button type="button" class="btn btn-light btn-block">Recent Client 3</button>
                            </div>
                        </div>
                        <div className="row" id="recent-row">
                            <div className="col-md">
                                <button type="button" class="btn btn-light btn-block" id="recent-btn">Recent Client 4</button>
                            </div>
                            <div className="col-md">
                                <button type="button" class="btn btn-light btn-block" id="recent-btn">Recent Client 5</button>
                            </div>
                            <div className="col-md">
                                <button type="button" class="btn btn-light btn-block" id="recent-btn">Recent Client 6</button>
                            </div>
                        </div>
                        <div className="row" id="recent-row">
                            <div className="col-md">
                                <button type="button" class="btn btn-light btn-block" id="recent-btn">Recent Client 7</button>
                            </div>
                            <div className="col-md">
                                <button type="button" class="btn btn-light btn-block" id="recent-btn">Recent Client 8</button>
                            </div>
                            <div className="col-md">
                                <button type="button" class="btn btn-light btn-block" id="recent-btn">Recent Client 9</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default RecentClients;