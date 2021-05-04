from app import database, serializer

class Benefit(database.Model):
    id = database.Column(database.Integer, primary_key=True, nullable=False, autoincrement=True)
    name = database.Column(database.String(30), nullable=False, unique=True)
    description= database.Column(database.String(300), nullable=True)
    id_job = database.Column(database.Integer, database.ForeignKey('job.id'), nullable=False)

class BenefitSchema(serializer.Schema):
    class Meta:
        fields =  ('id','name','description','id_job')

benefit_schema = BenefitSchema()
benefits_schema = BenefitSchema(many=True)