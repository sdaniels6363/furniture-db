import React from "react";
import "../../styles/ItemCard.css";
import API from "../../utils/API";

function toggleStatus(event) {
  event.preventDefault();

  // define client based on the select dropdown in the CatNav bar
  // it should have an id of #current-client
  // once added remove this line of the comment and '|| "test"'
  let client = document.querySelector("#current-client").value;
  if (client === "") {
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
        alert(res.data.item.description+" was removed from "+res.data.client+"'s tackboard.")
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
        data-object={JSON.stringify({
          vendor: props.vendor,
          description: props.description,
          sku: props.sku,
          url: props.url,
          tearsheet: props.tearsheet,
          image: props.image
        })}
        className="btn btn-default tack"
      ></button>
    </div>
  );
}

export default ItemCard;
