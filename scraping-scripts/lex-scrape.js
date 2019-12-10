const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");

const db = require("../models");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/furniture";

mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true });

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
                        .then(function (dbfurniture) {

                            console.log(dbfurniture);
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

searchLex("https://lexington.com/beds", "beds");
searchLex("https://lexington.com/dressers", "dressers");
searchLex("https://lexington.com/mirrors", "mirrors");
searchLex("https://lexington.com/chests", "chests");
searchLex("https://lexington.com/night-stands", "nightstands");
searchLex("https://lexington.com/benches-ottomans1521", "benches/ottomans");

