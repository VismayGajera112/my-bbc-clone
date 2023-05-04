import os
from bson.objectid import ObjectId


class User:
    def __init__(self, email, password, country):
        self.email = email
        self.password = password
        self.country = country

    @classmethod
    def from_dict(cls, user_dict):
        return cls(
            email=user_dict.get('email'),
            password=user_dict.get('password'),
            country=user_dict.get('country')
        )

    def to_dict(self):
        return {
            'email': self.email,
            'password': self.password,
            'country': self.country
        }


class UserDatabase:
    def __init__(self, db_name):
        self.collection = db_name[str(os.environ.get('USER_COLLECTION'))]

    def create_user(self, user):
        result = self.collection.insert_one(user)
        return {"inserted_id": result.inserted_id}

    def get_all_users(self):
        users_dict = self.collection.find({}, {"_id": 0})
        return users_dict

    def get_user_by_id(self, user_id):
        user = self.collection.find_one({'_id': ObjectId(user_id)}, {"_id": 0})
        return user

    def get_user_by_email(self, email):
        user_dict = self.collection.find_one({'email': email})
        if user_dict:
            return User.from_dict(user_dict)
        return None

    def delete_user_by_email(self, email):
        result = self.collection.delete_one({'email': email})
        return result.deleted_count > 0
