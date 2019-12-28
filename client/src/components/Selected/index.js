import React from "react";
import "../../styles/Selected.css";

class Selected extends React.Component {
    render() {
        return (
            <div>

                <div className="card mb-3" id="sel-card">
                {/* <div className="card mb-3" style="max-width: 90%;"> */}
                    <div className="row no-gutters">
                        <div className="col-sm-3">
                            <img src="https://lexington.com/feedcache/productLarge/LL7958_44_Q" className="card-img" id="my-card-img" alt="..." />
                        </div>
                        <div className="col-sm-6">
                            <div className="card-body">
                                {/* <h5 className="card-title">Card title</h5> */}
                                <p id="sel-card-text" className="card-text">Vendor: Lexington</p>
                                <p id="sel-card-text" className="card-text">Description: Bahia Leather Ottoman</p>
                                {/* <p id="sel-card-text" className="card-text">SKU:</p>
                                <p id="sel-card-text" className="card-text">URL: Link</p>
                                <p id="sel-card-text" className="card-text">Tearsheet: Link</p> */}
                                {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="card-body">
                                {/* <h5 className="card-title">Card title</h5> */}
                                {/* <p id="sel-card-text" className="card-text">Vendor: Lexington</p>
                                <p id="sel-card-text" className="card-text">Description: Bahia Leather Ottoman</p> */}
                                <p id="sel-card-text" className="card-text">SKU:</p>
                                <p id="sel-card-text" className="card-text">URL: Link</p>
                                <p id="sel-card-text" className="card-text">Tearsheet: Link</p>
                                {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
                            </div>
                        </div>

                    </div>
                </div>




                {/* <h4 id="client-card-text" className="top-spacer">Select Client</h4>
                <div className="form-group">
                    <select className="form-control" id="exampleFormControlSelect1">
                        <option>Existing</option>
                        <option>clients</option>
                        <option>from</option>
                        <option>db</option>
                        <option>go</option>
                        <option>here</option>
                    </select>
                </div> */}

            </div>
        )
    }
}

export default Selected;