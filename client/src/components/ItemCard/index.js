import React from "react";
import "../../styles/ItemCard.css";
import tack from "./tack.svg";

function toggleStatus(event) {
  event.preventDefault();
  if (window.location === "/tackboard"){
    // remove from db
  } else {
    // adding to db
    console.log(event)
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
      <div>
        <a onClick={toggleStatus} data-objectId={props._id} data-object={JSON.stringify({"Vendor": props.vendor, "Description": props.description, "SKU": props.sku, "URL":props.url, "Tearsheet":props.tearsheet})}>
          <img className="tack" alt="thumbtack" src={tack} />
        </a>
      </div>
    </div>
  );
}

export default ItemCard;
