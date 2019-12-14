import React, { Component } from "react";
import API from "../utils/API";
import ItemCard from "../components/ItemCard";

class Nightstands extends Component {
  state = {
    nightstands: []
  };

  componentDidMount() {
    this.loadNightstands();
  }

  loadNightstands = () => {
    API.getFurnitureByCategory("nightstands")
      .then(res =>
        this.setState({ nightstands: res.data })
      )
      .catch(err => console.log(err));
  };


  render() {
    return (
      <div>
        <h2>Nightstands</h2>
        {this.state.nightstands.map(item => {
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

export default Nightstands;
