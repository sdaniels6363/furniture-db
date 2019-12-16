import React, { Component } from "react";
import "./style.css";
import API from "../../utils/API";

class Vendor extends Component {

    render(){
        return (
            <div>
                <ul>
                    {this.props.vendors.map(vendor => {
                        return(
                        <li><button onClick={()=> this.props.filterVendor(vendor)}>Show only {vendor}</button></li>
                        )
                    })}
                    <li><button onClick={()=> this.props.filterVendor("all")}>Filter Vendors</button></li>
                </ul>
            </div>
        )
    }
}

export default Vendor;