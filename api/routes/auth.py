from app import app, token
from flask import jsonify, request
from controllers import userController

@app.route("/mobile-api/v1/auth/register", methods=["POST"])
def register():
    userController.create(request.get_json())
    return jsonify({"response":"Registered User"}), 200

@app.route("/mobile-api/v1/auth/login", methods=["POST"])
def login():
    user =  userController.login(request.get_json())
    return jsonify(user), 200

@app.route("/mobile-api/v1/auth/recovery", methods=["POST"])
@token
def recovery(current_user):
    userController.recovery(current_user.id,request.get_json())
    return jsonify({"response":"Password Changed"}), 200

@app.route("/mobile-api/v1/auth/confirm-email", methods=["POST"])
def confirm_email():
    id =  userController.confirm_email(request.get_json())
    return jsonify({'id': id}), 200

@app.route("/mobile-api/v1/auth/confirm-verification-code/<int:id>", methods=["POST"])
def confirm_verification_code(id):
        user =userController.confirm_verification_code(id,  request.get_json())
        return jsonify({'token': user.token, 'id': user.id}), 200