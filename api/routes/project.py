from app import app, token
from flask import jsonify, request
from controllers import projectController

@app.route("/mobile-api/v1/user/project", methods=["POST"])
@token
def project_create(current_user):
    projectController.create(current_user,request.get_json())
    return jsonify({"response":"Created Project"}), 200

@app.route("/mobile-api/v1/project/<int:id>", methods=["GET","PUT","DELETE"])
@token
def project(current_user, id):
    if request.method == 'GET':
        return jsonify(projectController.get(id)), 200
    elif request.method == 'PUT':
        projectController.update(current_user,request.get_json(),id)
        return jsonify({"response":"Updated Project"}), 200
    elif request.method == 'DELETE':
        projectController.delete(current_user,id)
        return jsonify({"response":"Deleted Project"}), 200

@app.route("/mobile-api/v1/user/projects", methods=["DELETE","POST"])
@token
def projects(current_user):
    if request.method == 'DELETE':
        projectController.delete_all(current_user)
        return jsonify({"response":"Deleted Projects"}), 200
    elif request.method == 'POST':
        projectController.create_many(current_user,request.get_json())
        return jsonify({"response":"Created Projects"}), 200