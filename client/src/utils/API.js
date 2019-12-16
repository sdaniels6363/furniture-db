import axios from "axios";

export default {
    // Gets furniture by Category
    getFurnitureByCategory: function(category) {
        return axios.get("/api/furniture/" + category);
    },
    // Gets furniture by Vendor(s)
    getFurnitureByVendor: function(category, vendor) {
        return axios.get(`/api/furniture/${category}/${vendor}`);
    },
    // Gets all unique Vendors
    getVendors: function() {
        return axios.get(`/api/vendor`);
    },
    // Get all unique Categories
    getCategories: function(){
        return axios.get("/api/categories");
    }


};