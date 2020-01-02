
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");

const db = require("../models");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/furniture";

mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

runExit = () => {
    console.log("Taylor King Completed");
    process.exit();
}

var searchTK = function (url, category, roomName) {

    axios.get(url).then(function (response) {

        var $ = cheerio.load(response.data);

        $("article").each(function (i, element) {

            var result = {};

            let descriptionHtml = $(this)
                .children(".productText")
                .html()
                .trim();
            let dataSplit = descriptionHtml.split("<br>", 2)
            result.description = dataSplit[1]
            result.sku = dataSplit[0]
            result.vendor = "Taylor King"
            result.category = category;

            result.url = "https://taylorking.com/" + $(this)
                .children("a")
                .attr("href");
            result.tearsheet = "https://taylorking.com/" + $(this)
                .children("a")
                .attr("href");
            result.image = "https://taylorking.com/" + $(this)
                .children()
                .children()
                .children("img")
                .attr("src");
            result.roomName = roomName;

            db.Furniture.create(result)
                .then(function (dbFurniture) {

                    // console.log(dbFurniture);
                })
                .catch(function (err) {

                    console.log("item was not added");
                })

        });
    });

}

async function runScrapes() {
    console.log("Scraping Taylor King")
    await searchTK("https://taylorking.com/category.asp?CID=11", "beds", "bedroom");

    await searchTK("https://taylorking.com/category3columns.asp?CID=3", "sleepers", "bedroom");

    await searchTK("https://taylorking.com/category.asp?CID=26", "chairs", "bedroom");
    await searchTK("https://taylorking.com/category.asp?pageID=2&CID=26", "chairs", "bedroom");
    await searchTK("https://taylorking.com/category.asp?pageID=3&CID=26", "chairs", "bedroom");
    await searchTK("https://taylorking.com/category.asp?pageID=4&CID=26", "chairs", "bedroom");
    await searchTK("https://taylorking.com/category.asp?pageID=5&CID=26", "chairs", "bedroom");

    await searchTK("https://taylorking.com/category.asp?CID=14", "benches-ottomans", "bedroom");
    await searchTK("https://taylorking.com/category.asp?pageID=2&CID=14", "benches-ottomans", "bedroom");
    await searchTK("https://taylorking.com/category.asp?pageID=3&CID=14", "benches-ottomans", "bedroom");
    await searchTK("https://taylorking.com/category.asp?pageID=4&CID=14", "benches-ottomans", "bedroom");
    await searchTK("https://taylorking.com/category.asp?pageID=5&CID=14", "benches-ottomans", "bedroom");
    await searchTK("https://taylorking.com/category.asp?pageID=6&CID=14", "benches-ottomans", "bedroom");

    await searchTK("https://taylorking.com/category3columns.asp?CID=1", "couches", "living room");
    await searchTK("https://taylorking.com/category3columns.asp?pageID=2&CID=1", "couches", "living room");
    await searchTK("https://taylorking.com/category3columns.asp?pageID=3&CID=1", "couches", "living room");
    await searchTK("https://taylorking.com/category3columns.asp?pageID=4&CID=1", "couches", "living room");
    await searchTK("https://taylorking.com/category3columns.asp?pageID=5&CID=1", "couches", "living room");
    await searchTK("https://taylorking.com/category3columns.asp?pageID=6&CID=1", "couches", "living room");
    await searchTK("https://taylorking.com/category3columns.asp?pageID=7&CID=1", "couches", "living room");
    await searchTK("https://taylorking.com/category.asp?CID=10", "recliners", "living room");
    await searchTK("https://taylorking.com/category.asp?pageID=2&CID=10", "recliners", "living room");
    await searchTK("https://taylorking.com/category3columns.asp?CID=4", "couches", "living room");

    setTimeout(function () { runExit(); }, 20000);
};

runScrapes();

