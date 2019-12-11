import React from "react";
import "./style.css"

function ItemCard(props) {
    return (
        <div className="img-container">
            <img
                alt={props.alt}
                src={props.src}
            />

            <button onClick={props.toggle} data-clicked={props.clicked} />

        </div>
    )
}

export default ItemCard;