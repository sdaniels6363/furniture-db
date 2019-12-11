import axios from "axios";

export default {
  // Gets furniture by Category
  getFurnitureByCategory: function(category) {
    return axios.get("/api/"+category);
  },
  // Gets furniture by Vendor(s)
  getFurnitureByVendor: function(category,vendor) {
    return axios.get(`/api/${category}/${vendor}`);
  },

  
};
