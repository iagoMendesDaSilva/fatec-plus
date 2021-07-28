from modelsDao import dao
from app.applications import database
from app.exceptions import ObjectInvalid
from models.subscription import Subscription,subscription_schema

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

    def get_by_job_user(self, job_id, user_id):
            subscribed = Subscription.query.filter(Subscription.job == job_id, Subscription.subscription == user_id).first()
            if not subscribed:
                raise ObjectInvalid
            return subscription_schema.dump(subscribed)

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