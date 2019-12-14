import React, { Component } from "react";
import API from "../utils/API";
import ItemCard from "../components/ItemCard";

class Dressers extends Component {
  state = {
    dressers: []
  };

  componentDidMount() {
    this.loadDressers();
  }

  loadDressers = () => {
    API.getFurnitureByCategory("dressers")
      .then(res =>
        this.setState({ dressers: res.data})
      )
      .catch(err => console.log(err));
  };


  render() {
    return (
      <div>
        <h2>Dressers</h2>
        {this.state.dressers.map(item => {
          return (
            <ItemCard
              key={item._id}
              vendor={item.vendor}
              description={item.description}
              image={item.image}
              sku={item.sku}
              url={item.url}
              tearsheet={item.tearsheet}
            />
          );
        })}
      </div>
    );
  }
}

export default Dressers;