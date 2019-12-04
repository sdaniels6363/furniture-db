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
mongoose.connect(MONGODB_URI);

function hekmanScrape(data, category) {
    var result = {};
    var $ = cheerio.load(data.data);
    $ = cheerio.load($("#resultJSONDiv").val())
    $("table tr:first-child").each(function() {
        result.description = $(this)
            .find(".popup_productname")
            .text().replace(/\w-?\w+/, "").trim();
        result.category = category;
        result.url = "http://www.hekman.com/" + $(this)
            .find("a[id*='imgPopupcatBrowse']")
            .attr("href");
        result.sku = $(this)
            .find(".popup_productname")
            .text()
            .match(/(\w+[-]?\w+)/)[0];
        result.img = $(this)
            .find("a[id*='imgPopupcatBrowse'] img")
            .attr("src");
        result.tearsheet = `https://cms.howardmiller.com/products/sku/${result.sku.replace("-", "")}.pdf`;
        db.Hekman.create(result)
            .then(data => {
                console.log(`Added ${data.description}`);
            })
            .catch(err => {
                console.log(`Error: ${err}`);
            });
    })
}

// A GET route for scraping Heckman.
app.get("/hekman", (req, res) => {
    let sections = [{
            url: "beds",
            category: "Beds"
        },
        {
            url: "night_stands",
            category: "Nightstands"
        },
        {
            url: "dressers_chests",
            category: "Dressers"
        },
        {
            url: "media_chests",
            category: "Dressers"
        },
        {
            url: "mirrors",
            category: "Mirrors"
        },
    ]
    sections.forEach(section => {
        axios.get(`http://www.hekman.com/products-bedroom-${section.url}`).then(data => {
            hekmanScrape(data, section.category)
        })
    });
    res.send("Complete!");
})

// Start the server
app.listen(PORT, () => {
    console.log("App running at http://localhost:" + PORT);
});