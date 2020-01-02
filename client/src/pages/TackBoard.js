import React from "react";
import "../../styles/TacBoard.css";

class TackBoard extends React.Component {
    render() {
        return (

            // This component will pull in all items selected for the client and create the horizontal cards for display.

            <div>
                <div className="row">
                    <div className="col-md">

                        <div className="tackboard-container1">
                            <div className="tackboard-container2" data-vendor={props.vendor}>
                                <img alt={props.description} src={props.image} />
                                <div className="tackboard-description">
                                    <li>Vendor: {props.vendor}</li>
                                    <li className="scrollText">
                                        <span>Description: {props.description}</span>
                                    </li>
                                    <li>SKU: {props.sku}</li>
                                    <li>
                                        URL:{" "}
                                        <a href={props.url} target="_blank" rel="noopener noreferrer">
                                            Link
          </a>
                                    </li>
                                    <li>
                                        Tearsheet:{" "}
                                        <a href={props.tearsheet} target="_blank" rel="noopener noreferrer">
                                            Link
          </a>
                                    </li>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default TackBoard;