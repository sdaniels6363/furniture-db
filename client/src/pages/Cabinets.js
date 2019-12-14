import React, { Component } from "react";
import API from "../utils/API";
import ItemCard from "../components/ItemCard";

class Cabinets extends Component {
  state = {
    cabinets: []
  };

  componentDidMount() {
    this.loadCabinets();
  }

  loadCabinets = () => {
    API.getFurnitureByCategory("cabinets")
      .then(res =>
        this.setState({ cabinets: res.data})
      )
      .catch(err => console.log(err));
  };


  render() {
    return (
      <div>
        {this.state.cabinets.map(item => {
          return (
            <ItemCard
              key={item._id}
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

export default Cabinets;
