const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LexingtonSchema = new Schema({

  description: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  // sku: {
  //   type: String,
  //   required: true
  // },

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
    required: false
  }

});

const Lexington = mongoose.model("Lexington", LexingtonSchema);

module.exports = Lexington;
