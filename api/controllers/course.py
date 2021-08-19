from models import  Job
from modelsDao import dao
from models.user import User
from app.exceptions import ObjectInvalid
from flask import abort, make_response, jsonify
from models.course import Course, courses_schema

class CourseController:
    def __init__(self):
        pass

    def update(self,data,id):
        try:
            course = dao.get_by_id(id,Course)
            new_coordinator = dao.get_by_id(data['coordinator'],User)
            if new_coordinator.category.lower() == 'teacher':
                jobs = dao.get_all_by_key('company',course.id_internship_coordinator,Job)
                if course.id_internship_coordinator:
                    dao.update(course.id_internship_coordinator,'category','Teacher',User)
                dao.update(new_coordinator.id,'category','Internship Coordinator',User)
                dao.update(course.id,'id_internship_coordinator',new_coordinator.id,Course)
                for job in jobs:
                    setattr(job,'company',new_coordinator.id)
                dao.commit()
            else:
                raise ObjectInvalid
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Course or User."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

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