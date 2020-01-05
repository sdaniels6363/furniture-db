import React from "react";
import "../../styles/ItemCard.css";
import API from "../../utils/API";

class ItemCard extends React.Component {
  constructor(props) {
      super(props);
      this.toggleStatus = this.toggleStatus.bind(this);
  }

  toggleStatus = (event) => {
    event.preventDefault();
  
    // define client based on the select dropdown in the CatNav bar
    // it should have an id of #current-client
    // once added remove this line of the comment and '|| "test"'
    let client = document.querySelector("#current-client").value;
    if (client === "-Please select a client-") {
      alert("Please select a client first.");
      return; // stop status toggle
    }
  
    if (window.location.pathname === "/tackboard") {
      // if we are on the tackboard page and the tack is clicked
      // on the ItemCard.  We are going to be removing an item
      // from the tackboard collection.
      let itemId = event.currentTarget.dataset.objectid;
  
      const data = {
        _id: itemId
      };
  
      API.stageDelete(data)
        .then(res => {
          console.log(res)
          this.props.updateClientItemsCb();
        })
        .catch(err => console.log(err));
    } else {
      // If we are on any other page and a tack is selected we
      // will be adding an item to the tackboard collection.
  
      let itemDetails = JSON.parse(event.currentTarget.dataset.object);
  
      const data = {
        client: client,
        item: itemDetails
      };
  
      if (data.client === "-Please select a client-"){
        alert("Select a client before adding items.")
        return;
      }
  
      API.stageAdd(data)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  }

  render(){
    return (
      <div className="item-container">
        <img alt={this.props.description} src={this.props.image} data-pin-url={this.props.url} data-pin-description={this.props.description} />
        <div className="item-description">
          <li>Vendor: {this.props.vendor}</li>
          <li className="scrollText">
            <span>Description: {this.props.description}</span>
          </li>
          <li>SKU: {this.props.sku}</li>
          <li>
            URL:{" "}
            <a href={this.props.url} target="_blank" rel="noopener noreferrer">
              Link
            </a>
          </li>
          <li>
            Tearsheet:{" "}
            <a href={this.props.tearsheet} target="_blank" rel="noopener noreferrer">
              Link
            </a>
          </li>
        </div>
        <button
          onClick={this.toggleStatus}
          data-objectid={this.props._id}
          data-object={JSON.stringify({
            vendor: this.props.vendor,
            description: this.props.description,
            sku: this.props.sku,
            url: this.props.url,
            tearsheet: this.props.tearsheet,
            image: this.props.image
          })}
          className="btn btn-default tack"
        ></button>
      </div>
    );
  }
  
  }

export default ItemCard;
