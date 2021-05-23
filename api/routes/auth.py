from app import app, token
from flask import jsonify, request
from controllers import userController


@app.route("/mobile-api/v1/auth/register", methods=["POST"])
def register():
    data = request.get_json()
    if userController.create(data):
        return jsonify({"response":"Registered User"}), 200
    else:
        return jsonify({"response":"Can't register User"}), 404


@app.route("/mobile-api/v1/auth/login", methods=["POST"])
def login():
    data = request.get_json()
    if  user :=  userController.login(data['username'], data['password']):
        return jsonify({"response":user}), 200
    else:
        return jsonify({"response":"Not Found"}), 404

@app.route("/mobile-api/v1/auth/recovery/<int:id>", methods=["POST"])
@token
def recovery(current_user,id):
        try:
            data = request.get_json()
            if userController.recovery(current_user,data['password'],id):
                return jsonify({'response': 'Password Changed'}), 200
        except:
            return jsonify({'response': 'Not Found'}), 404

@app.route("/mobile-api/v1/auth/confirm-email", methods=["POST"])
def confirm_email():
        try:
            data = request.get_json()
            user =  userController.confirm_email(data['email'])
            if user:
                return jsonify({'id': user.id}), 200
        except:
            return jsonify({'response': 'Invalid Email'}), 404

@app.route("/mobile-api/v1/auth/confirm-verification-code/<int:id>", methods=["POST"])
def confirm_verification_code(id):
        try:
            data = request.get_json()
            user =userController.confirm_verification_code(id, data['verificationCode'])
            if user:
                return jsonify({'token': user.token, 'id': user.id}), 200
        except:
            return jsonify({'response': 'Invalid verification code'}), 404