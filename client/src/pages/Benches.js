import React, { Component } from "react";
import API from "../utils/API";
import ItemCard from "../components/ItemCard";

class Benches extends Component {
  state = {
    benches: []
  };

  componentDidMount() {
    this.loadBenches();
  }

  loadBenches = () => {
    API.getFurnitureByCategory("benches")
      .then(res =>
        this.setState({ benches: res.data})
      )
      .catch(err => console.log(err));
  };


  render() {
    return (
      <div>
        <h2>Benches</h2>
        {this.state.benches.map(item => {
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

export default Benches;
