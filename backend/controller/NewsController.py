import os
from datetime import datetime, timedelta
import random
import jwt
import requests
from flask import Blueprint, request

# Create a blueprint for the user controller
news_controller = Blueprint('news_controller', __name__)

country_dict = {
    "India": "in",
    "UK": "gb",
    "USA": "us",
    "Russia": "ru",
    "China": "cn"
}
queries = ['apple', 'google', 'tesla', 'microsoft', 'meta', 'amazon', 'netflix', 'shell', 'aramco', 'exxonMobil',
               'india', 'us', 'nasa', 'russia', 'hollywood', 'bollywood']


@news_controller.route("/top-headlines")
def topHeadlinesBBC():
    url = "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=" + os.environ.get('NEWS_API_KEY')
    response = requests.get(url)
    return response.json()


@news_controller.route("/getSportsNews")
def getSportsNews():
    url = "https://newsapi.org/v2/top-headlines/sources?category=sports&apiKey=" + os.environ.get('NEWS_API_KEY')
    response = requests.get(url)
    return response.json()


@news_controller.route("/getSpecificCountryNews")
def getSpecificCountryNews():
    token = request.cookies.get('token')
    if token is None:
        return "Internal server error", 500
    payload = jwt.decode(token, os.environ.get('SECRET_KEY'), algorithms='HS256')
    country = country_dict.get(payload['country'])
    url = f"https://newsapi.org/v2/top-headlines/sources?country={country}&apiKey={os.environ.get('NEWS_API_KEY')}"
    response = requests.get(url)
    return response.json()


@news_controller.route("/getArticles")
def getArticles():
    date = datetime.today() - timedelta(days=1)
    formatted_date = date.strftime("%Y-%m-%d")
    query = random.choice(queries)
    url = f"https://newsapi.org/v2/everything?q={query}&from={formatted_date}&sortBy=popularity" \
          f"&apiKey={os.environ.get('NEWS_API_KEY')}"

    response = requests.get(url)
    return response.json()
