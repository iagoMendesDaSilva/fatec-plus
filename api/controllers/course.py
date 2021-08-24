from models import  Job
from modelsDao import dao
from models.user import User
from app.exceptions import ObjectInvalid
from flask import abort, make_response, jsonify
from models.course import Course, courses_schema

class CourseController:
    def __init__(self):
        pass

    def get_all(self):
        try:
            courses = dao.get_all_by_model(Course)
            if len(courses)==0:
                raise ObjectInvalid
            return courses_schema.dump(courses)
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"No Courses."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))
       
courseController = CourseController()