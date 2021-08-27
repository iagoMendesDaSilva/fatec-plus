from modelsDao import benefitDao,dao
from flask import abort, make_response, jsonify
from app.exceptions import ObjectInvalid,CurrentUser
from models import Job, Benefit,benefit_schema,benefits_schema

class BenefitController:
    def __init__(self):
        pass

    def create(self, current_user, data, id_job):
        try:
            job = dao.get_by_id(id_job, Job)
            if job.company == current_user.id:
                benefit = Benefit(
                name=data['name'],
                description=data['description'],
                id_job=id_job)
                dao.add(benefit)
                return True
            else:
                raise CurrentUser
        except CurrentUser as err:
            abort(make_response(jsonify({"response":"Without Permission."}), 403))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Benefit."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def create_many(self, current_user, datas, id_job):
        try:
            job = dao.get_by_id(id_job, Job)
            benefits = []
            if job.company == current_user.id:
                for data in datas:
                    benefit = Benefit(
                    name=data['name'],
                    description=data['description'],
                    id_job=id_job)
                    benefits.append(benefit)
                dao.add_all(benefits)
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
            return benefit_schema.dump(dao.get_by_id(id,Benefit))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Benefit."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def get_all_by_job(self,id_job):
        try:
            return benefits_schema.dump(dao.get_all_by_key('id_job',id_job,Benefit))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def delete(self,current_user,id):
        try:
            benefit  =dao.get_by_id(id,Benefit)
            job = dao.get_by_id(benefit.id_job, Job)
            if benefit and job:
                if current_user.id == job.company:
                    dao.remove(benefit)
                else:
                    raise CurrentUser
            else:
                raise ObjectInvalid
        except CurrentUser as err:
            abort(make_response(jsonify({"response":"Without Permission."}), 403))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Benefit."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def delete_all(self,current_user,job_id):
        try:
            job = dao.get_by_id(job_id,Job)
            if job.company == current_user.id:
                benefitDao.delete_all(job_id)
            else:
                raise CurrentUser
        except CurrentUser as err:
            abort(make_response(jsonify({"response":"Without Permission."}), 403))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def update(self,current_user,data,id):
        try:
            benefit  =dao.get_by_id(id,Benefit)
            job = dao.get_by_id(benefit.id_job, Job)
            if benefit and job:
                if current_user.id == job.company:
                    benefitDao.update_many(id,data)
                else:
                    raise CurrentUser
            else:
                raise ObjectInvalid
        except CurrentUser as err:
            abort(make_response(jsonify({"response":"Without Permission."}), 403))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Benefit."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

       
benefitController = BenefitController()