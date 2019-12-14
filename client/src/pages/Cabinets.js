import React, { Component } from "react";
import API from "../utils/API";

class Cabinets extends Component {
  state = {
    cabinets: []
  };

  componentDidMount() {
    this.loadCabinets();
  }

  loadCabinets = () => {
    API.getFurnitureByCategory()
      .then(res =>
        this.setState({ cabinets: res.data})
      )
      .catch(err => console.log(err));
  };


  render() {
    return (
      <div>
        Cabinets page
      </div>
    );
  }
}

export default Cabinets;
