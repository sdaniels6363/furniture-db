import React, { Component } from "react";
import API from "../utils/API";
import ItemCard from "../components/ItemCard";
import NoItemCard from "../components/NoItemCard";
import "../styles/Items.css"

class Items extends Component {
  state = {
    items: [],
    vendors: [],
    filter: []
  };

  //Grab "category" from url params
  category = this.props.match.params.item;
  componentDidMount() {
    this.getVendors();
    this.loadItems();
  }

  loadItems = () => {
    API.getFurnitureByCategory(this.category)
      .then(res => {
        this.setState({ items: res.data });
      })
      .catch(err => console.log(err));
  };

  getVendors() {
    API.getVendors()
      .then(res => {
        this.setState({
          vendors: res.data
        });
      })
      .catch(err => console.log(err));
  }

  filterVendor(vendor) {
    //If show all, "clear" state.filter, and set state.items to itself to trigger the state change.
    if (vendor === "all")
      this.setState({
        filter: [],
        items: this.state.items
      });
    else {
      //Otherwise, create a new array with object.vendor equal to passed vendor variable.
      let result = this.state.items.filter(item => item.vendor === vendor);
      //If there are no vendors for that item, create a dummy object to display.
      if (result.length === 0)
        result = [
          {
            vendor: vendor,
            error: true
          }
        ];
      //Else, set filter state with the filtered array "result", which will trigger the ItemCard re-draw
      this.setState({
        filter: result
      });
    }
  }

  render() {
    return (
      <div>
        {/* Filter Section */}
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Vendor Filters
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            {this.state.vendors.map((vendor, i) => {
              return (
                <button
                  className="dropdown-item"
                  key={i}
                  onClick={() => this.filterVendor(vendor)}
                >
                  Show only {vendor}
                </button>
              );
            })}
            <button
              className="dropdown-item"
              onClick={() => this.filterVendor("all")}
            >
              Show All
            </button>
          </div>
        </div>
        {/* Display Category, and item cards */}
        <div>
          <div>
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-9">
                <h2 className="categoryTitle">{this.category.toUpperCase()}</h2>
                {//Check if state.filter has more than 0 elements.
                  this.state.filter.length > 0
                    ? //If true, use state.filter with the ItemCard component.
                    this.state.filter.map(item => {
                      if (item.error)
                        return (
                          <NoItemCard
                            category={this.category}
                            vendor={item.vendor}
                          />
                        );
                      else
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
                    })
                    : //Otherwise, use state.items, which should be all items for the "category" from the DB.
                    this.state.items.map((item, i) => {
                      return (
                        <ItemCard
                          key={i}
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Items;
