
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");

const db = require("../models");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/furniture";

mongoose.connect(MONGODB_URI);

var Rowe = function () {

    var searchRowe = function (url, category) {

        axios.get(url).then(function (response) {

            var $ = cheerio.load(response.data);

            $("#").each(function (i, element) {

                var result = {};

                db.Rowe.create(result)
                    .then(function (dbRowe) {

                        console.log(dbRowe);
                    })
                    .catch(function (err) {

                        console.log(err);
                    });

            });
        });

    }

}

module.exports.Rowe = Rowe;