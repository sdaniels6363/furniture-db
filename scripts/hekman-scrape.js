const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const db = require("../models");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/furniture";
mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true });


runExit = () => {
    console.log("Scraping Complete");
    process.exit();
}

function hekmanScrape() {
    let sections = [{
            url: "beds",
            category: "beds"
        },
        {
            url: "night_stands",
            category: "nightstands"
        },
        {
            url: "dressers_chests",
            category: "dressers"
        },
        {
            url: "media_chests",
            category: "dressers"
        },
        {
            url: "mirrors",
            category: "mirrors"
        },
    ]
    sections.forEach((section, index) => {
        axios.get(`http://www.hekman.com/products-bedroom-${section.url}`).then(data => {

            var result = {};
            var $ = cheerio.load(data.data);
            $ = cheerio.load($("#resultJSONDiv").val())
            let elemCount = $("table tr:first-child").length;
            $("table tr:first-child").each(function(elemIndex) {
                result.description = $(this)
                    .find(".popup_productname")
                    .text().replace(/\w-?\w+/, "").trim();
                result.category = section.category;
                result.vendor = "Hekman";
                result.url = "http://www.hekman.com/" + $(this)
                    .find("a[id*='imgPopupcatBrowse']")
                    .attr("href");
                result.sku = $(this)
                    .find(".popup_productname")
                    .text()
                    .match(/(\w+[-]?\w+)/)[0];
                result.image = $(this)
                    .find("a[id*='imgPopupcatBrowse'] img")
                    .attr("src");
                result.tearsheet = `https://cms.howardmiller.com/products/sku/${result.sku.replace("-", "")}.pdf`;
                db.Furniture.create(result)
                    .then(() => {
                        if (index === sections.length - 1 && elemIndex === elemCount - 1) {
                            runExit();
                        }
                    })
                    .catch(err => {
                        console.log(`Error: ${err}`);
                    });
            })
        })
    })
}

hekmanScrape();