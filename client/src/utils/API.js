import axios from "axios";

export default {
    // Gets furniture by Category
    getFurnitureByCategory: function (room, category) {
        return axios.get(`/api/furniture/${room}/${category}`);
    },
    // Gets furniture by Vendor(s)
    getFurnitureByVendor: function (category, vendor) {
        return axios.get(`/api/furniture/${category}/${vendor}`);
    },
    // Gets all unique Vendors
    getVendors: function () {
        return axios.get(`/api/vendor`);
    },
    // // Get all unique Categories
    // getCategories: function () {
    //     return axios.get("/api/categories");
    // },
    // Get all unique Rooms
    getRooms: function () {
        return axios.get("/api/rooms");
    },
    validateUser: function (data) {
        return axios.post("/api/auth/login", { data }).then((res, err) => {
            if (err) {
                return err;
            }
            return res;
        })
    },
    //method to verify stored session token.
    verifyToken: (data) => {
        return axios.post("/api/auth/verify", { data }).then((res, err) => {
            if (err) {
                return err;
            }
            return res;
        })
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
                return err;
            }
            return res;
        })
    },
    stageAdd: function (data) {
        // this function adds an item to the tackboard collection
        return axios.post("/api/clients/stageAdd", { data }).then((res, err) => {
            if (err) {
                return err;
            }
            return res
        });
    },
    stageDelete: function (data) {
        // this function deletes an item from the tackboard collection
        return axios.post("/api/clients/stageRemove", { data }).then((res, err) => {
            if (err) {
                return err;
            }
            return res;
        });
    },
    getClientItems: function (data) {
        // this function retrieves the items from the Tackboard collection
        return axios.post("/api/clients/items", { data }).then((res, err) => {
            if (err) {
                return err
            }
            return res
        })
    }
};
