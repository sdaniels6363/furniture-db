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
            itemLink = x['href']  # retrive the link for the item
            if itemLink.startswith("/styles/sku"):
                # retrieves the URL of the image for the item.
                image = x.find("img").attrs['src']
                
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
                description = "\n".join(x.text.splitlines()).strip().split("\n")[1].strip()
                # result is description = 'Barrett'
                
                # create new object
                newObject = {
                    "description": description, 
                    "category": category,
                    "url": "https://www.vanguardfurniture.com%s" % (itemLink), 
                    "sku": sku, 
                    "image": image, 
                    "tearsheet": tearsheet,
                    "vendor": "Fairfield",
                    "roomName": roomName
                }

                # append a new object to the details array, we will pass this into Mongo later.
                details.append(newObject)
                
        except KeyError:
            pass
        except AttributeError:
            pass


chairs = "https://www.fairfieldchair.com/styles/-Retail-Upholstery-Chairs/div/1/cat/32/viewall/1"
sofas = "https://www.fairfieldchair.com/styles/-Retail-Upholstery-Sofas%20&%20Sectionals/div/1/cat/31/catname/Sofas%20&%20Sectionals"
beds = "https://www.fairfieldchair.com/styles/-Retail-Upholstery-Beds%20&%20Sleepers/div/1/cat/153/catname/Beds%20&%20Sleepers"
settes = "https://www.fairfieldchair.com/styles/-Retail-Upholstery-settees/div/1/cat/33/catname/settees"
chaises = "https://www.fairfieldchair.com/styles/-Retail-Upholstery-chaises/div/1/cat/34/catname/chaises"
benches = "https://www.fairfieldchair.com/styles/-Retail-Upholstery-benches/div/1/cat/35/catname/benches"
ottomans = "https://www.fairfieldchair.com/styles/-Retail-Upholstery-ottomans/div/1/cat/36/viewall/1"
pillows = "https://www.fairfieldchair.com/styles/-Retail-Upholstery-Throw%20Pillows/div/1/cat/163/catname/Throw%20Pillows"
