const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");

const db = require("../models");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/furniture";

mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

runExit = () => {
    console.log("Lexington Completed");
    process.exit();
}

var searchLex = function (url, category, roomName) {

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
            result.roomName = roomName;

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
    await searchLex("https://lexington.com/beds", "beds", "bedroom");
    await searchLex("https://lexington.com/dressers", "dressers", "bedroom");
    await searchLex("https://lexington.com/mirrors", "mirrors", "bedroom");
    await searchLex("https://lexington.com/chests", "chests", "bedroom");
    await searchLex("https://lexington.com/night-stands", "nightstands", "bedroom");
    await searchLex("https://lexington.com/benches-ottomans1521", "benches-ottomans", "bedroom");

    await searchLex("https://www.lexington.com/dining-tables", "tables", "dining room");
    await searchLex("https://www.lexington.com/bistro-tables", "tables", "dining room");
    await searchLex("https://www.lexington.com/dining-seating", "chairs", "dining room");
    await searchLex("https://www.lexington.com/dining-seating?page=2", "chairs", "dining room");
    await searchLex("https://www.lexington.com/dining-seating?page=3", "chairs", "dining room");
    await searchLex("https://www.lexington.com/counter-bar-stools", "chairs", "dining room");
    await searchLex("https://www.lexington.com/counter-bar-stools?page=2", "chairs", "dining room");
    await searchLex("https://www.lexington.com/mirrors872", "mirrors", "dining room");
    await searchLex("https://www.lexington.com/bar-cabinets3273", "cabinets", "dining room");
    await searchLex("https://www.lexington.com/display-cabinets", "cabinets", "dining room");

    await searchLex("https://www.lexington.com/cocktail-tables", "tables", "living room");
    await searchLex("https://www.lexington.com/cocktail-tables?page=2", "tables", "living room");
    await searchLex("https://www.lexington.com/end-lamp-tables", "tables", "living room");
    await searchLex("https://www.lexington.com/end-lamp-tables?page=2", "tables", "living room");
    await searchLex("https://www.lexington.com/sofa-tables-consoles", "tables", "living room");
    await searchLex("https://www.lexington.com/bookcases-etageres", "bookcases", "living room");
    await searchLex("https://www.lexington.com/hall-chests", "chests", "living room");
    await searchLex("https://www.lexington.com/mirrors873", "mirrors", "living room");
    await searchLex("https://www.lexington.com/bar-cabinets", "cabinets", "living room");
    await searchLex("https://www.lexington.com/accent-items", "accent items", "living room");

    setTimeout(function () { runExit(); }, 20000);
};

runScrapes();
