from app.applications import database, serializer

class Subscription(database.Model):
    indication = database.Column(database.Integer, database.ForeignKey('user.id'))
    subscription = database.Column(database.Integer, database.ForeignKey('user.id'))
    company = database.Column(database.Integer, database.ForeignKey('user.id'))
    job = database.Column(database.Integer, database.ForeignKey('job.id'), nullable=False)
    id = database.Column(database.Integer, primary_key=True, nullable=False, autoincrement=True)


class SubscriptionSchema(serializer.SQLAlchemyAutoSchema):
    class Meta:
        model = Subscription

subscription_schema = SubscriptionSchema()
subscriptions_schema = SubscriptionSchema(many=True)