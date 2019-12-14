import React, { Component } from "react";
import API from "../utils/API";

class Mirrors extends Component {
  state = {
    mirrors: []
  };

  componentDidMount() {
    this.loadMirrors();
  }

  loadMirrors = () => {
    API.getFurnitureByCategory()
      .then(res =>
        this.setState({ mirrors: res.data})
      )
      .catch(err => console.log(err));
  };


  render() {
    return (
      <div>
        Mirrors page
      </div>
    );
  }
}

export default Mirrors;
