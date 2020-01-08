const db = require("../models");

// Defining methods for the furnitureController
module.exports = {
  findByCategory: function(req, res) {
    let room = req.params.room
    let category = req.params.category;
    db.Furniture
      .find({roomName: room ,category: category})
      .sort({vendor:1})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

};
