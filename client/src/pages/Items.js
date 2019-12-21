import React, { Component } from "react";
import API from "../utils/API";
import ItemCard from "../components/ItemCard";
import NoItemCard from "../components/NoItemCard";
import Vendors from "../components/Vendors";
import "../styles/Items.css"

class Items extends Component {
  state = {
    items: [],
    filter: []
  };

  vendorList = [];
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
        this.vendorList = res.data;
      })
      .catch(err => console.log(err));
  }

  getVendorsFromFilter = (vendors) => {
    // Set result to a filtered items array where only items that have the selected vendors will appear.
    let result = this.state.items.filter(item => vendors.includes(item.vendor));
    //If result is empty, add a dummy "item" to provide page feedback.
    if(result.length === 0)
    result = [{
      error: true,
      //If there are vendors selected, if not, change the message.
      vendor: vendors.join(", ") || "No Vendors Selected"
    }]
    //Set filter state to re-draw the components.
    this.setState({
      filter: result,
    });

  }

  render() {
    return (
      <div>
        {/* Display Category, and item cards */}
        <div>
          <div>
            <div className="row">
              <div className="col-md-3">
                {/* Vendor Filter Section */}
                <Vendors
                  vendorList={this.vendorList}
                  filterVendors={this.getVendorsFromFilter}
                />
              </div>
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
