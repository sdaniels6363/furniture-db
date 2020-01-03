import React, { Component } from "react";
import AboutPic from "../components/AboutPic";
import AboutText from "../components/AboutText";
import LoginButtonAbout from "../components/LoginButton";


class About extends Component {
  render() {
    return (
      <div>
        <div className="container" id="mycontainer">
          <div className="row">
            <div className="col-md" id="mycol">
              <AboutPic />
            </div>
            <div className="col-md" id="mycol">
              <AboutText />
            </div>
          </div>
          <div className="row">
              <div className="col-md" id="mycol">
                <LoginButtonAbout />
              </div>
            </div>
        </div>


        
      </div>
    )
  }
}

export default About;
