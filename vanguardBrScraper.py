#!/usr/bin/env python3

# Modules
import requests  # used to make http requests, similar to axios
from bs4 import BeautifulSoup  # used to parse html, similar to cheerio
import pymongo  # mongodb driver for python

# Functions


def pageRequest(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'
    }
    r = requests.get(url, headers=headers)
    html = r.text
    parsed = BeautifulSoup(html)
    return parsed


# variables
bedroomURL = "https://vanguardfurniture.com/styles?PageSize=2000000000&Room=BR"

# Query Page
page = pageRequest(bedroomURL)

# pull out all anchor tags
anchors = page.find_all('a')

details = []
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
            tearsheet = "https://www.vanguardfurniture.com/style/%s" % sku
            # make http call to fetch the tear sheet
            scrapeTearsheet = pageRequest(tearsheet)
            # this is what the link text looks like
            # example: '\n\n\n\n\n\r\n                                                    W526Q-HF\r\n                                                    Barrett\r\n                                                '
            # as you can see that's useless, so the below line formats it nicely for us.
            description = "\n".join(anchor.text.splitlines()).strip().split("\n")[1].strip()
            # result is description = 'Barrett'
            # create new object
            newObject = {"description": description, "url": "https://www.vanguardfurniture.com/%s" % (itemLink), "sku": sku, "image": image, "tearsheet": tearsheet}
            # append a new object to the details array, we will pass this into Mongo later.
            details.append(newObject)
        else:
            pass

    except KeyError:
        pass

    except AttributeError:
        pass


# Still need to add the mongo database capability.
