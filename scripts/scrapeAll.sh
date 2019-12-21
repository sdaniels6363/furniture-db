#!/bin/bash

# the purpose of this bash script is to orchestrate the running of all of the scrapes.

# drop the current collection if it exists
mongo localhost:27017/furniture --eval 'db.furniture.drop()'
# we do this everytime the script runs, this way we don't have to worry about duplicates, and we don't have to deal with adding/removing items.

# Python Scripts
python ./vanguardBrScraper.py

# Node Scripts
node ./ambella-scrape.js
node ./DR-Kinkaid-scrape.js
node ./hekman-scrape.js
node ./hooker-puppeteer-scrape.js
node ./lex-scrape.js
node ./paladin-scrape.js
node ./tayKing-scrape.js
node ./uttermost-scrape.js