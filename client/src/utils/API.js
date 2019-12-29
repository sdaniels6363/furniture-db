import axios from "axios";

export default {
    // Gets furniture by Category
    getFurnitureByCategory: function (category) {
        return axios.get("/api/furniture/" + category);
    },
    // Gets furniture by Vendor(s)
    getFurnitureByVendor: function (category, vendor) {
        return axios.get(`/api/furniture/${category}/${vendor}`);
    },
    // Gets all unique Vendors
    getVendors: function () {
        return axios.get(`/api/vendor`);
    },
    // Get all unique Categories
    getCategories: function () {
        return axios.get("/api/categories");
    },
    validateUser: function () {
        return axios.post("/api/auth/login")
    },
    newUser: function (data) {
        return axios.post("/api/auth/register", { data }).then((res, err) => {
            if (err) {
                return err;
            }
            return res;
        })
    },
    newClient: function (data) {
        console.log(data)
        return axios.post("/api/clients/create", { data }).then((res, err) => {
            if (err) {
                console.log(err);
            }
            console.log(res)
        })
    },
    getClients: function () {
        return axios.get("/api/clients/list")
    },
    deleteClient: function (data) {
        console.log(data)
        return axios.post("/api/clients/delete", { data }).then((res, err) => {
            if (err) {
                console.log(err);
            }
            console.log(res);
        })
    }
};