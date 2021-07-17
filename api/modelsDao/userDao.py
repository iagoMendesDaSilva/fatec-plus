from modelsDao import dao
from models.user import User
from app import ObjectInvalid
from app.applications import database
from werkzeug.exceptions import BadRequest

class UserDao:

    def __init__(self):
        pass

    def get_all(self,category=None,limit=None,offset=None):
        if category:
            key = dao.get_key_formated('category',User)
            if limit and offset:
                return  User.query.filter(key == category).offset(offset).limit(limit).all()
            else:
                return User.query.filter(key == category).all()
        else:
            if limit and offset:
                return  User.query.offset(offset).limit(limit).all()
            else:
                return User.query.all()

    def update_many(self,id,data):
        object = dao.get_by_id(id,User)
        if object:
            for key in data:
                if hasattr(object, key) and self.key_is_valid(key):
                    setattr(object, key, data[key])
            dao.commit()
        else:
            raise ObjectInvalid

    def update_image(self,id, path):
        object = dao.get_by_id(id,User)
        if object:
            setattr(object, 'image', path)
            dao.commit()
        else:
            raise ObjectInvalid

    def check_email(self, email):
        object =  User.query.filter(User.email == email).first()
        if  object:
            raise BadRequest

    def check_username(self, username):
        object =  User.query.filter(User.username == username).first()
        if  object:
            raise BadRequest

    def key_is_valid(self, key):
        return key=='city' or key=='birth_date'  or key=='phone' or key=='studyng' or key=='description' or key=='address' or key=='job' or key=='name' or key=='internship' or key=='email' or key=='state' or key=='onesignal_playerID' or key == 'version_app' or key=='username'

userDao = UserDao()