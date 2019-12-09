const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AmbellaSchema = new Schema({
    description: {
        type: String,
        required: false
    },

    category: {
        type: String,
        required: true
    },

    url: {
        type: String,
        required: true,
        unique: true
    },

    sku: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true,
        unique: true
    },

    tearsheet: {
        type: String,
    },

    vendor: {
        type: String,
        default: "Ambella"
    }
});

const Ambella = mongoose.model("Ambella", AmbellaSchema);

module.exports = Ambella;
