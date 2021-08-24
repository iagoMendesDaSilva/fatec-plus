
from app import app
from flask import jsonify
from controllers import courseController

@app.route("/mobile-api/v1/courses", methods=["GET"])
def courses():
    return jsonify( courseController.get_all()), 200