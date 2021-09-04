from enum import unique
from models.course import CourseSchema
from models.job import JobSchema
from models.project import ProjectSchema
from models.language import LanguageSchema
from models.formation import FormationSchema
from app.applications import database, serializer
from models.experience import ExperienceSchema
from models.subscription import SubscriptionSchema
from models.socialNetwork import SocialNetworkSchema

class User(database.Model):
    token = database.Column(database.Text)
    image = database.Column(database.Text)
    job = database.Column(database.Boolean)
    city = database.Column(database.String(50))
    birth_date =  database.Column(database.Date)
    state = database.Column(database.String(50))
    recovery = database.Column(database.Integer)
    phone = database.Column(database.String(17))
    internship = database.Column(database.Boolean)
    address = database.Column(database.String(300))
    version_app = database.Column(database.String(15))
    description = database.Column(database.String(300))
    recovery_time = database.Column(database.DateTime)
    onesignal_playerID = database.Column(database.String(40))
    password = database.Column(database.Text, nullable=False)
    name = database.Column(database.String(50), nullable=False)
    category = database.Column(database.String(22), nullable=False)
    email = database.Column(database.String(50), nullable=False, unique=True)
    username = database.Column(database.String(20), nullable=False, unique=True)
    studying= database.Column(database.Integer, database.ForeignKey('course.id'), nullable=True)
    id = database.Column(database.Integer, primary_key=True, nullable=False, autoincrement=True)

    course = database.relationship('Course', backref='course')
    projects = database.relationship('Project', backref='projects',  cascade="all, delete")
    languages = database.relationship('Language', backref='languages', cascade="all, delete")
    formations = database.relationship('Formation', backref='formations', cascade="all, delete")
    experiences = database.relationship('Experience', backref='experiences', cascade="all, delete")
    social_networks = database.relationship('SocialNetwork', backref='social_networks', cascade="all, delete")

    jobs = database.relationship('Job', backref="jobs",  foreign_keys = 'Job.company', cascade="all, delete")
    subscriptions = database.relationship('Subscription', backref="subscriptions",  foreign_keys = 'Subscription.subscribed', cascade="all, delete")

class UserSchema(serializer.SQLAlchemyAutoSchema):
    course = serializer.Nested(CourseSchema)
    projects = serializer.Nested(ProjectSchema, many=True)
    languages = serializer.Nested(LanguageSchema, many=True)
    formations = serializer.Nested(FormationSchema, many=True)
    experiences = serializer.Nested(ExperienceSchema, many=True)
    social_networks = serializer.Nested(SocialNetworkSchema, many=True)

    class Meta:
        model = User     

user_schema = UserSchema()
users_schema = UserSchema(many=True)
user_schema_login = UserSchema(only=('id','token','category'))
users_schema_list = UserSchema(only=('id','name','category','image','city','state', 'course'), many=True)
user_schema_company = UserSchema(only=('id','image','email','phone','address','city','state','name'))