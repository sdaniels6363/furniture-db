#!/usr/bin/env python3

# Modules
# used to make http requests, similar to axios
import requests
# used to parse html, similar to cheerio
from bs4 import BeautifulSoup
# mongodb driver for python
import pymongo
# import os to access env variables
import os

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
def parseLinks(url, category, roomName):
    # Query Page
    request = pageRequest(url)
    # separate returned object
    page = request['html']
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
                sku = itemLink.strip("/styles/sku/")
                
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
                    "url": "https://www.vanguardfurniture.com%s" % (itemLink), 
                    "sku": sku, 
                    "image": image, 
                    "tearsheet": tearsheet,
                    "vendor": "Vanguard",
                    "roomName": roomName
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
        "url":"https://vanguardfurniture.com/styles?PageSize=2000000000&ProdType=008",
        "category": "mirrors",
        "roomName": "bathroom"
    },{
        "url":'https://vanguardfurniture.com/styles?PageSize=2000000000&Collection=%3fMIYBV',
        "category": "vanities",
        "roomName": "bathroom"
    },{
        "url": "https://vanguardfurniture.com/styles?PageSize=2000000000&Room=BR&ProdType=002",
        "category": "beds",
        "roomName": "bedroom"
    },{
        "url": "https://vanguardfurniture.com/styles?PageSize=2000000000&Room=BR&ProdType=018",
        "category": "benches-ottomans",
        "roomName": "bedroom"
    },{
        "url": "https://vanguardfurniture.com/styles?PageSize=2000000000&Room=BR&ProdType=016",
        "category": "dressers",
        "roomName": "bedroom"
    },{
        "url": "https://vanguardfurniture.com/styles?PageSize=2000000000&Room=BR&ProdType=008",
        "category": "mirrors",
        "roomName": "bedroom"
    },{
        "url": "https://vanguardfurniture.com/styles?PageSize=2000000000&Room=BR&ProdType=035",
        "category": "nightstands",
        "roomName": "bedroom"
    },{
        "url": "https://vanguardfurniture.com/styles?PageSize=2000000000&Room=DR&ProdType=036",
        "category": "cabinets",
        "roomName": "dining room",
    },{
        "url": "https://vanguardfurniture.com/styles?PageSize=2000000000&Room=DR&ProdType=014",
        "category": "stools",
        "roomName": "dining room"
    },{
        "url":"https://vanguardfurniture.com/styles?PageSize=2000000000&Room=DR&ProdType=005",
        "category": "buffets",
        "roomName": "dining room"
    },{
        "url":"https://vanguardfurniture.com/styles?PageSize=2000000000&Room=DR&ProdType=013",
        "category": "chairs",
        "roomName": "dining room"
    },{
        "url":"https://vanguardfurniture.com/styles?PageSize=2000000000&Room=DR&ProdType=007",
        "category": "tables",
        "roomName": "dining room"
    },{
        "url":"https://vanguardfurniture.com/styles?PageSize=2000000000&Room=DR&ProdType=008",
        "category": "mirrors",
        "roomName": "dining room"
    },{
        "url":"https://vanguardfurniture.com/styles?PageSize=2000000000&Room=LR&ProdType=018",
        "category": "benches-ottomans",
        "roomName": "living room"
    },{
        "url":"https://vanguardfurniture.com/styles?PageSize=2000000000&Room=LR&ProdType=029",
        "category": "bookcases",
        "roomName": "living room"
    },{
        "url":"https://vanguardfurniture.com/styles?PageSize=2000000000&Room=LR&ProdType=001",
        "category": "chairs-ottomans",
        "roomName": "living room"
    },{
        "url":"https://vanguardfurniture.com/styles?PageSize=2000000000&Room=LR&ProdType=017",
        "category": "chaises",
        "roomName": "living room"
    },{
        "url":"https://vanguardfurniture.com/styles?PageSize=2000000000&Room=LR&ProdType=037",
        "category": "chests",
        "roomName": "living room"
    },{
        "url":"https://vanguardfurniture.com/styles?PageSize=2000000000&Room=LR&ProdType=003",
        "category": "cocktail tables",
        "roomName": "living room"
    },{
        "url":"https://vanguardfurniture.com/styles?PageSize=2000000000&Room=LR&ProdType=012",
        "category": "consoles",
        "roomName": "living room"
    },{
        "url":"https://vanguardfurniture.com/styles?PageSize=2000000000&Room=LR&ProdType=011",
        "category": "desks",
        "roomName": "living room"
    },{
        "url":"https://vanguardfurniture.com/styles?PageSize=2000000000&?Room=LR&ProdType=008",
        "category": "mirrors",
        "roomName": "living room"
    },{
        "url":"https://vanguardfurniture.com/styles?PageSize=2000000000&Room=LR&ProdType=006",
        "category": "sectionals",
        "roomName": "living room"
    },{
        "url":"https://vanguardfurniture.com/styles?PageSize=2000000000&Room=LR&ProdType=009",
        "category": "end table",
        "roomName": "living room"
    },{
        "url":"https://vanguardfurniture.com/styles?PageSize=2000000000&Room=LR&ProdType=024",
        "category": "sleepers",
        "roomName": "living room"
    },{
        "url":"https://vanguardfurniture.com/styles?PageSize=2000000000&Room=LR&ProdType=004",
        "category": "sofas",
        "roomName": "living room"
    },{
        "url":"https://vanguardfurniture.com/styles?PageSize=2000000000&Room=OF&ProdType=029",
        "category": "bookcases",
        "roomName": "office"
    },{
        "url":"https://vanguardfurniture.com/styles?PageSize=2000000000&Room=OF&ProdType=047",
        "category": "chairs",
        "roomName": "office"
    },{
        "url":"https://vanguardfurniture.com/styles?PageSize=2000000000&Room=OF&ProdType=011",
        "category": "desks",
        "roomName": "office"
    },{
        "url":"https://vanguardfurniture.com/coverings/?Type=F&PageSize=2000000000",
        "category":"fabrics",
        "roomName": "upholstery"
    },{
        "url":"https://vanguardfurniture.com/coverings/?Type=L&PageSize=2000000000",
        "category":"leathers",
        "roomName": "upholstery"
    },{
        "url":"https://vanguardfurniture.com/styles/TossPillows?PageSize=2000000000",
        "category":"pillows",
        "roomName": "upholstery"
    },{
        "url":"https://vanguardfurniture.com/coverings/?Type=T&PageSize=2000000000",
        "category":"trims",
        "roomName": "upholstery"
    }

]
# create empty array
details = []

print("Scraping Vanguard")
# over each category pull the page and parse the data
for x in category_url:
    url = x['url']
    category = x['category']
    roomName = x['roomName']
    parseLinks(url,category,roomName)


# import env variable, if not defined use localhost
envVar = (os.getenv('MONGODB_URI', "localhost"))

# connect to the mongo server
mongo = pymongo.MongoClient(envVar, 27017)

# connect to the furniture database
db = mongo.furniture

# select the vanguard collection
furniture = db.furniture

# use the pymongo insert_many function to add an array of values to the database
result = furniture.insert_many(details,ordered=True,bypass_document_validation=False,session=None)

print("Vanguard completed.")
