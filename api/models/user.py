from app import database, serializer

class User(database.Model):
    id = database.Column(database.Integer, primary_key=True, nullable=False, autoincrement=True)
    name = database.Column(database.String(50), nullable=False)
    username = database.Column(database.String(20), nullable=False, unique=True)
    password = database.Column(database.String(20), nullable=False)
    email = database.Column(database.String(50), nullable=False, unique=True)
    phone = database.Column(database.String(15), nullable=False)
    address = database.Column(database.String(200), nullable=True)
    birthDate =  database.Column(database.Date, nullable=True)
    studying = database.Column(database.String(50), nullable=True)
    job = database.Column(database.Boolean, nullable=False)
    internship = database.Column(database.Boolean, nullable=False)
    occupation_area = database.Column(database.String(100), nullable=True)
    description = database.Column(database.String(300), nullable=True)
    category = database.Column(database.String(22), nullable=False)
    image = database.Column(database.Text, nullable=True)
    token = database.Column(database.Text, nullable=True)
    recovery = database.Column(database.Integer, nullable=True)
    recoveryTime = database.Column(database.DateTime, nullable=True)
    versionApp = database.Column(database.String(15), nullable=True)
    onesignal_playerID = database.Column(database.String(40), nullable=True, unique=True)
    courses = database.relationship('Course', backref='user')
    experiences = database.relationship('Experience', backref='user')
    formations = database.relationship('Formation', backref='user')
    languages = database.relationship('Language', backref='user')
    projects = database.relationship('Project', backref='user')
    socialNetworks = database.relationship('SocialNetwork', backref='user')

class UserSchema(serializer.Schema):
    class Meta:
        fields =  ('id','name')

user_schema = UserSchema()
users_schema = UserSchema(many=True)


