var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var ConnectionLogSchema = new Schema({
  ip: {
    type: String,
    required: true,
    unique: true
  },
  failedAttemps: {
    type: Number
  },
  blocked: {
    type: Boolean,
    default: false
  }
});

// This creates our model from the above schema, using mongoose's model method
var ConnectionLog = mongoose.model("ConnectionLog", ConnectionLogSchema, "ConnectionLog");

// Export the IpBlock model
module.exports = ConnectionLog;