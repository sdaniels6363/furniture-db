import React from "react";
import "../../styles/Clients.css";

class AddClient extends React.Component {
    render() {
        return (
            <div>

                <h4 id="client-card-text" className="top-spacer">Add Client</h4>
                {/* <div className="card" id="client-card"> */}
                    {/* <div className="card-body"> */}
                        <div className="row" id="lr-margin">
                            <div className="input-group ">
                                <input type="text" className="form-control" placeholder="Add a new client" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="button">Submit</button>
                                </div>
                            </div>
                        {/* </div> */}

                    {/* </div> */}

                    {/* <p id="client-card-text">Recent Clients</p> */}
                </div>


            </div>
        )
    }
}

export default AddClient;