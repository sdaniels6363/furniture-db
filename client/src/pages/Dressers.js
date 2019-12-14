import React, { Component } from "react";
import API from "../utils/API";

class Dressers extends Component {
  state = {
    dressers: []
  };

  componentDidMount() {
    this.loadDressers();
  }

  loadDressers = () => {
    API.getFurnitureByCategory()
      .then(res =>
        this.setState({ dressers: res.data})
      )
      .catch(err => console.log(err));
  };


  render() {
    return (
      <div>
        Dressers page
      </div>
    );
  }
}

export default Dressers;
