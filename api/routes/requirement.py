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

@app.route("/mobile-api/v1/job/requirements/<int:job_id>", methods=["GET","DELETE","POST"])
@token
def requirements(current_user, job_id):
    if request.method == 'GET':
        return jsonify(requirementController.get_all_by_job(job_id)), 200
    elif request.method == 'DELETE':
        requirementController.delete_all(current_user,job_id)
        return jsonify({"response":"Deleted Requirements"}), 200
    elif request.method == 'POST':
        requirementController.create_many(current_user,request.get_json(),job_id)
        return jsonify({"response":"Created Requirements"}), 200