import React, { Component } from "react";
import "./style.css";
import API from "../../utils/API";

class Vendor extends Component {
    state = {
        vendors: []
    }

    componentDidMount() {
        API.getVendors()
        .then(res => {
            this.setState({
                vendors: res.data
            })
        })
        .catch(err => console.log(err));
    }

    // filter(vendor){
        
    // }

    render(){
        return (
            <div>
                <ul>
                    {this.state.vendors.map(vendor => {
                        return(
                        // <li data-vendor={vendor}><button onClick={()=>this.filter(vendor)}></button>{vendor}</li>
                        <li><button data-vendor={vendor}>Show only {vendor}</button></li>
                        )
                    })}
                    <li><button id="filterVendors">Filter Vendors</button></li>
                </ul>
            </div>
        )
    }
    // render(){
    //     return (
    //         <div>
    //             <ul>
    //                 {this.state.vendors.map(vendor => {
    //                     return(
    //                     <li data-vendor={vendor}>{vendor}</li>
    //                     )
    //                 })}
    //                 <li><button id="filterVendors">Filter Vendors</button></li>
    //             </ul>
    //         </div>
    //     )
    // }
}

export default Vendor;