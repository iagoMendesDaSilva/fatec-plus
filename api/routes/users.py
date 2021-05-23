from app import app, token
from flask import jsonify, request
from controllers import userController

@app.route("/mobile-api/v1/user/<int:id>", methods=["GET","PUT","DELETE"])
@token
def user(current_user,id):
        try:
            if request.method == 'GET':
                 return jsonify(userController.get(id)), 200
            elif request.method == 'DELETE':
                if userController.delete(current_user, id):
                    return jsonify({"response":"Deleted User"})
            elif request.method == 'PUT':
                if userController.update(current_user,request.get_json(), id):
                    return jsonify({"response":"Edited User"})
        except:
            return jsonify({'error': 'Not Found'}), 404

@app.route("/mobile-api/v1/users", methods=["GET"])
@token
def get_users(current_user):
        try:
            return jsonify(userController.get_all()), 200
        except:
            return jsonify({'response': 'Not Found'}), 404

@app.route("/mobile-api/v1/users/students", methods=["GET"])
@token
def get_students(current_user):
        try:
            return jsonify(userController.get_students()), 200
        except:
            return jsonify({'response': 'Not Found'}), 404

@app.route("/mobile-api/v1/users/teachers", methods=["GET"])
@token
def get_teachers(current_user):
        try:
            return jsonify(userController.get_teachers()), 200
        except:
            return jsonify({'response': 'Not Found'}), 404

@app.route("/mobile-api/v1/users/intership-coordinators", methods=["GET"])
@token
def get_intership_coordinators(current_user):
        try:
            return jsonify(userController.get_intership_coordinators()), 200
        except:
            return jsonify({'response': 'Not Found'}), 404

@app.route("/mobile-api/v1/users/companies", methods=["GET"])
@token
def get_companies(current_user):
        try:
            return jsonify(userController.get_companies()), 200
        except:
            return jsonify({'response': 'Not Found'}), 404

@app.route("/mobile-api/v1/users/admins", methods=["GET"])
@token
def get_admins(current_user):
        try:
            return jsonify(userController.get_admins()), 200
        except:
            return jsonify({'response': 'Not Found'}), 404

@app.route("/mobile-api/v1/users/limit=<int:limit>&offset=<int:offset>", methods=["GET"])
@token
def get_users_limit(current_user,limit,offset):
        try:
            return jsonify(userController.get_all(limit,offset)), 200
        except:
            return jsonify({'response': 'Not Found'}), 404

@app.route("/mobile-api/v1/users/students/limit=<int:limit>&offset=<int:offset>", methods=["GET"])
@token
def get_students_limit(current_user,limit,offset):
        try:
            return jsonify(userController.get_students(limit,offset)), 200
        except:
            return jsonify({'response': 'Not Found'}), 404

@app.route("/mobile-api/v1/users/teachers/limit=<int:limit>&offset=<int:offset>", methods=["GET"])
@token
def get_teachers_limit(current_user,limit,offset):
        try:
            return jsonify(userController.get_teachers(limit,offset)), 200
        except:
            return jsonify({'response': 'Not Found'}), 404

@app.route("/mobile-api/v1/users/intership-coordinators/limit=<int:limit>&offset=<int:offset>", methods=["GET"])
@token
def get_intership_coordinators_limit(current_user,limit,offset):
        try:
            return jsonify(userController.get_intership_coordinators(limit,offset)), 200
        except:
            return jsonify({'response': 'Not Found'}), 404

@app.route("/mobile-api/v1/users/companies/limit=<int:limit>&offset=<int:offset>", methods=["GET"])
@token
def get_companies_limit(current_user,limit,offset):
        try:
            return jsonify(userController.get_companies(limit,offset)), 200
        except:
            return jsonify({'response': 'Not Found'}), 404

@app.route("/mobile-api/v1/users/admins/limit=<int:limit>&offset=<int:offset>", methods=["GET"])
@token
def get_admins_limit(current_user,limit,offset):
        try:
            return jsonify(userController.get_admins(limit,offset)), 200
        except:
            return jsonify({'response': 'Not Found'}), 404