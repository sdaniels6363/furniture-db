const db = require("../models");

// Defining methods for the categoryController 
module.exports = {
    findCategories: function(req, res) {
        db.Furniture.distinct("category", (err, data) => {
            if (err) {
                console.log(err)
            } else {
                // console.log(data);
                res.json(data);
            }
        })
    },
};

