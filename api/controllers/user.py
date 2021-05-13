from models import *
from flask import abort
from modelsDao import *  
from app import create_token
from werkzeug.security import generate_password_hash, check_password_hash

class UserController:
    def __init__(self):
        pass

    def create(self, data):
        password =generate_password_hash(data['password'])
        user = User(
        token=None,
        job=data['job'],
        city=data['city'],
        recovery=None,
        road=data['road'],
        version_app=None,
        email=data['email'],
        name=data['name'],
        image=data['image'],
        phone=data['phone'],
        recovery_time=None,
        district=data['district'],
        password = password,
        studying=data['studying'],
        category=data['category'],
        onesignal_playerID=None,
        username=data['username'],
        internship=data['internship'],
        birth_date=data['birth_date'],
        description=data['description'],
        number_address=data['number_address'])
        dao.add(user)

    def login(self, data):
        user = dao.get_by_key('username',data['username'], User)
        if check_password_hash(user.password, data['password']):
            try:
                token =  create_token(user)
                dao.update(user.id,'token',token,User)
                return user_schema_login.dump(user)
            except Exception as err:
                abort(403, err.args)
        abort(404)

    def get_user(self, id):
        return user_schema.dump(dao.get_by_id(id,User))


    def get_users(self):
        return users_schema.dump(dao.get_all_by_model(User))


       




userController = UserController()