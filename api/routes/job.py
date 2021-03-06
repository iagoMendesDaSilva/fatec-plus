from app import app, token
from flask import jsonify, request
from controllers import jobController

@app.route("/mobile-api/v1/job", methods=["POST"])
@token
def create_vacancy(current_user):
        jobController.create(current_user,request.get_json())
        return jsonify({"response":"Registered Job"}), 200

@app.route("/mobile-api/v1/job/<int:id>", methods=["GET","PUT","DELETE"])
@token
def job(current_user,id):
        if request.method == 'GET':
            return jsonify(jobController.get(id)), 200
        elif request.method == 'DELETE':
            jobController.delete(current_user, id)
            return jsonify({"response":"Deleted Job"})
        elif request.method == 'PUT':
            jobController.update(current_user,request.get_json(), id)
            return jsonify({"response":"Edited Job"})

@app.route("/mobile-api/v1/jobs", methods=["GET"])
@token
def get_jobs(current_user):
        return jsonify(jobController.get_all()), 200

@app.route("/mobile-api/v1/jobs/<int:company_id>", methods=["GET"])
@token
def get_jobs_by_company(current_user,company_id):
        return jsonify(jobController.get_all_by_company(company_id)), 200