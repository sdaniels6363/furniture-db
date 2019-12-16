import React from "react";
import "./style.css";
import tack from "./tack.svg"

function ItemCard(props) {
	return (
		<div className="item-container">
			<img alt={props.description} src={props.image} />
			<div className="item-description">
				<ul>
					<li>Vendor: {props.vendor}</li>
					<li>Description: {props.description}</li>
					<li>SKU: {props.sku}</li>
					<li>URL: <a href={props.url} target="_blank">Link</a></li>
					<li>Tearsheet: <a href={props.tearsheet} target="_blank">Link</a></li>
				</ul>
			</div>
			<div>
				<a href="#"><img className="tack" alt="thumbtack" src={tack} /></a>
			</div>
		</div>
	);
}

export default ItemCard;
