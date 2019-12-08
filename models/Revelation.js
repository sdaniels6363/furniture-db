var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var RevelationSchema = new Schema({
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
    img: {
        type: String,
        
    },
    tearsheet: {
        type: String,
        
    },
});

// This creates our model from the above schema, using mongoose's model method
var Revelation = mongoose.model("Revelation", RevelationSchema);

// Export the Hekman model
module.exports = Revelation;