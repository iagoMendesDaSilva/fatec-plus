from app import database, serializer

class Notification(database.Model):
    title = database.Column(database.String(30), nullable=False, unique=True)
    message= database.Column(database.String(300), nullable=False, unique=True)
    id = database.Column(database.Integer, primary_key=True, nullable=False, autoincrement=True)

class NotificationSchema(serializer.Schema):
    class Meta:
        fields =  ('id','title','message')

notification_schema = NotificationSchema()
notifications_schema = NotificationSchema(many=True)