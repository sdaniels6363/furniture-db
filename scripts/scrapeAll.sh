#!/bin/bash

# the purpose of this bash script is to orchestrate the running of all of the scrapes.

# Node Scripts
node ./ambella-scarpe.js
node ./DR-Kinkaid-scrape.js
node ./hekman-scrape.js
node ./hooker-puppeteer-scrape.js
node ./lex-scrape.js
node ./paladin-scrape.js
node ./tayKing-scrape.js
node ./uttermost-scrape.js

# Python Scripts
python3 ./vanguardBrScraper.py