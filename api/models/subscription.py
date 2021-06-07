from app.applications import database, serializer


class Subscription(database.Model):
    indication = database.Column(database.Integer, database.ForeignKey('user.id'))
    job = database.Column(database.Integer, database.ForeignKey('job.id'), nullable=False)
    company = database.Column(database.Integer, database.ForeignKey('user.id'), nullable=False)
    subscription = database.Column(database.Integer, database.ForeignKey('user.id'), nullable=False)
    id = database.Column(database.Integer, primary_key=True, nullable=False, autoincrement=True)

class SubscriptionSchema(serializer.Schema):

    class Meta:
        fields = ('id','job','company','subscription','indication')

subscription_schema = SubscriptionSchema()
subscriptions_schema = SubscriptionSchema(many=True)