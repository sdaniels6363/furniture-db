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

def parseLinks(url, category, roomName):
    # Query Page
    request = pageRequest(url)
    # separate returned object
    page = request['html']
    # pull out all furniture piece divs
    furniture = page.findAll('div', {'class': 'pure-u-1 pure-u-sm-8-24 pure-u-lg-1-5 style_thumbs'})
    # loop over all of the links
    for x in furniture:
        try:
            itemLink = "https://fairfieldchair.com"+x.find('a')['href']  # retrive the link for the item
            image = "https://fairfieldchair.com"+x.find('img')['lazyload'] # retrieve the image link for the item.
            sku = x.find('b').text
            tearsheet = "https://fairfieldchair.com/tearsheet/ff/div/1/id/%s" % sku
            description = x.find('span').text
            # create new object
            newObject = {
                "description": description, 
                "category": category,
                "url": itemLink, 
                "sku": sku, 
                "image": image, 
                "tearsheet": tearsheet,
                "vendor": "Fairfield",
                "roomName": roomName
            }

            # append a new object to the details array, we will pass this into Mongo later.
            results.append(newObject)
            
        except KeyError:
            pass
        except AttributeError:
            pass



categories = [
    {
        "url": "https://www.fairfieldchair.com/styles/-Retail-Upholstery-Chairs/div/1/cat/32/viewall/1",
        "category": "chairs",
        "roomName": "living room"
    },{
        "url":"https://www.fairfieldchair.com/styles/-Retail-Upholstery-Sofas%20&%20Sectionals/div/1/cat/31/catname/Sofas%20&%20Sectionals",
        "category":"sofas",
        "roomName": "living room"
    },{
        "url": "https://www.fairfieldchair.com/styles/-Retail-Upholstery-Beds%20&%20Sleepers/div/1/cat/153/catname/Beds%20&%20Sleepers",
        "category": "beds",
        "roomName": "bedroom"
    },{
        "url": "https://www.fairfieldchair.com/styles/-Retail-Upholstery-settees/div/1/cat/33/catname/settees",
        "category": "benches-ottomans",
        "roomName": "living room"
    },{
        "url": "https://www.fairfieldchair.com/styles/-Retail-Upholstery-benches/div/1/cat/35/catname/benches",
        "category": "benches-ottomans",
        "roomName": "bedroom"
    },{
        "url": "https://www.fairfieldchair.com/styles/-Retail-Upholstery-Throw%20Pillows/div/1/cat/163/catname/Throw%20Pillows",
        "category": "throw pillows",
        "roomName": "living room"
    },{
        "url": "https://www.fairfieldchair.com/styles/-Retail-Upholstery-chaises/div/1/cat/34/catname/chaises",
        "category":"chaises",
        "roomName":"living room"
    },{
        "url":"https://www.fairfieldchair.com/styles/-Retail-Upholstery-ottomans/div/1/cat/36/viewall/1",
        "category":"ottomans",
        "roomName":"living room"
    },{
        "url":"https://fairfieldchair.com/fabrics/--Retail-Fabrics/div/1/cat/all",
        "category":"fabrics",
        "roomName":"fabrics"
    }
]

results = [] #empty array for results
print("Scraping Fairfield")
# over each category pull the page and parse the data
for y in categories:
    url = y['url']
    category = y['category']
    roomName = y['roomName']
    parseLinks(url,category,roomName)


# import env variable, if not defined use localhost
envVar = (os.getenv('MONGODB_URI', "localhost"))

# connect to the mongo server
mongo = pymongo.MongoClient(envVar, 27017)

# connect to the furniture database
db = mongo.furniture

# select the Fairfield collection
furniture = db.furniture

# use the pymongo insert_many function to add an array of values to the database
result = furniture.insert_many(results,ordered=True,bypass_document_validation=False,session=None)

print("Fairfield completed.")
