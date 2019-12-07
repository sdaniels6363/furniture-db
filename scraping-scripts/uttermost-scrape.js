var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");
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
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);
// A GET route for scraping the echoJS website
app.get("/uttermost-scrape", function (req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.uttermost.com/Accent-Furniture-Shop-By-Room-Bedroom/").then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        // Now, we grab every h2 within an article tag, and do the following:
        $("article").each(function (i, element) {
            // Save an empty result object
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.img = $(this)
                .children("figure")
                .children("a")
                .children("img")
                .attr("src");
            result.url = "https://www.uttermost.com/" + $(this)
                .children("figure")
                .children("a")
                .attr("href");

            console.log(`result`, result);

            // Create a new Article using the `result` object built from scraping
                db.Uttermost.create(result)
                  .then(function(dbUttermost) {
                    // View the added result in the console
                    console.log(dbUttermost);
                  })
                  .catch(function(err) {
                    // If an error occurred, log it
                    console.log(err);
                  });
              });

            // Send a message to the client
            res.send("Scrape completed");
        });
    });

// Start the server
app.listen(PORT, () => {
    console.log("App running at http://localhost:" + PORT);
});

