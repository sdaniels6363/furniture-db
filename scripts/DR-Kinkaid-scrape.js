
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");

const db = require("../models");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/furniture";

mongoose.connect(MONGODB_URI);

runExit = () => {
    console.log("Scraping Complete");
    process.exit();
}

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
    searchDRKincaid("http://www.drkincaidchair.com/ProductList.php?productCategory=Traditional&page=2", "chairs");
    searchDRKincaid("http://www.drkincaidchair.com/ProductList.php?productCategory=Traditional&page=3", "chairs");
    searchDRKincaid("http://www.drkincaidchair.com/ProductList.php?productCategory=Traditional&page=4", "chairs");
    searchDRKincaid("http://www.drkincaidchair.com/ProductList.php?productCategory=Traditional&page=5", "chairs");
    searchDRKincaid("http://www.drkincaidchair.com/ProductList.php?productCategory=Traditional&page=6", "chairs");
    searchDRKincaid("http://www.drkincaidchair.com/ProductList.php?productCategory=Basic", "chairs");
    searchDRKincaid("http://www.drkincaidchair.com/ProductList.php?productCategory=Basic&page=2", "chairs");

    searchDRKincaid("http://www.drkincaidchair.com/ProductList.php?productCategory=Bench_Ottoman", "benches");
    searchDRKincaid("http://www.drkincaidchair.com/ProductList.php?productCategory=Bench_Ottoman&page=2", "benches");
    searchDRKincaid("http://www.drkincaidchair.com/ProductList.php?productCategory=Bench_Ottoman&page=3", "benches");
    searchDRKincaid("http://www.drkincaidchair.com/ProductList.php?productCategory=Bench_Ottoman&page=4", "benches");

    searchDRKincaid("http://www.drkincaidchair.com/ProductList.php?productCategory=Upholstered_Headboards", "beds");
}

module.exports.DRKincaid = DRKincaid;