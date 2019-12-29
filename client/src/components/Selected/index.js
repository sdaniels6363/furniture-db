import React from "react";
import "../../styles/Selected.css";

class Selected extends React.Component {
    render() {
        return (

            // This component will pull in all items selected for the client and create the horizontal cards for display.

            <div>
                <div className="row">
                    <div className="col-md">

                        <div className="card mb-3" id="sel-card">
                            <div className="row no-gutters">
                                <div className="col-sm-3">
                                    <img src="https://lexington.com/feedcache/productLarge/LL7958_44_Q" className="card-img" id="my-card-img" alt="..." />
                                </div>
                                <div className="col-sm-6">
                                    <div className="card-body">
                                        <p id="sel-card-text" className="card-text">Vendor: Lexington</p>
                                        <p id="sel-card-text" className="card-text">Description: Bahia Leather Ottoman</p>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="card-body">
                                        <p id="sel-card-text" className="card-text">SKU:</p>
                                        <p id="sel-card-text" className="card-text">URL: Link</p>
                                        <p id="sel-card-text" className="card-text">Tearsheet: Link</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Selected;