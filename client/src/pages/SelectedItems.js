import React, { Component } from "react";
import Selected from "../components/Selected";



class SelectedItems extends Component {
    render() {
        return (
            <div>
                <div className="container" id="client-container">
                    <div className="row">
                        <div className="col-md">
                            <h1 id="client-card-title">Selected Items for "client name"</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md">
                            <Selected />
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="col-md">
                            <AddClient />
                        </div>
                    </div> */}
                    {/* <div className="row">
                        <div className="col-md">
                            <SelectClient />
                        </div>
                    </div> */}
                </div>
            </div>
        )
    }
}

export default SelectedItems;