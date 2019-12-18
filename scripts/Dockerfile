# This dockerfile generates the container that executes the scripts.
FROM alpine:latest

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
RUN mkdir app

# cd to /app
WORKDIR /app

# Copies all of the scripts to the container
COPY . .

# install node dependencies
RUN npm install

# when container is started, run scrapeAll.sh file
CMD ["sh","scrapeAll.sh"]

