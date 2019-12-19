import React from "react";
import Category from "../Category"
import Vendors from "../Vendors"
import './index.css'

function Search(){
    return(
    <div className="searchWindow">
        <h2 className="text-center">Search</h2>
        <Category/>
        <Vendors/>
    </div>
    )
}


export default Search 