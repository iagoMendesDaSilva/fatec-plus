from app import database, serializer

class Project(database.Model):
    id = database.Column(database.Integer, primary_key=True, nullable=False, autoincrement=True)
    name = database.Column(database.String(20), nullable=False)
    url = database.Column(database.Text, nullable=True)
    description = database.Column(database.String(300), nullable=True)
    id_user = database.Column(database.Integer, database.ForeignKey('user.id'), nullable=False)

class ProjectSchema(serializer.Schema):
    class Meta:
        fields =  ('id','name','url','description','id_user')

project_schema = ProjectSchema()
projects_schema = ProjectSchema(many=True)