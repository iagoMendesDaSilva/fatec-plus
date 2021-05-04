from app import database, serializer

class Course(database.Model):
    id = database.Column(database.Integer, primary_key=True, nullable=False, autoincrement=True)
    name = database.Column(database.String(50), nullable=False, unique=True)
    duration= database.Column(database.Integer, nullable=False)
    id_internship_coordinator = database.Column(database.Integer, database.ForeignKey('user.id'), nullable=False)

class CourseSchema(serializer.Schema):
    class Meta:
        fields =  ('id','name','duration','versionApp','type')

course_schema = CourseSchema()
courses_schema = CourseSchema(many=True)