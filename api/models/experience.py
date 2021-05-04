from app import database, serializer

class Experience(database.Model):
    id = database.Column(database.Integer, primary_key=True, nullable=False, autoincrement=True)
    job = database.Column(database.String(100), nullable=False)
    company = database.Column(database.String(100), nullable=False)
    startYear = database.Column(database.Date, nullable=False)
    endYear = database.Column(database.Date, nullable=True)
    id_user = database.Column(database.Integer, database.ForeignKey('user.id'), nullable=False)

class ExperienceSchema(serializer.Schema):
    class Meta:
        fields =  ('id','job','company','startYear','endYear','id_user')

experience_schema = ExperienceSchema()
experiences_schema = ExperienceSchema(many=True)