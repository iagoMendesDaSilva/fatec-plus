import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = os.getenv("FATEC_PLUS_SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("FATEC_PLUS_URL_DATABASE")

database = SQLAlchemy(app)
serializer = Marshmallow(app)
