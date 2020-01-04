# furniture-db
Full Stack Web Development - Project 3
Site Location - [custom-corner.com](https://custom-corner.com)

## Purpose
This purpose of this site is to give interior designers the ability to search the inventory of multiple vendors, from a single page.  Giving them a single pane of glass experience.  This allows the user to not have to search the multiple websites of the vendors that they work with, when looking for the perfect piece of furniture for their client.

## New Technologies
For one of the vendors that we'll be using on the site, we are utilizing Python to complete the web scraping.  Python is making use of the following modules:
- requests
- bs4
- pymongo

Requests is a http request library similar to that of Axios/AJAX in Javascript.  BS4 or otherwise known as BeautifulSoup is a HTML/XML parsing library, it's similar to the cheerio module in Javascript.  Finally pymongo is the mongodb driver for python, that allows us to add records to the database, via python.

![alt screenshot](./readme_imgs/vanguard.png)

Aside from Python, we also made use of an additional library we didn't discuss in class - Puppetteer - a JavaScript library that assists with web page scraping, by emulating user clicks on pages that reject conventional scrapes.

For our design scheme, we used Figma.

## Hosting

The site has been hosted on Google Cloud, and is currently utilizing Docker to run the infrastructure of the web application.  There are 5 different containers running on the server.
- Mongo (Houses the database of the application.)
- NGINX (Performs reverse proxy, and handles SSL.  It also redirects traditional http connections to https)
- Certbot (Automates keeping SSL Cert with LetsEncrypt Valid.)
- Alpine (Small Linux container that's responsible for running the scraping scripts.)
- Node (Runs the react-app.)

