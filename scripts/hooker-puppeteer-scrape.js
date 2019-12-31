const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const db = require("../models");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/furniture";
mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const axios = require("axios");

// scroll to bottom function for Puppeteer
async function scrollToBottom(page) {
    const distance = 90; // should be less than or equal to window.innerHeight
    const delay = 200;
    while (await page.evaluate(() => document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight)) {
        await page.evaluate((y) => { document.scrollingElement.scrollBy(0, y); }, distance);
        await page.waitFor(delay);
    }
}

// Puppeteer scrape function - puppeteer scrolls to bottom of lazy-loaded page and then captures the site HTML. Site HTML is then passed into Cheerio to pull out the info we want.
// change headless to 'false' if you want/need to see the browser in action.
async function HookerScrape(URL, category, roomName) {

    let browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        args: ['--window-size=1100,650']
    });
    let page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');

    await page.goto(URL);
    await scrollToBottom(page);
    await page.waitFor(4000);

    // scrape stuff here
    let siteHTML = "";
    siteHTML = await page.content();

    // console.log(siteHTML);

    let $ = cheerio.load(siteHTML);

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
        result.vendor = "Hooker";
        result.roomName = roomName;

        db.Furniture.create(result)
            .then(function (dbFurn) {
            })
            .catch(function (err) {
                // console.log(err);
                browser.close();
            });
    });
    browser.close();
}

//cheerio only scrape stuff here - for the pages that do not have enough items to be lazy-loaded. Cheerio only scrapes are much faster than the Puppeteer method.
// Need to pass in custom headers as the Hooker site actively refuses axios calls with a 403.
const config = {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:70.0) Gecko/20100101 Firefox/70.0" }
  };

let scrapeHooker = function (url, category, roomName) {

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
            result.vendor = "Hooker";
            result.roomName = roomName;

            db.Furniture.create(result)
                .then(function (dbFurn) {
                    // console.log(dbFurn);
                })
                .catch(function (err) {
                    // console.log(err);
                });

        });
    });

}

runExit = () => {
    console.log("Hooker Completed");
    process.exit();
}

async function runScrapes() {
    console.log("Scraping Hooker")
    await scrapeHooker("https://www.hookerfurniture.com/bedroom/armoire-cabinets/room-type.aspx", "cabinets", "bedroom");
    await scrapeHooker("https://www.hookerfurniture.com/bedroom/benches/room-type.aspx", "benches-ottomans", "bedroom");
    await scrapeHooker("https://www.hookerfurniture.com/bedroom/beds/room-type.aspx?brand=marq", "beds", "bedroom");
    // await HookerScrape("https://www.hookerfurniture.com/mattresses/department-type.aspx?brand=marq", "MARQ-mattresses");
    await HookerScrape("https://www.hookerfurniture.com/bedroom/mirrors/room-type.aspx", "mirrors", "bedroom");
    await HookerScrape("https://www.hookerfurniture.com/bedroom/nightstands/room-type.aspx", "nightstands", "bedroom");
    await HookerScrape("https://www.hookerfurniture.com/bedroom/chests-and-dressers/room-type.aspx", "dressers", "bedroom");
    await HookerScrape("https://www.hookerfurniture.com/bedroom/beds/room-type.aspx", "beds", "bedroom");
    // the next line terminates this function in Node. Set to 10 second delay for now - definitely on the safe side. Can be reduced if needed. 
    setTimeout(function(){ runExit(); }, 10000);
};

runScrapes();
