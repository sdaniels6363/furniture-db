var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var UttermostSchema = new Schema({
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    url: {
        type: String,
        
    },
    sku: {
        type: String,
        
    },
    image: {
        type: String,
        
    },
    tearsheet: {
        type: String,
        
    },
});

// This creates our model from the above schema, using mongoose's model method
var Uttermost = mongoose.model("Uttermost", UttermostSchema);

// Export the Hekman model
module.exports = Uttermost;