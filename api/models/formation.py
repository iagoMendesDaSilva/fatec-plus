from app import database, serializer

class Formation(database.Model):
    id = database.Column(database.Integer, primary_key=True, nullable=False, autoincrement=True)
    title = database.Column(database.String(100), nullable=False)
    subtitle = database.Column(database.String(100), nullable=True)
    startYear = database.Column(database.Date, nullable=False)
    endYear = database.Column(database.Date, nullable=True)
    workload = database.Column(database.Time, nullable=True)
    id_user = database.Column(database.Integer, database.ForeignKey('user.id'), nullable=False)

class FormationSchema(serializer.Schema):
    class Meta:
        fields =  ('id','title','subtitle','startYear','endYear','worload','id_user')

formation_schema = FormationSchema()
formations_schema = FormationSchema(many=True)