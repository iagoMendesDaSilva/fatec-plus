from app.applications import database, serializer

class User(database.Model):
    token = database.Column(database.Text)
    image = database.Column(database.Text)
    city = database.Column(database.String(50))
    birth_date =  database.Column(database.Date)
    road = database.Column(database.String(100))
    recovery = database.Column(database.Integer)
    phone = database.Column(database.String(15))
    district= database.Column(database.String(100))
    studying = database.Column(database.String(50))
    version_app = database.Column(database.String(15))
    description = database.Column(database.String(300))
    recovery_time = database.Column(database.DateTime)
    number_address = database.Column(database.String(50))
    job = database.Column(database.Boolean, nullable=False)
    password = database.Column(database.Text, nullable=False)
    name = database.Column(database.String(50), nullable=False)
    internship = database.Column(database.Boolean, nullable=False)
    category = database.Column(database.String(22), nullable=False)
    onesignal_playerID = database.Column(database.String(40), unique=True)
    email = database.Column(database.String(50), nullable=False, unique=True)
    username = database.Column(database.String(20), nullable=False, unique=True)
    id = database.Column(database.Integer, primary_key=True, nullable=False, autoincrement=True)


    projects = database.relationship('Project', backref='projects',  cascade="all, delete")
    languages = database.relationship('Language', backref='languages', cascade="all, delete")
    formations = database.relationship('Formation', backref='formations', cascade="all, delete")
    experiences = database.relationship('Experience', backref='experiences', cascade="all, delete")
    social_networks = database.relationship('SocialNetwork', backref='social_networks', cascade="all, delete")

    jobs = database.relationship('Job', backref="jobs",  foreign_keys = 'Job.company')
    indications = database.relationship('Subscription', backref="indications",  foreign_keys = 'Subscription.indication')
    companies = database.relationship('Subscription', backref="companies",  foreign_keys = 'Subscription.company')
    subscriptions = database.relationship('Subscription', backref="subscriptions",  foreign_keys = 'Subscription.subscription')

class UserSchema(serializer.Schema):
    class Meta:
        fields =  ('id','token','category','image','city','birth_date','road','recovery','phone','district','studying','version_app','description','recovery_time','number_address','job','name','internship','onesignal_playerID','email','username','projects','languages','formations','experiences','social_networks')

class UserSchemaLogin(serializer.Schema):
    class Meta:
        fields =  ('id','token')

user_schema = UserSchema()
users_schema = UserSchema(many=True)
user_schema_login = UserSchemaLogin()