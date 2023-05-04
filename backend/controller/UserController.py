import os
from datetime import datetime, timedelta
import jwt
from bson.objectid import ObjectId
from flask import Blueprint, jsonify, request, make_response

from data import connection
from models import User

# Connect to the MongoDB database
response = connection.connectDB()
db = response['db']

# Create a blueprint for the user controller
user_controller = Blueprint('user_controller', __name__)
userDB = User.UserDatabase(db)


# Route to create a new user
@user_controller.route('/', methods=['POST'])
def create_user():
    # Get the user data from the request body
    user_data = request.get_json()

    # Insert the new user into the database
    response = userDB.create_user(user_data)

    # Return the ID of the new user
    if response.get('inserted_id') is not None:
        return jsonify({'id': str(response["inserted_id"]), "message": "Successfully registered"}), 201
    else:
        return jsonify({"message": "Registration failed"}), 500


# Route to get a list of all users
@user_controller.route('/getUsers', methods=['GET'])
def get_users():
    # Get all the users from the database
    users = list(userDB.get_all_users())

    # Return the list of users as JSON
    return jsonify({"users": users}), 200


# Route to get a specific user by ID
@user_controller.route('/getUserProfile', methods=['GET'])
def get_user():
    # Find the user in the database by email
    token = request.cookies.get('token')
    payload = jwt.decode(token, os.environ.get('SECRET_KEY'), algorithms='HS256')
    user = userDB.get_user_by_email(payload['username']).to_dict()

    # Return the user as JSON
    return jsonify(user), 200


# Route to update a specific user by ID
@user_controller.route('/update/<string:user_id>', methods=['PUT'])
def update_user(user_id):
    # Get the user data from the request body
    user_data = request.get_json()
    email = user_data['email']
    password = user_data['password']
    country = user_data['country']

    # Update the user in the database
    result = db.users.update_one(
        {'_id': ObjectId(user_id)},
        {'$set': {
            'email': email,
            'password': password,
            'country': country
        }}
    )

    # Return the number of documents updated
    return jsonify({'num_modified': result.modified_count}), 200


# Route to delete a specific user by ID
@user_controller.route('/delete/<string:user_id>', methods=['DELETE'])
def delete_user(user_id):
    # Delete the user from the database by ID
    result = db.users.delete_one({'_id': ObjectId(user_id)})

    # Return the number of documents deleted
    return jsonify({'num_deleted': result.deleted_count}), 200


# Route to log in a user
@user_controller.route("/login", methods=['POST'])
def login_user():
    user_data = request.get_json()
    userFromDB = userDB.get_user_by_email(user_data['email'])

    if userFromDB is not None and userFromDB.password == user_data['password']:
        payload = {"username": userFromDB.email, "country": userFromDB.country}
        auth_token = jwt.encode(payload, os.environ.get('SECRET_KEY'), algorithm='HS256')
        response = jsonify({"status": 200, "message": "Log In successful", "authToken": auth_token})
        response.set_cookie('token', auth_token, max_age=3600, httponly=True)
        return response
    else:
        return jsonify({"status": 500, "message": "Log In failed"})


# Route to log in a user
@user_controller.route("/logout", methods=['GET'])
def logout_user():
    response = make_response(jsonify({"status": 200, "message": "Logout Successfully"}))
    expires = datetime.utcnow() - timedelta(days=365)
    response.set_cookie('token', '', expires=expires, httponly=True)
    return response
