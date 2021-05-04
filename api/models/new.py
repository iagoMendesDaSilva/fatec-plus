from app import database, serializer

class New(database.Model):
    id = database.Column(database.Integer, primary_key=True, nullable=False, autoincrement=True)
    title = database.Column(database.String(30), nullable=False)
    message= database.Column(database.String(200), nullable=False)
    versionApp= database.Column(database.String(15), nullable=False)
    type= database.Column(database.String(8), nullable=False)

class NotificationSchema(serializer.Schema):
    class Meta:
        fields =  ('id','title','message','versionApp','type')

notification_schema = NotificationSchema()
notifications_schema = NotificationSchema(many=True)