from app import app, token
from flask import jsonify, request
from controllers import subscriptionController

@app.route("/mobile-api/v1/job/subscribe/<int:job_id>", methods=["POST", "DELETE"])
@token
def subscibe(current_user,job_id):
    if request.method == 'POST':
        subscriptionController.create_subscribe(current_user,job_id)
        return jsonify({"response":"Subscribed"}), 200
    elif request.method == 'DELETE':
        subscriptionController.unsubscribe(current_user,job_id)
        return jsonify({"response":"OK"}), 200

@app.route("/mobile-api/v1/job/indicate/<int:job_id>", methods=["POST"])
@token
def indicate(current_user,job_id):
    subscriptionController.indicate(current_user,job_id, request.get_json())
    return jsonify({"response":"Indicated"}), 200

@app.route("/mobile-api/v1/job/send-resume/<int:job_id>", methods=["GET",])
@token
def send_resume(current_user,job_id):
    subscriptionController.send_resume(current_user,job_id)
    return jsonify({"response":"Resume Sended"}), 200

@app.route("/mobile-api/v1/job/subscriptions/<int:job_id>", methods=["GET"])
@token
def subscriptions_jobs(current_user,job_id):
    return jsonify(subscriptionController.get_all_by_job(job_id)), 200

@app.route("/mobile-api/v1/job/subscribed/<int:job_id>", methods=["GET"])
@token
def subscribed(current_user,job_id):
    return jsonify(subscriptionController.verifySubscription(current_user, job_id)), 200