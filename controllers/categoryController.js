const db = require("../models");

// Defining methods for the categoryController
module.exports = {
    findAll: function(req, res) {
        db.Furniture.distinct("category", (err, data) => {
            if (err) {
                console.log(err)
            } else {
                // console.log(data);
                res.json(data);
            }
        })
    }
};

module.exports = {
    findAll: function(req, res) {
        db.Furniture.distinct("roomName", (err, data) => {
            if (err) {
                console.log(err)
            } else {
                // console.log(data);
                res.json(data);
            }
        })
    }
};