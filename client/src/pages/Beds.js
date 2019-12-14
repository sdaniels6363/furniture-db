import React, { Component } from "react";
import API from "../utils/API";
import ItemCard from "../components/ItemCard";

class Beds extends Component {
  state = {
    beds: []
  };

  componentDidMount() {
    this.loadBeds();
  }

  loadBeds = () => {
    API.getFurnitureByCategory("beds")
      .then(res => {
        this.setState({ beds: res.data });        
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <h2>Beds</h2>
        {this.state.beds.map(item => {
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

export default Beds;
