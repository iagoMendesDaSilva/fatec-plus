from app import database, serializer

class Subscription(database.Model):
    indication = database.Column(database.Integer, database.ForeignKey('user.id'))
    subscription = database.Column(database.Integer, database.ForeignKey('user.id'))
    job = database.Column(database.Integer, database.ForeignKey('job.id'), nullable=False)
    id = database.Column(database.Integer, primary_key=True, nullable=False, autoincrement=True)


class SubscriptionSchema(serializer.Schema):
    class Meta:
        fields =  ('id','job','indication','subscription')

subscription_schema = SubscriptionSchema()
subscriptions_schema = SubscriptionSchema(many=True)