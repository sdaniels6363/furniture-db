const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const db = require("../models");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/furniture";
mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });


runExit = () => {
    console.log("Hekman Completed");
    process.exit();
}

function hekmanScrape() {
    console.log("Scraping Hekman")
    //Defining sections.
    let sections = [
        {
            urlCategory: "bedroom", //Site Category
            urlSection: "beds", //Site Section
            category: "beds", //Category to pass to DB
            roomName: "bedroom" //Room name to pass to DB
        },
        {
            urlCategory: "bedroom",
            urlSection: "night_stands",
            category: "nightstands",
            roomName: "bedroom"
        },
        {
            urlCategory: "bedroom",
            urlSection: "dressers_chests",
            category: "dressers",
            roomName: "bedroom"
        },
        {
            urlCategory: "bedroom",
            urlSection: "media_chests",
            category: "dressers",
            roomName: "bedroom"
        },
        {
            urlCategory: "bedroom",
            urlSection: "mirrors",
            category: "mirrors",
            roomName: "bedroom"
        },
        // Additional section to scrape.  To be uncommented after project completion.
        // {
        //     urlCategory: "home_office",
        //     urlSection: "office_chairs",
        //     category: "chairs",
        //     roomName: "office"
        // },
    ];
    //Initialize Promises array.
    let promises = [];
    //For each section, we are creating a Promise, which will then be stored to the promises array, to be iterated through after.
    sections.forEach((section, index) => {
        promises.push(axios.get(`http://www.hekman.com/products-${section.urlCategory}-${section.urlSection}`))
    });
    //axios.all will iterate through all the promises.
    axios.all(promises)
        //data is an array of responses from fufilling the promises.
        .then(data => {
            //Loop through the responses
            data.forEach((res, i) => {
                //Create result object.
                let result = {};
                var $ = cheerio.load(res.data);
                let elemCount = $("table tr:first-child").length;
                $ = cheerio.load($("#resultJSONDiv").val())
                $("table tr:first-child").each(function (elemIndex) {
                    result.description = $(this)
                        .find(".popup_productname")
                        .text().replace(/\w-?\w+/, "").trim();
                    result.category = sections[i].category;
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
                    result.roomName = sections[i].roomName;
                    //Create new DB entry with object
                    db.Furniture.create(result)
                        .then(() => {
                            //If on last loop, runExit
                            if (i === data.length - 1 && elemIndex === elemCount - 1) {
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
