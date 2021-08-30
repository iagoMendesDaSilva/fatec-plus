from flask import jsonify
from app import app, token
from controllers import newsController

@app.route("/mobile-api/v1/news", methods=["GET"])
@token
def get_news(current_user):
    return jsonify(newsController.get_by_version(current_user)), 200