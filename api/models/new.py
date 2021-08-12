from app.applications import database, serializer

class New(database.Model):
    type= database.Column(database.String(12), nullable=False)
    title = database.Column(database.String(50), nullable=False)
    message= database.Column(database.String(300), nullable=False)
    version_app= database.Column(database.String(15), nullable=False)
    id = database.Column(database.Integer, primary_key=True, nullable=False, autoincrement=True)

class NewSchema(serializer.SQLAlchemyAutoSchema):
    class Meta:
        model = New

new_schema = NewSchema()
news_schema = NewSchema(many=True)