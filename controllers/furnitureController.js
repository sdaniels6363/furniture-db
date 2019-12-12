const db = require("../models");

// Defining methods for the furnitureController
module.exports = {
  findByCategory: function(req, res) {
    db.furniture
      .find(req.params.category)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByVendor: function(req, res) {
    let category = req.params.category;
    let vendors = req.params.vendor.split("&");




    db.furniture
      .find({vendor: {$in: ['some title', 'some other title']}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
