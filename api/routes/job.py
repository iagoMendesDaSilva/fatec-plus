from app import app, token
from flask import jsonify, request
from controllers import jobController

@app.route("/mobile-api/v1/job", methods=["POST","DELETE"])
@token
def create_vacancy(current_user):
        data = request.get_json()
        try:
            if request.method == 'POST':
                if jobController.create(current_user,data):
                    return jsonify({"response":"Registered Job"}), 200
                else:
                    return jsonify({"response": "Can't create job"})
            elif request.method == 'DELETE':
                if jobController.delete_all(current_user):
                    return jsonify({"response":"Deleted User"})
                else:
                    return jsonify({"response": "Can't delete all jobs"})
        except:
            return jsonify({'error': 'Not Found'}), 404


@app.route("/mobile-api/v1/job/<int:id>", methods=["GET","PUT","DELETE"])
@token
def job(current_user,id):
        try:
            if request.method == 'GET':
                 return jsonify(jobController.get(id)), 200
            elif request.method == 'DELETE':
                if jobController.delete(current_user, id):
                    return jsonify({"response":"Deleted Job"})
                else:
                    return jsonify({"response":"Can't delete Job"})
            elif request.method == 'PUT':
                if jobController.update(current_user,request.get_json(), id):
                    return jsonify({"response":"Edited Job"})
                else:
                    return jsonify({"response":"Can't update Job"})
        except:
            return jsonify({'error': 'Not Found'}), 404

@app.route("/mobile-api/v1/jobs", methods=["GET"])
@token
def get_jobs(current_user):
        try:
            return jsonify(jobController.get_all()), 200
        except:
            return jsonify({'response': 'Not Found'}), 404

@app.route("/mobile-api/v1/jobs/limit=<int:limit>&offset=<int:offset>", methods=["GET"])
@token
def get_jobs_limit(current_user,limit,offset):
        try:
            return jsonify(jobController.get_all(limit,offset)), 200
        except:
            return jsonify({'response': 'Not Found'}), 40

@app.route("/mobile-api/v1/jobs/<int:company_id>", methods=["GET"])
@token
def get_jobs_by_company(current_user,company_id):
        try:
            return jsonify(jobController.get_all_by_company(company_id)), 200
        except:
            return jsonify({'response': 'Not Found'}), 404

@app.route("/mobile-api/v1/jobs/company=<int:company_id>&limit=<int:limit>&offset=<int:offset>", methods=["GET"])
@token
def get_jobs_by_company_limit(current_user,company_id,limit,offset):
        try:
            return jsonify(jobController.get_all_by_company(company_id,limit,offset)), 200
        except:
            return jsonify({'response': 'Not Found'}), 40