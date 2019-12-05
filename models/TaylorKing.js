const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaylorKingSchema = new Schema({

  description: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  sku: {
    type: String,
    required: true
  },

  url: {
    type: String,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  tearsheet: {
    type: String,
    required: true
  }

});

const TaylorKing = mongoose.model("TaylorKing", TaylorKingSchema);

module.exports = TaylorKing;
