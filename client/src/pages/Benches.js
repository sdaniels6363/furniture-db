import React, { Component } from "react";
import API from "../utils/API";

class Benches extends Component {
  state = {
    benches: []
  };

  componentDidMount() {
    this.loadBenches();
  }

  loadBenches = () => {
    API.getFurnitureByCategory()
      .then(res =>
        this.setState({ benches: res.data})
      )
      .catch(err => console.log(err));
  };


  render() {
    return (
      <div>
        Benches page
      </div>
    );
  }
}

export default Benches;
