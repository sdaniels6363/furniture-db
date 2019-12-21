const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");

const db = require("../models");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/furniture";

mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true });

runExit = () => {
  console.log("Scraping Complete");
  process.exit();
}

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

      // console.log(`result`, result);

      axios.get(result.url).then(function (response) {

        var $ = cheerio.load(response.data);

        $(".product__links").each(function (i, element) {
          result.tearsheet = $(this).attr("href");

          // Create a new Article using the `result` object built from scraping
          db.Furniture.create(result)
            .then(function (dbFurniture) {
              // View the added result in the console
              // console.log(dbFurniture);
            })
            .catch(function (err) {

              if (err.code === 11000){
                console.log("Entry already exists.")
              } else {
                              // If an error occurred, log it
              console.log(err);
              }
            });


        })
      })


    });

  });
  
}

async function runScrapes() {
  console.log("Scraping Uttermost")
  await searchUttermost("https://www.uttermost.com/Accent-Furniture-Shop-By-Room-Bedroom/", "Bedroom");

  setTimeout(function(){ runExit(); }, 15000);
};

runScrapes();
