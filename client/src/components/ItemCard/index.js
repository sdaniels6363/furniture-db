import React from "react";
import "./style.css";

function ItemCard(props) {
  return (
    <div className="img-container">
      <img alt={props.description} src={props.image} />
      <p>Description: {props.description}</p>
      <p>SKU: {props.sku}</p>
      <p>URL: <a href={props.url}>{props.url}</a></p>
      <p>Tearsheet: <a href={props.tearsheet}>{props.tearsheet}</a></p>
    </div>
  );
}

export default ItemCard;
