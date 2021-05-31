from modelsDao import requirementDao,dao
from flask import abort, make_response, jsonify
from app.exceptions import ObjectInvalid,CurrentUser
from models import Job, Requirement,requirement_schema,requirements_schema

class RequirementController:
    def __init__(self):
        pass

    def create(self, current_user, data, id_job):
        try:
            job = dao.get_by_id(id_job, Job)
            if job.company == current_user.id:
                requirement = Requirement(
                name=data['name'],
                level=data['level'],
                mandatory=data['mandatory'],
                description=data['description'],
                id_job=id_job)
                dao.add(requirement)
                return True
            else:
                raise CurrentUser
        except CurrentUser as err:
            abort(make_response(jsonify({"response":"Without Permission."}), 403))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Requirement."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def create_many(self, current_user, datas, id_job):
        try:
            job = dao.get_by_id(id_job, Job)
            requirements = []
            if job.company == current_user.id:
                for data in datas:
                    requirement = Requirement(
                    name=data['name'],
                    level=data['level'],
                    description=data['description'],
                    mandatory=data['mandatory'],
                    id_job=id_job)
                    requirements.append(requirement)
                dao.add_all(requirements)
                return True
            else:
                raise CurrentUser
        except CurrentUser as err:
            abort(make_response(jsonify({"response":"Without Permission."}), 403))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Benefit."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def get(self, id):
        try:
            return requirement_schema.dump(dao.get_by_id(id,Requirement))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Requirement."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def get_all_by_job(self,id_job):
        try:
            return requirements_schema.dump(dao.get_all_by_key('id_job',id_job,Requirement))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def delete(self,current_user,id):
        try:
            requirement  =dao.get_by_id(id,Requirement)
            job = dao.get_by_id(Requirement.id_job, Job)
            if Requirement and job:
                if current_user.id == job.company:
                    dao.remove(requirement)
                else:
                    raise CurrentUser
            else:
                raise ObjectInvalid
        except CurrentUser as err:
            abort(make_response(jsonify({"response":"Without Permission."}), 403))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Requirement."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))


    def delete_all(self,current_user,job_id):
        try:
            job = dao.get_by_id(job_id,Job)
            if job.company == current_user.id:
                requirementDao.delete_all(job_id)
            else:
                raise CurrentUser
        except CurrentUser as err:
            abort(make_response(jsonify({"response":"Without Permission."}), 403))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def update(self,current_user,data,id):
        try:
            requirement  =dao.get_by_id(id,Requirement)
            job = dao.get_by_id(requirement.id_job, Job)
            if Requirement and job:
                if current_user.id == job.company:
                    requirementDao.update_many(id,data)
                else:
                    raise CurrentUser
            else:
                raise ObjectInvalid
        except CurrentUser as err:
            abort(make_response(jsonify({"response":"Without Permission."}), 403))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Requirement."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

       
requirementController = RequirementController()