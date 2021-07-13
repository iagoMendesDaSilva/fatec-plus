from models.user import User
from modelsDao import jobDao,dao
from flask import abort, make_response, jsonify
from app.exceptions import ObjectInvalid,CurrentUser
from models.job import Job, job_schema, jobs_schema

class JobController:
    def __init__(self):
        pass

    def create(self, current_user, data):
        try:
            if  self.coodinator_or_company(current_user.id):
                job = Job(
                date=data['date'],
                subject_email=data['subject_email'],
                description=data['description'],
                job=data['job'],
                active=data['active'],
                name=data['name'],
                internship=data['internship'],
                receive_by_email=data['receive_by_email'],
                company=current_user.id)
                dao.add(job)
                return True
            else:
                raise CurrentUser
        except CurrentUser as err:
            abort(make_response(jsonify({"response":"Without Permission."}), 403))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def get(self, id):
        try:
            return  job_schema.dump(dao.get_by_id(id,Job))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Job."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def get_all(self,limit=None,offset=None):
        try:
            return jobs_schema.dump(jobDao.get_all(limit,offset))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Job."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def get_all_by_company(self,id,limit=None,offset=None):
        try:
            return jobs_schema.dump(jobDao.get_all_by_company(id,limit,offset))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Job."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def delete(self,current_user,id):
        try:
            job  =dao.get_by_id(id,Job)
            if job:
                if current_user.id == job.company:
                    dao.remove(dao.get_by_id(id,Job))
                else:
                    raise CurrentUser
            else:
                raise ObjectInvalid
        except CurrentUser as err:
            abort(make_response(jsonify({"response":"Without Permission."}), 403))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Job."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))


    def delete_all(self,current_user):
        try:
            jobDao.delete_all(current_user.id)
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def update(self,current_user,data,id):
        try:
            job  =dao.get_by_id(id,Job)
            if job:
                if current_user.id == job.company:
                    jobDao.update_many(id,data)
                else:
                    raise CurrentUser
            else:
                raise ObjectInvalid
        except CurrentUser as err:
            abort(make_response(jsonify({"response":"Without Permission."}), 403))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Job."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def coodinator_or_company(self, id):
        user = dao.get_by_id(id, User)
        category = user.category.lower()
        return  True if category=='company' or category=='internship coordinator' else  False

jobController = JobController()