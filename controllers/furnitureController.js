const db = require("../models");

// Defining methods for the furnitureController
module.exports = {
  findByCategory: function(req, res) {
    db.Furniture
      .find(req.params.category)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

};
