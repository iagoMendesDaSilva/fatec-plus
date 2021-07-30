from enum import unique
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
    phone = database.Column(database.String(15))
    internship = database.Column(database.Boolean)
    studying = database.Column(database.String(50))
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
    id = database.Column(database.Integer, primary_key=True, nullable=False, autoincrement=True)


    projects = database.relationship('Project', backref='projects',  cascade="all, delete")
    languages = database.relationship('Language', backref='languages', cascade="all, delete")
    formations = database.relationship('Formation', backref='formations', cascade="all, delete")
    experiences = database.relationship('Experience', backref='experiences', cascade="all, delete")
    social_networks = database.relationship('SocialNetwork', backref='social_networks', cascade="all, delete")

    jobs = database.relationship('Job', backref="jobs",  foreign_keys = 'Job.company', cascade="all, delete")
    indications = database.relationship('Subscription', backref="indications",  foreign_keys = 'Subscription.indication', cascade="all, delete")
    companies = database.relationship('Subscription', backref="companies",  foreign_keys = 'Subscription.company', cascade="all, delete")
    subscriptions = database.relationship('Subscription', backref="subscriptions",  foreign_keys = 'Subscription.subscription', cascade="all, delete")

class UserSchema(serializer.SQLAlchemyAutoSchema):
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
user_schema_job = UserSchema(only=('id','image','email','phone','address','city','state','name'))
users_schema_list = UserSchema(only=('id','name','category','studying','image','city','state'), many=True)