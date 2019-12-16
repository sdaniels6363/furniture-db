const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");

const db = require("../models");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/furniture";

mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true });

// A GET route for scraping the echoJS website
var searchUttermost = function (url, category) {
    // First, we grab the body of the html with axios
    axios.get(url).then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        // Now, we grab every h2 within an article tag, and do the following:
        $("article").each(function (i, element) {
            // Save an empty result object
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.category = category;

            result.vendor = "Uttermost";

            result.image = $(this)
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
                db.Furniture.create(result)
                  .then(function(dbFurniture) {
                    // View the added result in the console
                    console.log(dbFurniture);
                  })
                  .catch(function(err) {
                    // If an error occurred, log it
                    console.log(err);
                  });
              });

        });
    }

searchUttermost("https://www.uttermost.com/Accent-Furniture-Shop-By-Room-Bedroom/", "Bedroom");
