import React from "react";
import "../../styles/About.css";
import FourUp from "./4up-nologo.png";


class AboutPic extends React.Component {
    render() {
        return (
            <div>
                <img id="myimg" className="img-fluid" src={FourUp} alt="furniture collage" />
            </div>
        )
    }
}




export default AboutPic;