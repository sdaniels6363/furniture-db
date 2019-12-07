var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var HekmanSchema = new Schema({
    description: {
        type: String,
    },
    vendor: {
        type: String,
        default: "Hekman"
    },
    category: {
        type: String,
    },
    url: {
        type: String,
        unique: true
    },
    sku: {
        type: String,
        unique: true
    },
    img: {
        type: String,
        unique: true
    },
    tearsheet: {
        type: String,
        unique: true
    },
});

// This creates our model from the above schema, using mongoose's model method
var Hekman = mongoose.model("Hekman", HekmanSchema);

// Export the Hekman model
module.exports = Hekman;