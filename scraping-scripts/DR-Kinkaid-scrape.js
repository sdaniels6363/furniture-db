
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");

const db = require("../models");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/furniture";

mongoose.connect(MONGODB_URI);

var DRKincaid = function () {

    var searchDRKincaid = function (url, category) {

        axios.get(url).then(function (response) {

            var $ = cheerio.load(response.data);

            $("p.leftMenu").each(function (i, element) {

                var result = {};

                let descriptionHtml = $(this)
                    .html()
                    .trim();
                let dataSplit = descriptionHtml.split("<br>", 2);
                result.sku = dataSplit[0];

                if (result.sku.length > 20) {

                } else {

                dataSplit[1] = dataSplit[1].trim();
                result.description = dataSplit[1];
                console.log(result.description)
                
                result.vendor = "DR Kincaid";

                result.category = category;

                result.url = "http://www.drkincaidchair.com/" + $(this)
                    .parent("a")
                    .attr("href");
                result.tearsheet = "http://www.drkincaidchair.com/" + $(this)
                    .parent("a")
                    .attr("href");
                result.image = "http://www.drkincaidchair.com/" + $(this)
                    .parent()
                    .parent()
                    .children("p")
                    .children("img")
                    .attr("src");
                
                db.Furniture.create(result)
                    .then(function (dbFurniture) {

                        console.log(dbFurniture);
                    })
                    .catch(function (err) {

                        console.log("item was not added");
                    })
                }
            });
        });

    }

    searchDRKincaid("http://www.drkincaidchair.com/ProductList.php?productCategory=Traditional", "chairs");

}

DRKincaid();

module.exports.DRKincaid = DRKincaid;