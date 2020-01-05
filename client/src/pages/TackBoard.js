import React, { Component } from "react";
import "../styles/TacBoard.css";
import ItemCard from "../components/ItemCard";
import makePDF from "../components/DocDef"

class TackBoard extends Component {

  updateClientItemsCb = () => {
    // used to update the client items when one is deleted.
    this.props.updateItemsCB();
  }

  // All information for the Tackboard for the client list and selected client is passed
  // via props, from the App.js file, that's where the functions that existed here, were
  // relocated to.

  makePDF(data, client){
    makePDF(data, client);
  }

  render() {
    return (
      // This component will pull in all items selected for the client and create the horizontal cards for display.

      <div>
        <div className="row">
          <div className="col-md">
            <div className="tackboard-container1">
              <div className="row">
                <div className="col">
                  <button onClick={e => this.makePDF(this.props.clientItems, this.props.client)}>Create PDF</button>
                </div>
              </div>
              {this.props.clientItems.length === 0 ? (
                <div className="h3-wrapper">
                <h3 className="my-h3">Please select some items.</h3> 
                </div> // temp need to add a nicer placeholder
              ) : (
                  this.props.clientItems.map((itemList, i) => {
                    return (
                      <ItemCard
                        key={i}
                        updateClientItemsCb={this.updateClientItemsCb}
                        _id={itemList._id}
                        vendor={itemList.item.vendor}
                        description={itemList.item.description}
                        image={itemList.item.image}
                        sku={itemList.item.sku}
                        url={itemList.item.url}
                        tearsheet={itemList.item.tearsheet}
                      />
                    );
                  })
                )}
              ;
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TackBoard;
