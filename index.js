var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");


//Vendor requires
var vendors = require("./modules/vendors")


// Require all models
var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/furniture";
mongoose.connect(MONGODB_URI);

console.log("Retrieving Hekman Bedroom Catalogue")
vendors.hekmanScrape();


// Start the server
app.listen(PORT, () => {
    console.log("App running at http://localhost:" + PORT);
});