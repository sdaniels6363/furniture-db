#!/usr/bin/env python3

# Modules
# used to make http requests, similar to axios
import requests
# used to parse html, similar to cheerio
from bs4 import BeautifulSoup
# mongodb driver for python
import pymongo

# Functions
def pageRequest(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'
    }
    r = requests.get(url, headers=headers)
    html = r.text
    parsed = BeautifulSoup(html, features="html.parser")
    # get status code too
    status = r.status_code
    parsedObject = {
        "html": parsed,
        "status": status
    }
    return parsedObject

# function used to parse the links from scraping the full page.
def parseLinks(url, category):
    # Query Page
    request = pageRequest(url)
    # separate returned object
    page = request['html']
    statusCode = request['status']
    # pull out all anchor tags
    anchors = page.find_all('a')
    # loop over all of the links
    for anchor in anchors:
        try:
            itemLink = anchor['href']  # retrive the link for the item
            if itemLink.startswith("/styles/sku"):
                # retrieves the URL of the image for the item.
                image = anchor.find("img").attrs['src']
                
                # first we extract the SKU out of itemLink:
                # Ex: itemLink = '/styles/sku/W526Q-HF'
                # strip removes "/styles/sku" and leaves us with W526Q-HF
                sku = itemLink.strip("/styles/sku/")\
                
                # tearsheet
                tearsheet = "https://www.vanguardfurniture.com/style/%s" % (sku)
                # this is what the link.text looks like
                # example: '\n\n\n\n\n\r\n                                                    W526Q-HF\r\n                                                    Barrett\r\n                                                '
                # as you can see that's useless, so the below line formats it nicely for us.
                # Python uses strip, Javascript uses trim, they accomplish the same task.
                description = "\n".join(anchor.text.splitlines()).strip().split("\n")[1].strip()
                # result is description = 'Barrett'
                
                # create new object
                newObject = {
                    "description": description, 
                    "category": category,
                    "url": "https://www.vanguardfurniture.com/%s" % (itemLink), 
                    "sku": sku, 
                    "image": image, 
                    "tearsheet": tearsheet,
                    "vendor": "Vanguard",
                    "pageStatus": statusCode
                }

                # append a new object to the details array, we will pass this into Mongo later.
                details.append(newObject)
                
        except KeyError:
            pass
        except AttributeError:
            pass

# variables
category_url = [
    {
        "url": "https://vanguardfurniture.com/styles?PageSize=2000000000&Room=BR&ProdType=002",
        "category": "beds"
    },{
        "url": "https://vanguardfurniture.com/styles?PageSize=2000000000&Room=BR&ProdType=018",
        "category": "benches/ottomans"
    },{
        "url": "https://vanguardfurniture.com/styles?PageSize=2000000000&Room=BR&ProdType=016",
        "category": "dressers"
    },{
        "url": "https://vanguardfurniture.com/styles?PageSize=2000000000&Room=BR&ProdType=008",
        "category": "mirrors"
    },{
        "url": "https://vanguardfurniture.com/styles?PageSize=2000000000&Room=BR&ProdType=035",
        "category": "nightstands"
    }
]
# create empty array
details = []


# over each category pull the page and parse the data
for x in category_url:
    url = x['url']
    category = x['category']
    parseLinks(url,category)




# connect to the mongo server
mongo = pymongo.MongoClient("localhost", 27017)

# connect to the furniture database
db = mongo.furniture

# select the vanguard collection
vanguard = db.vanguard

# use the pymongo insert_many function to add an array of values to the database
result = vanguard.insert_many(details)

