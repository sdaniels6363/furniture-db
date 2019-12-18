import React from "react";
import "../../styles/ItemCard.css";
import tack from "./tack.svg"

function ItemCard(props) {
	return (
		<div className="item-container" data-vendor={props.vendor}>
			<img alt={props.description} src={props.image} />
			<div className="item-description">
				<ul>
					<li>Vendor: {props.vendor}</li>
					<li>Description: {props.description}</li>
					<li>SKU: {props.sku}</li>
					<li>URL: <a href={props.url} target="_blank" rel="noopener noreferrer">Link</a></li>
					<li>Tearsheet: <a href={props.tearsheet} target="_blank" rel="noopener noreferrer">Link</a></li>
				</ul>
			</div>
			<div>
				<a href="#"><img className="tack" alt="thumbtack" src={tack} /></a>
			</div>
		</div>
	);
}

export default ItemCard;
