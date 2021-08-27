from app import app, token
from flask import jsonify, request
from controllers import socialNetworkController

@app.route("/mobile-api/v1/user/social-network", methods=["POST"])
@token
def socialNetwork_create(current_user):
    socialNetworkController.create(current_user,request.get_json())
    return jsonify({"response":"Created Social Network"}), 200

@app.route("/mobile-api/v1/social-network/<int:id>", methods=["GET","PUT","DELETE"])
@token
def socialNetwork(current_user, id):
    if request.method == 'GET':
        return jsonify(socialNetworkController.get(id)), 200
    elif request.method == 'PUT':
        socialNetworkController.update(current_user,request.get_json(),id)
        return jsonify({"response":"Updated Social Network"}), 200
    elif request.method == 'DELETE':
        socialNetworkController.delete(current_user,id)
        return jsonify({"response":"Deleted Social Network"}), 200