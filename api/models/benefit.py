from app.applications import database, serializer

class Benefit(database.Model):
    description= database.Column(database.String(300))
    name = database.Column(database.String(30), nullable=False, unique=True)
    id_job = database.Column(database.Integer, database.ForeignKey('job.id'), nullable=False)
    id = database.Column(database.Integer, primary_key=True, nullable=False, autoincrement=True)

class BenefitSchema(serializer.Schema):
    class Meta:
        fields =  ('id','name','description','id_job')

benefit_schema = BenefitSchema()
benefits_schema = BenefitSchema(many=True)