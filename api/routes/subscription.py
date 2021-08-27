from app import app, token
from flask import jsonify, request
from controllers import subscriptionController

@app.route("/mobile-api/v1/job/subscribe/<int:job_id>", methods=["POST", "DELETE"])
@token
def subscibe(current_user,job_id):
    if request.method == 'POST':
        subscriptionController.create_subscribe(current_user,request.get_json(),job_id)
        return jsonify({"response":"Subscribed"}), 200
    elif request.method == 'DELETE':
        subscriptionController.unsubscribe(current_user,job_id)
        return jsonify({"response":"OK"}), 200

@app.route("/mobile-api/v1/job/send-resume/<int:job_id>", methods=["GET",])
@token
def send_resume(current_user,job_id):
    subscriptionController.send_resume(current_user,job_id)
    return jsonify({"response":"Resume Sended"}), 200

@app.route("/mobile-api/v1/job/subscriptions/<int:job_id>", methods=["GET","DELETE"])
@token
def subscriptions_jobs(current_user,job_id):
    if request.method == 'GET':
        return jsonify(subscriptionController.get_all_by_job(job_id)), 200
    elif request.method == 'DELETE':
        subscriptionController.delete_all_by_job(current_user,job_id)
        return jsonify({"response":"Deleted Subscriptions"}), 200

@app.route("/mobile-api/v1/job/subscribed/<int:job_id>", methods=["GET"])
@token
def subscribed(current_user,job_id):
    return jsonify(subscriptionController.verifySubscription(current_user, job_id)), 200