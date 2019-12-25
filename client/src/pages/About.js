import React, { Component } from "react";
import AboutPic from "../components/AboutPic";
import AboutText from "../components/AboutText";

class About extends Component {
  render() {
  return (
  <div>
    <div className="container">
      <div className="row">
        <div className="col-sm" id="mycol">
          <AboutPic />
        </div>
        <div className="col-sm" id="mycol">
          
          <AboutText />
        </div>

      </div>
    </div>





  </div>
  )
}}

export default About;
