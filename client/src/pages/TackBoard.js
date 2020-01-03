import React, { Component } from "react";
import "../styles/TacBoard.css";
import ItemCard from "../components/ItemCard";
import API from "../utils/API";

class TackBoard extends Component {
  state = {
    clientItems: [],
    selectedClient: ""
  };

  componentDidMount() {
    this.loadClientItems();
  }

  updateListCB = () => {
    // used to update the client items when one is deleted.
    this.loadClientItems();
  }
 
  loadClientItems = () => {
    let client = sessionStorage.getItem("selectedClient");

    if (client === "") {
      alert("Please Select a Client");
      return;
    }
    API.getClientItems({ client: client })
      .then(res => {
        this.setState({ clientItems: res.data });
        this.props.updateListCB()
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      // This component will pull in all items selected for the client and create the horizontal cards for display.

      <div>
        <div className="row">
          <div className="col-md">
            <div className="tackboard-container1">
              {this.state.clientItems.length === 0 ? (
                <h3>Please select some items.</h3> // temp need to add a nicer placeholder
              ) : (
                this.state.clientItems.map((itemList, i) => {
                  return (
                    <ItemCard
                      key={i}
                      updateListCB={this.updateListCB}
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
