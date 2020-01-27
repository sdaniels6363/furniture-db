#!/bin/bash

# the purpose of this bash script is to orchestrate the running of all of the scrapes.
logger "Started scrapeAll.sh"
# drop the current collection if it exists
#[ -z "$MONGODB_URI" ] && mongo localhost:27017/furniture --eval 'db.furniture.drop()' || mongo $MONGODB_URI --eval 'db.furniture.drop()'
mongo localhost/furniture --eval 'db.furniture.drop()'
logger "Dropped furniture collection"
# we do this everytime the script runs, this way we don't have to worry about duplicates, and we don't have to deal with adding/removing items.

# Python Scripts
python3 ./vanguardBrScraper.py
logger "Scraped Vanguard"
# Node Scripts
node ./ambella-scrape.js
logger "Scraped Ambella"
node ./DR-Kinkaid-scrape.js
logger "Scraped DR Kinkaid"
node ./hekman-scrape.js
logger "Scraped Hekman"
node ./hooker-puppeteer-scrape.js
logger "Scraped Hooker"
node ./lex-scrape.js
logger "Scraped Lexington"
node ./paladin-scrape.js
logger "Scraped Paladin"
node ./tayKing-scrape.js
logger "Scraped Taylor King"
# node ./uttermost-scrape.js
logger "Finished scrapeAll.sh"
