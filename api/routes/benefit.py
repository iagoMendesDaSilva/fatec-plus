from app import app, token
from flask import jsonify, request
from controllers import benefitController


@app.route("/mobile-api/v1/job/benefit/<int:job_id>", methods=["GET","PUT","DELETE","POST"])
@token
def benefit(current_user, job_id):
    if request.method == 'GET':
        return jsonify(benefitController.get(job_id)), 200
    elif request.method == 'PUT':
        benefitController.update(current_user,request.get_json(),job_id)
        return jsonify({"response":"Updated Benefit"}), 200
    elif request.method == 'DELETE':
        benefitController.delete(current_user,job_id)
        return jsonify({"response":"Deleted Benefit"}), 200
    elif request.method == 'POST':
        benefitController.create(current_user,request.get_json(),job_id)
        return jsonify({"response":"Created Benefit"}), 200

@app.route("/mobile-api/v1/job/benefits/<int:job_id>", methods=["GET","DELETE"])
@token
def benefits(current_user, job_id):
    if request.method == 'GET':
        return jsonify(benefitController.get_all_by_job(job_id)), 200
    elif request.method == 'DELETE':
        benefitController.delete_all(current_user,job_id)
        return jsonify({"response":"Deleted Benefits"}), 200