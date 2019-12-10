var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

function hekmanScrape() {

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

            var result = {};
            var $ = cheerio.load(data.data);
            $ = cheerio.load($("#resultJSONDiv").val())
            $("table tr:first-child").each(function() {
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
                    .then(data => {
                        console.log(`Added ${data.description}`);
                    })
                    .catch(err => {
                        console.log(`Error: ${err}`);
                    });
            })
        })
    });
}

module.exports.hekmanScrape = hekmanScrape;