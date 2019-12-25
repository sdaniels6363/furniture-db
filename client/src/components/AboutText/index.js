import React from "react";
import "../../styles/About.css";
// import FourUp from "./4up-nologo.png";


class AboutText extends React.Component {
    render() {
        return (
            <div>
                <div className="card" id="mycard">
                    <div className="card-body">
                        <h1 className="card-title" id="mycard-title">About Custom Corner</h1>
                        <p className="card-text" id="mycard-text">
                            <span className="custom-bold">Custom Corner</span> is a tool built for AR Homes to streamline their interior designers’ workflow. Instead of bouncing to dozens of different sites to pick the right furniture, fabrics and other decorative items, the designer can select everything within <span className="custom-bold">Custom Corner</span>. We’ll keep track of what has been selected for each client and keep tabs on it. The final collection of products can then be displayed on Pinterest for easy sharing with the client.
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}




export default AboutText;