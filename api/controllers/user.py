import datetime
from flask import abort
from random import randint
from app import create_token
from modelsDao import userDao, dao
from models.user import user_schema_login,users_schema,user_schema,User
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

    def login(self, username, password):
        user = dao.get_by_key('username',username, User)
        if check_password_hash(user.password,password):
            try:
                token =  create_token(user)
                dao.update(user.id,'token',token,User)
                return user_schema_login.dump(user)
            except Exception as err:
                abort(403, err.args)
        abort(404)

    def get(self, id):
        return user_schema.dump(dao.get_by_id(id,User))

    def get_all(self,limit=None,offset=None):
        return users_schema.dump(userDao.get_all(limit,offset))

    def delete(self,current_user,id):
        if current_user.id == id:
            dao.remove(dao.get_by_id(id,User))
            return True
        return False

    def update(self,current_user,data,id):
        if current_user.id == id:
            userDao.update_many(id,data,User)
            return True
        return False

    def recovery(self,current_user,password,id):
        if current_user.id == id:
            new_password =generate_password_hash(password)
            data ={"password": new_password, "recovery":None, "recovery_time":None}
            dao.update_many(id,data,User)
            return True
        return False

    def confirm_email(self,email):
        user =  dao.get_by_key('email',email,User)
        if user:
            recovery = randint(10000, 99999)
            recovery_time = datetime.datetime.now() + datetime.timedelta(minutes=15)
            data = {"recovery":recovery,"recovery_time":recovery_time}
            dao.update_many(user.id,data,User)
            return user
        return False

    def confirm_verification_code(self,id,code):
        user = dao.get_by_id(id,User)
        time = datetime.datetime.now() - datetime.timedelta(minutes=15)
        if user.recovery==code and user.recovery_time>time:
            token =  create_token(user)
            dao.update(user.id,'token',token,User)
            return user
        return False

    def get_students(self,limit=None,offset=None):
        return users_schema.dump(userDao.get_students(limit, offset))

    def get_teachers(self,limit=None,offset=None):
        return users_schema.dump(userDao.get_teachers(limit, offset))

    def get_companies(self,limit=None,offset=None):
        return users_schema.dump(userDao.get_companies(limit, offset))
    
    def get_intership_coordinators(self,limit=None,offset=None):
        return users_schema.dump(userDao.get_intership_coordinators(limit, offset))

    def get_admins(self,limit=None,offset=None):
        return users_schema.dump(userDao.get_admins(limit, offset))


       
userController = UserController()