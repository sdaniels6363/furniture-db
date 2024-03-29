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
                            <Selected />

                            {/* The "selected" component will be listed here only once. This is for demonstration purposes only. */}
                            <Selected />
                            <Selected />
                            <Selected />
                            <Selected />
                            <Selected />
                            <Selected />
                </div>
            </div>
        )
    }
}

export default SelectedItems;