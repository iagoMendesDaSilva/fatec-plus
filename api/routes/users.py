from app import app, token
from controllers import userController
from flask import jsonify, request, send_file

@app.route("/mobile-api/v1/user/<int:id>", methods=["GET","PUT","DELETE"])
@token
def user(current_user,id):
    if request.method == 'GET':
        return jsonify(userController.get(id)), 200
    elif request.method == 'DELETE':
        userController.delete(current_user, id)
        return jsonify({"response":"Deleted User"}), 200
    elif request.method == 'PUT':
        userController.update(current_user,request.get_json(), id)
        return jsonify({"response":"Edited User"}), 200

@app.route("/mobile-api/v1/users/students", methods=["GET"])
@token
def get_students(current_user):
        return jsonify(userController.get_all('student')), 200

@app.route("/mobile-api/v1/users/teachers", methods=["GET"])
@token
def get_teachers(current_user):
        return jsonify(userController.get_all('teacher')), 200

@app.route("/mobile-api/v1/users/companies", methods=["GET"])
@token
def get_companies(current_user):
        return jsonify(userController.get_all('company')), 200

@app.route("/mobile-api/v1/user/image-profile", methods=["PUT"])
@token
def image_profile(current_user):
        userController.profile_image(current_user,request.get_json())
        return jsonify({"response":"Edited Image"}), 200

@app.route("/mobile-api/v1/user/image-profile/<int:id>", methods=["GET"])
def get_image_profile(id):
        path = userController.get_image_profile(id)
        return send_file(path, mimetype="image/jpg")