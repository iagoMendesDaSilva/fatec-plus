from models import *
from controllers import *
from app import app, token
from flask import jsonify, request


@app.route("/mobile-api/v1/register", methods=["POST"])
def register():
    data = request.get_json()
    userController.create(data)
    return jsonify({"response":"Registered User"}), 200


@app.route("/mobile-api/v1/login", methods=["POST"])
def login():
    data = request.get_json()
    if  response :=  userController.login(data):
        return jsonify({"response":response}), 200

@app.route("/mobile-api/v1/user/<int:id>", methods=["GET","PUT","DELETE"])
@token
def get_user(current_user,id):
        if request.method == 'GET':
            try:
                return jsonify(userController.get_user(id)), 200
            except:
                return jsonify({'error': 'not found'}), 404

@app.route("/mobile-api/v1/users", methods=["GET"])
@token
def get_users(current_user):
        try:
            return jsonify(userController.get_users()), 200
        except:
            return jsonify({'error': 'not found'}), 404