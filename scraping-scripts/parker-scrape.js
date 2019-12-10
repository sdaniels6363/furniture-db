
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");

const db = require("../models");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/furniture";

mongoose.connect(MONGODB_URI);

var ParkerSouthern = function () {

    var searchParkerSouthern = function (url, category) {

        axios.get(url).then(function (response) {

            var $ = cheerio.load(response.data);

            $("a").each(function (i, element) {

                var result = {};

                result.url = $(this)
                    .attr("href");
                result.category = category;

                db.ParkerSouthern.create(result)
                    .then(function (dbParkerSouthern) {

                        console.log(dbParkerSouthern);
                    })
                    .catch(function (err) {

                        console.log(err);
                    });

            });
        });

    }
    searchParkerSouthern("http://www.parkersouthern.com/catalog.asp?section_type=catalog&mode=Room&id=18", "beds");
}

module.exports.ParkerSouthern = ParkerSouthern;