from modelsDao import jobDao,dao
from flask import abort, make_response, jsonify
from models import Job,jobs_schema,job_schema
from app.exceptions import ObjectInvalid,CurrentUser

class JobController:
    def __init__(self):
        pass

    def create(self, current_user,create_job, data):
        try:
            if  create_job:
                job = Job(
                date=data['date'],
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
                raise Exception
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def get(self, id):
        try:
            return job_schema.dump(dao.get_by_id(id,Job))
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
                    jobDao.update_many(id,data,Job)
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

       
jobController = JobController()