from flask import Flask, jsonify
from data import connection
from dotenv import load_dotenv
import os
from flask_cors import CORS
from controller import UserController, NewsController

app = Flask(__name__)
CORS(app)
load_dotenv()

app.register_blueprint(UserController.user_controller, url_prefix='/api/v1/users')
app.register_blueprint(NewsController.news_controller, url_prefix='/api/v1/news')


@app.route("/")
def index():
    response = connection.connectDB()
    print(response['db'].list_collection_names())
    app.config['DATABASE'] = response['db']
    return jsonify({"Status": response["status"], "Message": response["message"]})


if __name__ == "__main__":
    app.run(debug=True)
