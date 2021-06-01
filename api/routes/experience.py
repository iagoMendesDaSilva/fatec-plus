from app import app, token
from flask import jsonify, request
from controllers import experienceController

@app.route("/mobile-api/v1/user/experience", methods=["POST"])
@token
def experience_create(current_user):
    experienceController.create(current_user,request.get_json())
    return jsonify({"response":"Created Experience"}), 200

@app.route("/mobile-api/v1/experience/<int:id>", methods=["GET","PUT","DELETE"])
@token
def experience(current_user, id):
    if request.method == 'GET':
        return jsonify(experienceController.get(id)), 200
    elif request.method == 'PUT':
        experienceController.update(current_user,request.get_json(),id)
        return jsonify({"response":"Updated Experience"}), 200
    elif request.method == 'DELETE':
        experienceController.delete(current_user,id)
        return jsonify({"response":"Deleted Experience"}), 200

@app.route("/mobile-api/v1/user/experiences", methods=["DELETE","POST"])
@token
def experiences(current_user):
    if request.method == 'DELETE':
        experienceController.delete_all(current_user)
        return jsonify({"response":"Deleted Experiences"}), 200
    elif request.method == 'POST':
        experienceController.create_many(current_user,request.get_json())
        return jsonify({"response":"Created Experiences"}), 200