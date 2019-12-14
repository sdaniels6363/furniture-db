import React, { Component } from "react";
import API from "../utils/API";

class Nightstands extends Component {
  state = {
    nightstands: []
  };

  componentDidMount() {
    this.loadNightstands();
  }

  loadNightstands = () => {
    API.getFurnitureByCategory()
      .then(res =>
        this.setState({ nightstands: res.data})
      )
      .catch(err => console.log(err));
  };


  render() {
    return (
      <div>
        Nightstands page
      </div>
    );
  }
}

export default Nightstands;
