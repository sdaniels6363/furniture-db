var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  tackboard:{
    type: Array,
  }

});

// This creates our model from the above schema, using mongoose's model method
var Client = mongoose.model("Client", ClientSchema, "client");

// Export the Client model
module.exports = Client;