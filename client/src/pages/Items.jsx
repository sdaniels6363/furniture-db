import React, { Component } from "react";
import API from "../utils/API";
import ItemCard from "../components/ItemCard";

class Items extends Component {
    state = {
        items: [],
        vendors: [],
        filter: []
    };

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

    filterVendor(vendor){
        if(vendor === "all")
            this.setState({
                filter: [],
                items: this.state.items
            })
        else{
            let result = this.state.items.filter(item => item.vendor === vendor)
            if(result.length === 0)
                result = [{
                    vendor:vendor,
                    description:"No Items for this vendor"}];
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
                                <li key={i}><button onClick={()=>this.filterVendor(vendor)}>Show only {vendor}</button></li>
                            )
                        })}
                        <li><button onClick={()=>this.filterVendor("all")}>Show All</button></li>
                    </ul>
                </div>
                <div>
                    <h2>{this.category.toUpperCase()}</h2>
                    {(this.state.filter.length > 0) ? this.state.filter.map(item => {
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
                    }) : this.state.items.map((item,i) => {
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
