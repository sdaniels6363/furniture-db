import React from "react";
import "../../styles/Clients.css";

class AddClient extends React.Component {
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
                        
                    </div>

                    {/* <p id="client-card-text">Recent Clients</p> */}
                </div>


            </div>
        )
    }
}

export default AddClient;