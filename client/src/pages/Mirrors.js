import React, { Component } from "react";
import API from "../utils/API";
import ItemCard from "../components/ItemCard";

class Mirrors extends Component {
  state = {
    mirrors: []
  };

  componentDidMount() {
    this.loadMirrors();
  }

  loadMirrors = () => {
    API.getFurnitureByCategory("mirrors")
      .then(res =>
        this.setState({ mirrors: res.data})
      )
      .catch(err => console.log(err));
  };


  render() {
    return (
      <div>
        Mirrors page
        {this.state.mirrors.map(item => {
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

export default Mirrors;
