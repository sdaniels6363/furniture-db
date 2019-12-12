var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

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

hekmanScrape();