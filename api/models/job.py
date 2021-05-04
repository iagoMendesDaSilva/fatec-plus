from app import database, serializer

class Job(database.Model):
    id = database.Column(database.Integer, primary_key=True, nullable=False, autoincrement=True)
    name = database.Column(database.String(20), nullable=False)
    id_job = database.Column(database.Integer, nullable=False)
    date = database.Column(database.Date, nullable=True)
    job = database.Column(database.Boolean, nullable=False)
    internship = database.Column(database.Boolean, nullable=False)
    active = database.Column(database.Boolean, nullable=False)
    category = database.Column(database.String(20), nullable=False)
    receiveByEmail = database.Column(database.Boolean, nullable=False)
    description = database.Column(database.String(300), nullable=True)
    id_company = database.Column(database.Integer, database.ForeignKey('user.id'), nullable=False)
    benefits = database.relationship('Benefit', backref='job')
    requirements = database.relationship('Requirement', backref='job')

class JobSchema(serializer.Schema):
    class Meta:
        fields =  ('id','name','id_job','date','job','internship','active','category','receiveByEmail','description','id_company')

job_schema = JobSchema()
jobs_schema = JobSchema(many=True)