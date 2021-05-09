from app import database, serializer

class Course(database.Model):
    duration= database.Column(database.Integer, nullable=False)
    name = database.Column(database.String(50), nullable=False, unique=True)
    id = database.Column(database.Integer, primary_key=True, nullable=False, autoincrement=True)
    id_internship_coordinator = database.Column(database.Integer, database.ForeignKey('user.id'), nullable=False)

class CourseSchema(serializer.Schema):
    class Meta:
            fields =  ('id','name','duration','id_internship_coordinator')

course_schema = CourseSchema()
courses_schema = CourseSchema(many=True)