from app import app, token
from flask import jsonify, request
from controllers import requirementController


@app.route("/mobile-api/v1/job/requirement/<int:job_id>", methods=["POST"])
@token
def requirement_create(current_user, job_id):
    requirementController.create(current_user,request.get_json(),job_id)
    return jsonify({"response":"Created Requirement"}), 200

@app.route("/mobile-api/v1/requirement/<int:id>", methods=["GET","PUT","DELETE"])
@token
def requirement(current_user, id):
    if request.method == 'GET':
        return jsonify(requirementController.get(id)), 200
    elif request.method == 'PUT':
        requirementController.update(current_user,request.get_json(),id)
        return jsonify({"response":"Updated Requirement"}), 200
    elif request.method == 'DELETE':
        requirementController.delete(current_user,id)
        return jsonify({"response":"Deleted Requirement"}), 200