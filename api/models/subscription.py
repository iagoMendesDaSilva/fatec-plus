from app.applications import database, serializer

class Subscription(database.Model):
    job = database.Column(database.Integer, database.ForeignKey('job.id'), nullable=False)
    subscribed = database.Column(database.Integer, database.ForeignKey('user.id'), nullable=False)
    id = database.Column(database.Integer, primary_key=True, nullable=False, autoincrement=True)

class SubscriptionSchema(serializer.Schema):

    class Meta:
        model = Subscription
        include_fk = True

subscription_schema = SubscriptionSchema()
subscriptions_schema = SubscriptionSchema(many=True)