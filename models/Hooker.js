const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HookerSchema = new Schema({
    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true,
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
        type: String,
        required: true,
        unique: true
    },

    tearsheet: {
        type: String,
    },

    vendor: {
        type: String,
        default: "Hooker"
    }
});

const Hooker = mongoose.model("Hooker", HookerSchema);

module.exports = Hooker;
