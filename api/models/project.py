from app.applications import database, serializer

class Project(database.Model):
    url = database.Column(database.Text)
    description = database.Column(database.String(300))
    name = database.Column(database.String(20), nullable=False)
    id_user = database.Column(database.Integer, database.ForeignKey('user.id'), nullable=False)
    id = database.Column(database.Integer, primary_key=True, nullable=False, autoincrement=True)

class ProjectSchema(serializer.SQLAlchemyAutoSchema):
    class Meta:
        model = Project

project_schema = ProjectSchema()
projects_schema = ProjectSchema(many=True)