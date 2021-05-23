from app.applications import database, serializer

class New(database.Model):
    type= database.Column(database.String(8), nullable=False)
    title = database.Column(database.String(30), nullable=False)
    message= database.Column(database.String(200), nullable=False)
    version_app= database.Column(database.String(15), nullable=False)
    id = database.Column(database.Integer, primary_key=True, nullable=False, autoincrement=True)

class NewSchema(serializer.Schema):
    class Meta:
        fields =  ('id','title','message','version_app','type')

new_schema = NewSchema()
news_schema = NewSchema(many=True)