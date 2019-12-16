import React, { Component } from "react";
import API from "../utils/API";
import ItemCard from "../components/ItemCard";
import NoItemCard from "../components/NoItemCard";

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
                console.log(this.state.items)
            })
            .catch(err => console.log(err));
    };

    getVendors() {
        API.getVendors()
            .then(res => {
                this.setState({
                    vendors: res.data
                })
            })
            .catch(err => console.log(err));
    }

    filterVendor(vendor) {
        //If show all, "clear" state.filter, and set items to itself to trigger the state change.
        if (vendor === "all")
            this.setState({
                filter: [],
                items: this.state.items
            })
        else {
            //Otherwise, create a new array with object.vendor equal to passed vendor variable.
            let result = this.state.items.filter(item => item.vendor === vendor)
            //If there are no vendors for that item, create a dummy object to display.
            if (result.length === 0)
                result = [{
                    vendor: vendor,
                    error: true
                }];
            //Else, set filter state with the filtered array "result", which will trigger the ItemCard re-draw
                this.setState({
                    filter: result
                })

        }
    }

    render() {
        return (
            <div>
                <div>
                    <ul>
                        {this.state.vendors.map((vendor, i) => {
                            return (
                                <li key={i}><button onClick={() => this.filterVendor(vendor)}>Show only {vendor}</button></li>
                            )
                        })}
                        <li><button onClick={() => this.filterVendor("all")}>Show All</button></li>
                    </ul>
                </div>
                <div>
                    <h2>{this.category.toUpperCase()}</h2>
                    {//Check if state.filter has more than 0 elements.  
                    (this.state.filter.length > 0) ? 
                    //If true, use state.filter with the ItemCard component.
                    this.state.filter.map(item => {
                        if(item.error)
                            return <NoItemCard category={this.category} vendor={item.vendor}/>
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
        );
    }
}

export default Items;
