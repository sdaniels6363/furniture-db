const db = require("../models");

// Defining methods for the furnitureController
module.exports = {
  findByCategory: function(req, res) {
    let category = req.params.category;
    db.Furniture
      .find({category: category})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

};
