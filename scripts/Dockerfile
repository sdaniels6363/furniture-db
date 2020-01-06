# This dockerfile generates the container that executes the scripts.
FROM alpine:latest

# set the ENV
ENV MONGODB_URI="mongodb://mongoCC/furniture"

# install mongo
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/main' >> /etc/apk/repositories
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/community' >> /etc/apk/repositories
RUN apk update
RUN apk add mongodb=3.4.4-r0

# install nodejs and npm 
RUN apk add --update nodejs npm

# install python3
RUN apk add --update python3

# upgrade the python package manager
RUN pip3 install --upgrade pip

# install requests, similar to axios
RUN pip3 install requests

# install bs4 AKA BeautifulSoup, similar to cheerio
RUN pip3 install bs4

# install pymongo, sends data to mongodb
RUN pip3 install pymongo

# creates app dir
RUN mkdir app app/scripts

# cd to /app
WORKDIR /app/scripts

# Copies all of the scripts to the container
COPY ambella-scrape.js .
COPY DR-Kinkaid-scrape.js .
COPY hekman-scrape.js .
COPY hooker-puppeteer-scrape.js .
COPY lex-scrape.js .
COPY package.json /app/package.json
COPY paladin-scrape.js .
COPY revelation-scrape.js .
COPY scrapeAll.sh .
COPY tayKing-scrape.js .
COPY uttermost-scrape.js .
COPY vanguardBrScraper.py .

# copy models to container
COPY models /app/models

# install node dependencies 
WORKDIR /app
RUN npm install

WORKDIR /app/scripts
# when container is started, run scrapeAll.sh file
CMD ["sh","scrapeAll.sh"]

