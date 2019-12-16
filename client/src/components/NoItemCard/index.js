import React from "react";
import "./style.css";

function NoItemCard(props) {
	return (
		<div className="item-container" data-vendor={props.vendor}>
			<div>
				<br/><br/>
				There are no {props.category} for {props.vendor}.  Please Select a different filter or category.
			</div>
		</div>
	);
}

export default NoItemCard;
