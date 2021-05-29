from app.applications import database, serializer

class Experience(database.Model):
    end_year = database.Column(database.Date, nullable=True)
    start_year = database.Column(database.Date, nullable=False)
    job = database.Column(database.String(100), nullable=False)
    company = database.Column(database.String(100), nullable=False)
    id_user = database.Column(database.Integer, database.ForeignKey('user.id'), nullable=False)
    id = database.Column(database.Integer, primary_key=True, nullable=False, autoincrement=True)

class ExperienceSchema(serializer.SQLAlchemyAutoSchema):
    class Meta:
        model = Experience

experience_schema = ExperienceSchema()
experiences_schema = ExperienceSchema(many=True)