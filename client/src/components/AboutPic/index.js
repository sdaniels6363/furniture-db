import React from "react";
import "../../styles/About.css";
import FourUp from "./4up-logo.png";

class AboutPic extends React.Component {
    render() {
        return (
            <div className="fade-in">
                <img id="myimg" className="img-fluid" src={FourUp} alt="furniture collage" />
            </div>
        )
    }
}

export default AboutPic;