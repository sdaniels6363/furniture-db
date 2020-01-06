var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var FurnitureSchema = new Schema({
  description: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  vendor: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  sku: {
    type: String
  },
  image: {
    type: String
  },
  tearsheet: {
    type: String
  },
  roomName: {
    type: String
  }
});

// This creates our model from the above schema, using mongoose's model method
var Furniture = mongoose.model("Furniture", FurnitureSchema, "furniture");

// Export the Furniture model
module.exports = Furniture;