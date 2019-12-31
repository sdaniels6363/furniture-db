import React from "react";
import "../../styles/ItemCard.css";
import API from "../../utils/API"

function toggleStatus(event) {
  event.preventDefault();

  // define client based on the select dropdown in the CatNav bar
  // it should have an id of #current-client
  // once added remove this line of the comment and '|| "test"'
  let client = document.querySelector("#current-client") || "test"

  if (window.location === "/tackboard") {
    // if we are on the tackboard page and the tack is clicked
    // on the ItemCard.  We are going to be removing an item 
    // from the tackboard collection.
    let itemId = event.currentTarget.dataset.objectId

    const data = {
      _id: itemId
    }

    API.stageDelete(data)
      .then(res => console.log(res))
      .catch(err => console.log(err))

  } else {
    // If we are on any other page and a tack is selected we
    // will be adding an item to the tackboard collection.
    console.log(event.currentTarget.dataset.object)

    let itemDetails = JSON.parse(event.currentTarget.dataset.object)

    const data = {
      client: client,
      item: itemDetails
    }
    
    API.stageAdd(data)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
}

function ItemCard(props) {
  return (
    <div className="item-container">
      <img alt={props.description} src={props.image} />
      <div className="item-description">
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
        <button 
          onClick={toggleStatus} 
          data-objectid={props._id} 
          data-object={JSON.stringify({ "Vendor": props.vendor, "Description": props.description, "SKU": props.sku, "URL": props.url, "Tearsheet": props.tearsheet })}
          className="btn btn-default tack">
        </button>
    </div>
  );
}

export default ItemCard;
