from models.user import User
from modelsDao import dao
from models import  Course, Job
from app.applications import database
from flask import abort, make_response, jsonify
from app.exceptions import ObjectInvalid

class CourseController:
    def __init__(self):
        pass

    def update(self,data,id):
        try:
            course = dao.get_by_id(id,Course)
            new_coordinator = dao.get_by_id(data['coordinator'],User)
            if new_coordinator.category.lower() == 'teacher':
                jobs = dao.get_all_by_key('company',course.id_internship_coordinator,Job)
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

       
courseController = CourseController()