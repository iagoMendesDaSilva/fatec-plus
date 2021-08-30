from modelsDao import dao
from app.applications import database
from app.exceptions import ObjectInvalid
from models.subscription import Subscription,subscription_schema

class SubscriptionDao:

    def __init__(self):
        pass

    def get_by_job(self, job_id, user_id):
            subscribed = Subscription.query.filter(Subscription.job == job_id, Subscription.subscribed == user_id).first()
            if not subscribed:
                raise ObjectInvalid
            return subscription_schema.dump(subscribed)

    def unsubscribe(self, user, job_id):
            database.session.query(Subscription).filter(Subscription.job==job_id, Subscription.subscribed==user.id).delete()
            dao.commit()

subscriptionDao = SubscriptionDao()