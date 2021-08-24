from models.benefit import Benefit
from modelsDao import jobDao,dao
from models.user import User, user_schema_job
from models.requirement import Requirement
from flask import abort, make_response, jsonify
from app.exceptions import ObjectInvalid,CurrentUser
from models.job import Job, job_schema, jobs_schema

class JobController:
    def __init__(self):
        pass

    def create(self, current_user, data):
        try:
            if  current_user.category=="Company":
                job = Job(
                job=data['job'],
                date=data['date'],
                name=data['name'],
                internship=data['internship'],
                description=data['description'],
                subject_email=data['subject_email'],
                receive_by_email=data['receive_by_email'],
                company=current_user.id)
                dao.add(job)
                vacancy = dao.get_by_key('company',current_user.id, Job)
                if data['benefits']:
                    for benefit in data['benefits']:
                        item = Benefit(
                        name=benefit['name'],
                        description=benefit['description'],
                        id_job=vacancy.id)
                        dao.add(item)
                if data['requirements']:
                    for requirement in data['requirements']:
                        item = Requirement(
                        name=requirement['name'],
                        level=requirement['level'],
                        mandatory=requirement['mandatory'],
                        description=requirement['description'],
                        id_job=vacancy.id)
                        dao.add(item)
                return True
            else:
                raise CurrentUser
        except CurrentUser as err:
            abort(make_response(jsonify({"response":"Without Permission."}), 403))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def get(self, id):
        try:
            job = dao.get_by_id(id,Job)
            company = dao.get_by_id(job.company, User)
            return  {"job":job_schema.dump(job),"company":user_schema_job.dump(company)}
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

jobController = JobController()