from app.notification import notification
from app.emailSender import emailSender
from modelsDao import dao, subscriptionDao
from flask import abort, make_response, jsonify
from app.exceptions import ObjectInvalid,CurrentUser
from models import  User, Job, Subscription,users_schema_list

class SubscriptionController:
    def __init__(self):
        pass

    def create_subscribe(self, current_user, job_id):
        try:
            job = dao.get_by_id(job_id,Job)
            if  current_user.category.lower() == "student":
                new_sub =Subscription(job=job_id, subscribed=current_user.id)
                dao.add(new_sub)
                notification.send([job.jobs.onesignal_playerID],"Nova inscrição",current_user.name+" se inscreveu para a vaga: "+job.name,{"id":current_user.id, "type":"Student"})
                return True
            else:
                raise CurrentUser
        except CurrentUser as err:
            abort(make_response(jsonify({"response":"Without Permission."}), 403))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Job or Indication."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 500))

    def indicate(self, current_user, job_id, data):
        try:
            job = dao.get_by_id(job_id,Job)
            student = dao.get_by_id(data['student'],User)
            company= dao.get_by_id(job.company, User)
            if current_user.category.lower()=="teacher":
                notification.send([student.onesignal_playerID],"Indicação","Você foi indicado para a vaga: "+job.name,{"id":job.id, "type":"Job", "indication":current_user.id})
                notification.send([company.onesignal_playerID],"Indicação",current_user.name+" Indicou " + student.name + " para a vaga: "+job.name,{"id":student.id, "type":"Student",})
            elif current_user.category.lower()=="company":
                notification.send([student.onesignal_playerID], "Solicitação",job.jobs.name+" solicitou você para a vaga: "+job.name,{"id":job.id, "type":"Job"})
            else:
                raise CurrentUser
        except CurrentUser as err:
            abort(make_response(jsonify({"response":"Without Permission."}), 403))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 500))


    def send_resume(self, current_user, job_id):
        try:
            job = dao.get_by_id(job_id,Job)
            emailSender.send_resume(current_user,job)
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 500))

    def unsubscribe(self, current_user, job_id):
        try:
            if current_user.category.lower()=='student':
                subscriptionDao.unsubscribe(current_user,job_id)
            else:
                raise CurrentUser
        except CurrentUser as err:
            abort(make_response(jsonify({"response":"Without Permission."}), 403))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Job."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 500))

    def get_all_by_job(self,job_id):
        try:
            subs = dao.get_all_by_key('job',job_id,Subscription)
            users = []
            for sub in subs:
                users.append(dao.get_by_id(sub.subscribed, User))
            return users_schema_list.dump(users)
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 500))

    def  verifySubscription (self, current_user, job_id):
        try:
            return subscriptionDao.get_by_job(job_id, current_user.id)
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Unsubscribed."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 500))


       
subscriptionController = SubscriptionController()