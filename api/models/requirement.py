from app.applications import database, serializer

class Requirement(database.Model):
    description= database.Column(database.String(300))
    level = database.Column(database.String(10), nullable=False)
    name = database.Column(database.String(30), nullable=False)
    mandatory = database.Column(database.Boolean, nullable=False)
    id_job = database.Column(database.Integer, database.ForeignKey('job.id'), nullable=False)
    id = database.Column(database.Integer, primary_key=True, nullable=False, autoincrement=True)

class RequirementSchema(serializer.SQLAlchemyAutoSchema):
    class Meta:
        model = Requirement

requirement_schema = RequirementSchema()
requirements_schema = RequirementSchema(many=True)