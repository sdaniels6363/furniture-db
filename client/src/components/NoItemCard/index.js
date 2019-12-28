import React from "react";
import "../../styles/NoItemCard.css";

function NoItemCard(props) {
	return (
		<div className="item-container" data-vendor={props.vendor}>
			<div>
				<br/><br/>
				Please Select at least one vendor from the list.
			</div>
		</div>
	);
}

export default NoItemCard;
