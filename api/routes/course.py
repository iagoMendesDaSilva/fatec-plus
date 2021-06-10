
from flask import jsonify, request
from app import app, token_admin
from controllers import courseController

@app.route("/mobile-api/v1/course/<int:id>", methods=["POST"])
@token_admin
def change_internship_coordinator(current_user, id):
    courseController.update(request.get_json(),id)
    return jsonify({"response":"Changed internship coordinator"}), 200