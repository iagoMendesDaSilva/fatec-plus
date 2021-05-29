from app.applications import database, serializer

class Formation(database.Model):
    start_year = database.Column(database.Date)
    end_year = database.Column(database.Date)
    workload = database.Column(database.Time)
    title = database.Column(database.String(100))
    subtitle = database.Column(database.String(100))
    id_user = database.Column(database.Integer, database.ForeignKey('user.id'), nullable=False)
    id = database.Column(database.Integer, primary_key=True, nullable=False, autoincrement=True)

class FormationSchema(serializer.SQLAlchemyAutoSchema):
    class Meta:
        model = Formation

formation_schema = FormationSchema()
formations_schema = FormationSchema(many=True)