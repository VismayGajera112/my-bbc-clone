from pymongo import MongoClient

import os


def connectDB():
    client = MongoClient(os.environ.get('MONGO_HOST'), int(os.environ.get('MONGO_PORT', 27017)))

    db = client.get_database(str(os.environ.get('MONGO_DATABASE')))
    return {"status": 200, "db": db, "message": "Database connected"}


if __name__ == "__main__":
    connectDB()
