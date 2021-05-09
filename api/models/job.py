from app import database, serializer

class Job(database.Model):
    date = database.Column(database.Date)
    description = database.Column(database.String(300))
    job = database.Column(database.Boolean, nullable=False)
    active = database.Column(database.Boolean, nullable=False)
    name = database.Column(database.String(20), nullable=False)
    internship = database.Column(database.Boolean, nullable=False)
    receive_by_email = database.Column(database.Boolean, nullable=False)
    company = database.Column(database.Integer, database.ForeignKey('user.id'), nullable=False)
    id = database.Column(database.Integer, primary_key=True, nullable=False, autoincrement=True)

    benefits = database.relationship('Benefit', backref='benefits')
    vacancies = database.relationship('Subscription', backref="vacancies")
    requirements = database.relationship('Requirement', backref='requirements')

class JobSchema(serializer.Schema):
    class Meta:
        fields =  ('id','date','description','job','active','name','intership','receive_by_email','company')

job_schema = JobSchema()
jobs_schema = JobSchema(many=True)