from app.applications import database, serializer

class Course(database.Model):
    duration= database.Column(database.Integer, nullable=False)
    name = database.Column(database.String(50), nullable=False, unique=True)
    id = database.Column(database.Integer, primary_key=True, nullable=False, autoincrement=True)

class CourseSchema(serializer.SQLAlchemyAutoSchema):
    class Meta:
            model = Course

course_schema = CourseSchema()
courses_schema = CourseSchema(many=True)