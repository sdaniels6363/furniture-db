
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");

const db = require("../models");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/furniture";

mongoose.connect(MONGODB_URI);

var searchTK = function (url, category) {

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

            db.Furniture.create(result)
                .then(function (dbfurniture) {

                    console.log(dbfurniture);
                })
                .catch(function (err) {

                    console.log(err);
                });

        });
    });

}

searchTK("https://taylorking.com/category.asp?CID=11", "bedroom");
searchTK("https://taylorking.com/category3columns.asp?CID=3", "sleepers");