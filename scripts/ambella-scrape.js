const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


const cheerio = require("cheerio");
const axios = require("axios");

const db = require("../models");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/furniture";

mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

runExit = () => {
    console.log("Ambella Completed");
    process.exit();
}

let scrapeAmbella = function (url, category, roomName) {

    axios.get(url).then(function (response) {

        var $ = cheerio.load(response.data);

        $("gallery-item").each(function (i, element) {

            const result = {};

            result.description = $(this)
                .children("a.descriptions")
                .children("span.name")
                .text();
            result.category = category;
            result.url = "https://www.ambellahome.com" + $(this)
                .children("a")
                .attr("href");
            result.sku = $(this)
                .children("a.descriptions")
                .children("span.sku")
                .text();
            result.image = $(this)
                .children("a")
                .children("img")
                .attr("src");
            result.tearsheet = "https://www.ambellahome.com" + $(this)
                .children("a")
                .attr("href");
            result.vendor = "Ambella";
            result.roomName = roomName;

            db.Furniture.create(result)
                .then(function (dbFurniture) {
                    // console.log(dbFurn);
                })
                .catch(function (err) {
                    // console.log(err);
                });

        });
    });

}

async function runScrapes() {
    console.log("Scraping Ambella")
    await scrapeAmbella("https://www.ambellahome.com/Product/Bedroom/Beds", "beds", "bedroom");

    await scrapeAmbella("https://www.ambellahome.com/Product/Bedroom/Dressers", "dressers", "bedroom");

    await scrapeAmbella("https://www.ambellahome.com/Product/Bedroom/Nightstands", "nightstands", "bedroom");

    await scrapeAmbella("https://www.ambellahome.com/Product/Mirrors/Mirrors", "mirrors", "bedroom");

    setTimeout(function () { runExit(); }, 15000);
};

runScrapes();