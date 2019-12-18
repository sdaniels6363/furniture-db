
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");

const db = require("../models");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/furniture";

mongoose.connect(MONGODB_URI);

runExit = () => {
    console.log("Scraping Complete");
    process.exit();
}

var Paladin = function () {

    var searchPaladin = function (url, category) {

        axios.get(url).then(function (response) {

            var $ = cheerio.load(response.data);

            $(".woocommerce-loop-product__title").each(function (i, element) {

                var result = {};

                let descriptionHtml = $(this)
                    .html()
                    .trim();
                let dataSplit = descriptionHtml.split(" ")

                if (dataSplit.length === 2) {
                    result.description = dataSplit[1]
                } else {
                    result.description = dataSplit[1] + " " + dataSplit[2]
                }
                result.sku = dataSplit[0]
                result.vendor = "Paladin Furniture"

                result.category = category;

                result.url = $(this)
                    .parent()
                    .attr("href");
                result.tearsheet = $(this)
                    .parent()
                    .attr("href");
                result.image = $(this)
                    .parent()
                    .parent()
                    .parent()
                    .children()
                    .children()
                    .children()
                    .children("img")
                    .attr("src");

                db.Furniture.create(result)
                    .then(function (dbFurniture) {

                        console.log(dbFurniture);
                    })
                    .catch(function (err) {

                        console.log("item was not added");
                    })

            });
        });

    }

    searchPaladin("https://paladinfurniture.com/product-category/chairs/matching-chairs/", "chairs");
    searchPaladin("https://paladinfurniture.com/product-category/chairs/accent-chairs/", "chairs");
    searchPaladin("https://paladinfurniture.com/product-category/chairs/accent-chairs/page/2/", "chairs");

    searchPaladin("https://paladinfurniture.com/product-category/sofas/sleepers/", "sleepers");

    searchPaladin("https://paladinfurniture.com/product-category/headboards/", "beds");

    searchPaladin("https://paladinfurniture.com/product-category/ottomans/", "ottomans");
    searchPaladin("https://paladinfurniture.com/product-category/ottomans/page/2/", "ottomans");

    searchPaladin("https://paladinfurniture.com/product-category/accent-pieces/benches/", "benches");
}

module.exports.Paladin = Paladin;

