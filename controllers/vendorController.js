const db = require("../models");

// Defining methods for the vendorController
module.exports = {
    findAll: function(req, res) {
        db.Furniture
            .distinct("vendor", function(err, names) {
                if (err)
                    console.log(err)
                else
                    res.json(names)
            })
    }
};