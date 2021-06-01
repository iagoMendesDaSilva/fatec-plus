from app import app, token
from flask import jsonify, request
from controllers import languageController

@app.route("/mobile-api/v1/user/language", methods=["POST"])
@token
def language_create(current_user):
    languageController.create(current_user,request.get_json())
    return jsonify({"response":"Created Language"}), 200

@app.route("/mobile-api/v1/language/<int:id>", methods=["GET","PUT","DELETE"])
@token
def language(current_user, id):
    if request.method == 'GET':
        return jsonify(languageController.get(id)), 200
    elif request.method == 'PUT':
        languageController.update(current_user,request.get_json(),id)
        return jsonify({"response":"Updated Language"}), 200
    elif request.method == 'DELETE':
        languageController.delete(current_user,id)
        return jsonify({"response":"Deleted Language"}), 200

@app.route("/mobile-api/v1/user/languages", methods=["DELETE","POST"])
@token
def languages(current_user):
    if request.method == 'DELETE':
        languageController.delete_all(current_user)
        return jsonify({"response":"Deleted Languages"}), 200
    elif request.method == 'POST':
        languageController.create_many(current_user,request.get_json())
        return jsonify({"response":"Created Languages"}), 200