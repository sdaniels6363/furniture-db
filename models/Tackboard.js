var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var TackboardSchema = new Schema({
  client: {
    type: String,
    required: true,
  },
  item:{
    type: Object,
  }

});

// This creates our model from the above schema, using mongoose's model method
var Tackboard = mongoose.model("Tackboard", TackboardSchema, "tackboard");

// Export the Client model
module.exports = Tackboard;