import React from "react";
import "../../styles/Clients.css";

class SelectClient extends React.Component {
    render() {
        return (
            <div>

                <h4 id="client-card-text" className="top-spacer">Select Client</h4>
                {/* <div className="card" id="client-card"> */}
                {/* <div className="card-body"> */}
                <div className="form-group">
                    {/* <label for="exampleFormControlSelect1">Example select</label> */}
                    <select className="form-control" id="exampleFormControlSelect1">
                        <option>Existing</option>
                        <option>clients</option>
                        <option>from</option>
                        <option>db</option>
                        <option>go</option>
                        <option>here</option>
                    </select>
                </div>
                {/* </div> */}

                {/* </div> */}

                {/* <p id="client-card-text">Recent Clients</p> */}
            </div>


          
        )
    }
}

export default SelectClient;