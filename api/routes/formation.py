from app import app, token
from flask import jsonify, request
from controllers import formationController

@app.route("/mobile-api/v1/user/formation", methods=["POST"])
@token
def formation_create(current_user):
    formationController.create(current_user,request.get_json())
    return jsonify({"response":"Created Formation"}), 200

@app.route("/mobile-api/v1/formation/<int:id>", methods=["GET","PUT","DELETE"])
@token
def formation(current_user, id):
    if request.method == 'GET':
        return jsonify(formationController.get(id)), 200
    elif request.method == 'PUT':
        formationController.update(current_user,request.get_json(),id)
        return jsonify({"response":"Updated Formation"}), 200
    elif request.method == 'DELETE':
        formationController.delete(current_user,id)
        return jsonify({"response":"Deleted Formation"}), 200

@app.route("/mobile-api/v1/user/formations", methods=["DELETE","POST"])
@token
def formations(current_user):
    if request.method == 'DELETE':
        formationController.delete_all(current_user)
        return jsonify({"response":"Deleted Formations"}), 200
    elif request.method == 'POST':
        formationController.create_many(current_user,request.get_json())
        return jsonify({"response":"Created Formations"}), 200