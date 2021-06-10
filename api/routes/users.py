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

@app.route("/mobile-api/v1/users", methods=["GET"])
@token
def get_users(current_user):
        return jsonify(userController.get_all()), 200

@app.route("/mobile-api/v1/users/students", methods=["GET"])
@token
def get_students(current_user):
        return jsonify(userController.get_all('student')), 200

@app.route("/mobile-api/v1/users/teachers", methods=["GET"])
@token
def get_teachers(current_user):
        return jsonify(userController.get_all('teacher')), 200

@app.route("/mobile-api/v1/users/internship-coordinators", methods=["GET"])
@token
def get_internship_coordinators(current_user):
        return jsonify(userController.get_all('internship coordinator')), 200

@app.route("/mobile-api/v1/users/companies", methods=["GET"])
@token
def get_companies(current_use):
        return jsonify(userController.get_all('company')), 200

@app.route("/mobile-api/v1/users/admins", methods=["GET"])
@token
def get_admins(current_user):
        return jsonify(userController.get_all('admin')), 200

@app.route("/mobile-api/v1/users/limit=<int:limit>&offset=<int:offset>", methods=["GET"])
@token
def get_users_limit(current_user,limit,offset):
        return jsonify(userController.get_all(None,limit,offset)), 200

@app.route("/mobile-api/v1/users/students/limit=<int:limit>&offset=<int:offset>", methods=["GET"])
@token
def get_students_limit(current_user,limit,offset):
        return jsonify(userController.get_all('student',limit,offset)), 200

@app.route("/mobile-api/v1/users/teachers/limit=<int:limit>&offset=<int:offset>", methods=["GET"])
@token
def get_teachers_limit(current_user,limit,offset):
        return jsonify(userController.get_all('teacher',limit,offset)), 200

@app.route("/mobile-api/v1/users/internship-coordinators/limit=<int:limit>&offset=<int:offset>", methods=["GET"])
@token
def get_internship_coordinators_limit(current_user,limit,offset):
        return jsonify(userController.get_all('internship coordinator',limit,offset)), 200

@app.route("/mobile-api/v1/users/companies/limit=<int:limit>&offset=<int:offset>", methods=["GET"])
@token
def get_companies_limit(current_user,limit,offset):
        return jsonify(userController.get_all('company',limit,offset)), 200

@app.route("/mobile-api/v1/users/admins/limit=<int:limit>&offset=<int:offset>", methods=["GET"])
@token
def get_admins_limit(current_user,limit,offset):
        return jsonify(userController.get_all('admin',limit,offset)), 200

@app.route("/mobile-api/v1/user/image-profile", methods=["PUT"])
@token
def image_profile(current_user):
        userController.profile_image(current_user,request.get_json())
        return jsonify({"response":"Edited Image"}), 200

@app.route("/mobile-api/v1/user/image-profile/<int:id>", methods=["GET"])
@token
def get_image_profile(current_user,id):
        path = userController.get_image_profile(id)
        return send_file(path, mimetype="image/jpg")