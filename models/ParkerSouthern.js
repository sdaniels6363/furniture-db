const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ParkerSouthernSchema = new Schema({

  description: {
    type: String,
    // required: true
  },

  category: {
    type: String,
    // required: true
  },

  sku: {
    type: String,
    // required: true
  },

  url: {
    type: String,
    // required: true,
    // unique: true
  },

  image: {
    type: String,
    // required: true
  },

  tearsheet: {
    type: String,
    // required: true
  }

});

const ParkerSouthern = mongoose.model("ParkerSouthern", ParkerSouthernSchema);

module.exports = ParkerSouthern;
