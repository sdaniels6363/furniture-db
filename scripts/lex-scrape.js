const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");

const db = require("../models");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/furniture";

mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

runExit = () => {
    console.log("Scraping Complete");
    process.exit();
}

var searchLex = function (url, category) {

    axios.get(url).then(function (response) {

        var $ = cheerio.load(response.data);

        $("div.product-list-item").each(function (i, element) {

            var result = {};

            result.category = category;

            result.vendor = "Lexington";

            result.description = $(this)
                .children()
                .children()
                .children()
                .attr("alt");

            result.url = "https://lexington.com" + $(this)
                .children()
                .children()
                .attr("href");

            result.image = "https://lexington.com" + $(this)
                .children()
                .children()
                .children()
                .attr("src");

            axios.get(result.url).then(function (response) {

                var $ = cheerio.load(response.data);

                $(".tearsheet").each(function (i, element) {
                    // console.log(element)
                    result.tearsheet = $(this)
                        .attr("href");
                    // console.log(result.tearsheet)

                    db.Furniture.create(result)
                        .then(function (dbFurniture) {

                            // console.log(dbFurniture);
                        })
                        .catch(function (err) {

                            console.log(err);
                        });
                });

            });

            // console.log(result)
        });
    });

}

async function runScrapes() {
    console.log("Scraping Lexington")
    await searchLex("https://lexington.com/beds", "beds");
    await searchLex("https://lexington.com/dressers", "dressers");
    await searchLex("https://lexington.com/mirrors", "mirrors");
    await searchLex("https://lexington.com/chests", "chests");
    await searchLex("https://lexington.com/night-stands", "nightstands");
    await searchLex("https://lexington.com/benches-ottomans1521", "benches-ottomans");

    setTimeout(function () { runExit(); }, 20000);
};

runScrapes();
