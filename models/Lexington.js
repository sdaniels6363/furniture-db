const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LexingtonSchema = new Schema({

  vendor: {
    type: String,
    required: true
  },
  
  description: {
    type: String,
    required: false
  },

  category: {
    type: String,
    required: true
  },

  sku: {
    type: String,
    required: false
  },

  url: {
    type: String,
    required: true,
    unique: true
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
