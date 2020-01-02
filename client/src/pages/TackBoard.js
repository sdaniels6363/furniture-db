import React, { Component } from "react";
import "../styles/TacBoard.css";
import ItemCard from "../components/ItemCard";

class TackBoard extends Component {
    render() {
        return (

            // This component will pull in all items selected for the client and create the horizontal cards for display.

            <div>
                <div className="row">
                    <div className="col-md">

                        <div className="tackboard-container1">
                        <ItemCard

                          />
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default TackBoard;