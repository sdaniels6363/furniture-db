import React from "react";
import "../../styles/Selected.css";

class Selected extends React.Component {
    render() {
        return (
            <div>

                <h4 id="client-card-text" className="top-spacer">Select Client</h4>
                <div className="form-group">
                    <select className="form-control" id="exampleFormControlSelect1">
                        <option>Existing</option>
                        <option>clients</option>
                        <option>from</option>
                        <option>db</option>
                        <option>go</option>
                        <option>here</option>
                    </select>
                </div>

            </div>
        )
    }
}

export default Selected;