const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


const cheerio = require("cheerio");
const axios = require("axios");

const db = require("./models");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/furniture";

mongoose.connect(MONGODB_URI);

// Need to send custom headers since Hooker's site actively denies axios calls with a "403" 
const config = {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:70.0) Gecko/20100101 Firefox/70.0" }
};

let scrapeHooker = function (url, category) {

    axios.get(url, config).then(function (response) {

        var $ = cheerio.load(response.data);

        $("div.ProductThumbnail").each(function (i, element) {

            const result = {};

            result.description = $(this)
                .children("div.ProductThumbnailDetails")
                .children("p.ProductThumbnailParagraphDescription")
                .children("a")
                .text();
            result.category = category;
            result.url = "https://www.hookerfurniture.com" + $(this)
                .children("a")
                .attr("href");
            result.sku = $(this)
                .children("div.ProductThumbnailDetails")
                .children("p.ProductThumbnailParagraphSkuName")
                .children("a")
                .text();
            result.image = "https:" + $(this)
                .children("a")
                .children("img")
                .attr("src");
            result.tearsheet = "https://www.hookerfurniture.com" + $(this)
                .children("div.ProductThumbnailDetails")
                .children("p.ProductThumbnailParagraphDescription")
                .children("a")
                .attr("href");

            db.Furniture.create(result)
                .then(function (dbFurniture) {
                    // console.log(dbFurn);
                })
                .catch(function (err) {
                    console.log(err);
                });

        });
    });

}

scrapeHooker("https://www.hookerfurniture.com/bedroom/benches/room-type.aspx", "benches");

scrapeHooker("https://www.hookerfurniture.com/bedroom/armoire-cabinets/room-type.aspx", "cabinets");

scrapeHooker("https://www.hookerfurniture.com/bedroom/nightstands/room-type.aspx", "nightstands");

scrapeHooker("https://www.hookerfurniture.com/bedroom/beds/room-type.aspx", "beds");

scrapeHooker("https://www.hookerfurniture.com/bedroom/chests-and-dressers/room-type.aspx", "dressers");

scrapeHooker("https://www.hookerfurniture.com/bedroom/mirrors/room-type.aspx", "mirrors");

scrapeHooker("https://www.hookerfurniture.com/bedroom/beds/room-type.aspx?brand=marq", "beds");

// scrapeHooker("https://www.hookerfurniture.com/mattresses/department-type.aspx?brand=marq", "MARQ-mattresses");
