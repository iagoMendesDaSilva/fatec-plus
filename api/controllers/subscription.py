from app.notification import notification
from app.emailSender import emailSender
from modelsDao import dao, subscriptionDao
from flask import abort, make_response, jsonify
from app.exceptions import ObjectInvalid,CurrentUser
from models import  User, Job, Subscription,subscriptions_schema

class SubscriptionController:
    def __init__(self):
        pass

    def create_subscribe(self, current_user, data, job_id):
        try:
            job = dao.get_by_id(job_id,Job)
            if  current_user.category.lower() == "student":
                indication = None
                if data['indication'] != None:
                    teacher = dao.get_by_id(data['indication'],User)
                    if teacher.category.lower() == 'teacher' or teacher.category.lower() == 'internship coordinator':
                        indication = teacher.id
                    else:
                        raise ObjectInvalid
                subs =subscriptionDao.get_all_by_job_user(job_id,current_user.id)
                for sub in subs:
                    if sub.indication == data['indication']:
                        return True
                    elif sub.indication == None:
                        dao.update(sub.id,'indication',indication,Subscription)
                        return True
                if len(subs) >0 and indication!=None or len(subs)==0:
                        new_sub =Subscription(job=job_id, subscription=current_user.id, company=job.company,indication=indication)
                        emailSender.send_resume(current_user,job)
                        notification.send(job.jobs.onesignal_playerID,"Nova inscrição",current_user.name+" se inscreveu para a vaga: "+job.name,{"id":current_user.id})
                        dao.add(new_sub)
                return True
            else:
                student = dao.get_by_id(data['student'],User)
                if current_user.category.lower()=='company':
                    notification.send([student.onesignal_playerID],"Solicitação",job.jobs.name+" solicitou você para a vaga: "+job.name,{"id":job.id})
                if current_user.category.lower()=='internship coordinator' or  current_user.category.lower()=='teacher':
                    notification.send([student.onesignal_playerID],"Indicação","Você foi indicado para a vaga: "+job.name,{"id":job.id})
                    notification.send([job.jobs.onesignal_playerID],"Indicação",current_user.name+" indicou o aluno(a): "+student.name+" para a vaga: "+job.name,{"id":student.id})
                return True
        except CurrentUser as err:
            abort(make_response(jsonify({"response":"Without Permission."}), 403))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Job or Indication."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def unsubscribe(self, current_user, job_id):
        try:
            if current_user.category.lower()=='student' or current_user.category.lower() == 'teacher' or current_user.category.lower() == 'internship coordinator':
                subscriptionDao.unsubscribe(current_user,job_id)
            else:
                raise CurrentUser
        except CurrentUser as err:
            abort(make_response(jsonify({"response":"Without Permission."}), 403))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Job."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def get_all_by_job(self,job_id):
        try:
            return subscriptions_schema.dump(dao.get_all_by_key('job',job_id,Subscription))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def delete_all_by_job(self,current_user, job_id):
        try:
            if self.coodinator_or_company(current_user.id):
                subscriptionDao.delete_all_by_job(current_user.id,job_id)
            else:
                raise CurrentUser
        except CurrentUser as err:
            abort(make_response(jsonify({"response":"Without Permission."}), 403))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def delete_all(self,id):
        try:
            if self.coodinator_or_company(id):
                subscriptionDao.delete_all(id)
            else:
                raise CurrentUser
        except CurrentUser as err:
            abort(make_response(jsonify({"response":"Without Permission."}), 403))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def  coodinator_or_company (self, id):
        user = dao.get_by_id(id, User)
        category = user.category.lower()
        return  True if category=='company' or category=='internship coordinator' else  False
       
subscriptionController = SubscriptionController()