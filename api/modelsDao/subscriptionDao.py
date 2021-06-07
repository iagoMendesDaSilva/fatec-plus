from modelsDao import dao
from app.applications import database
from models.subscription import Subscription
from app.exceptions import ObjectInvalid

class SubscriptionDao:

    def __init__(self):
        pass

    def delete_all_by_job(self,id, job_id):
        database.session.query(Subscription).filter(Subscription.job==job_id, Subscription.company==id).delete()
        dao.commit()

    def delete_all(self,id):
        database.session.query(Subscription).filter(Subscription.company==id).delete()
        dao.commit()

    def get_all_by_job_user(self,job_id,user_id):
            return Subscription.query.filter(Subscription.job == job_id, Subscription.subscription == user_id).all()

    def unsubscribe(self, user, job_id):
        if user.category.lower()=='student':
            database.session.query(Subscription).filter(Subscription.job==job_id, Subscription.subscription==user.id).delete()
            dao.commit()
        else:
            sub = Subscription.query.filter(Subscription.job == job_id, Subscription.indication == user.id).first()
            if not sub:
                return True
            dao.update(sub.id,'indication',None,Subscription)

subscriptionDao = SubscriptionDao()