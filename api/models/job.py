from app.applications import database, serializer

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

    benefits = database.relationship('Benefit', backref='benefits', cascade="all, delete")
    vacancies = database.relationship('Subscription', backref="vacancies", cascade="all, delete")
    requirements = database.relationship('Requirement', backref='requirements', cascade="all, delete")

class JobSchema(serializer.Schema):
    class Meta:
        fields =  ('id','date','description','job','active','name','internship','receive_by_email', "benefits","vacancies","requirements","company")

job_schema = JobSchema()
jobs_schema = JobSchema(many=True)