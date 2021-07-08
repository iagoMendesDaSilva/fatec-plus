import os
import base64
import datetime
from random import randint
from modelsDao import userDao, dao
from app.emailSender import emailSender
from werkzeug.exceptions import BadRequest
from flask import abort, make_response, jsonify
from app import create_token, ObjectInvalid, CurrentUser
from models.user import user_schema_login,users_schema,user_schema,User
from werkzeug.security import generate_password_hash, check_password_hash

class UserController:
    def __init__(self):
        pass

    def create(self, data):
        try:
            password =generate_password_hash(data['password'])
            if  data['category']=='Student' or data['category']=='Company' or data['category']=='Teacher':
                user = User(
                token=None,
                image=None,
                job=data['job'],
                city=data['city'],
                recovery=None,
                state=data['state'],
                version_app=None,
                email=data['email'],
                name=data['name'],
                phone=data['phone'],
                recovery_time=None,
                password = password,
                address=data['address'],
                studying=data['studying'],
                category=data['category'],
                onesignal_playerID=None,
                username=data['username'],
                internship=data['internship'],
                birth_date=data['birth_date'],
                description=data['description'])
                userDao.check_email(data['email'])
                userDao.check_username(data['username'])
                dao.add(user)
                if(data['image']!=None):
                    self.profile_image(dao.get_by_key('username',data['username'],User),data)   
            else:
                raise Exception
        except BadRequest as err:
            abort(make_response(jsonify({"response":"  Invalid parameters."}), 400))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem"}), 502))

    def login(self, data):
        try:
            user = dao.get_by_key('username',data['username'], User)
            password = check_password_hash(user.password,data['password'])
            if password:
                token =  create_token(user)
                dao.update(user.id,'token',token,User)
                return user_schema_login.dump(user)
            else:
                raise ObjectInvalid
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid User."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def get(self, id):
        try:
            return user_schema.dump(dao.get_by_id(id,User))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid User."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def get_all(self,category=None,limit=None,offset=None):
        try:
            return users_schema.dump(userDao.get_all(category,limit,offset))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid User."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def delete(self,current_user,id):
        try:
            if current_user.id == id:
                 dao.remove(dao.get_by_id(id,User))
            else:
                raise CurrentUser
        except CurrentUser as err:
            abort(make_response(jsonify({"response":"Without Permission."}), 403))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid User."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def update(self,current_user,data,id):
        try:
            if current_user.id == id:
                userDao.update_many(id,data)
            else:
                raise CurrentUser
        except CurrentUser as err:
            abort(make_response(jsonify({"response":"Without Permission."}), 403))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid User."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def recovery(self,id,data):
        try:
            new_password =generate_password_hash(data['password'])
            update_data ={"password": new_password, "recovery":None, "recovery_time":None}
            dao.update_many(id,update_data,User)
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid User."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def confirm_email(self,data):
        try:
            user =  dao.get_by_key('email',data['email'],User)
            recovery = randint(10000, 99999)
            recovery_time = datetime.datetime.now() + datetime.timedelta(minutes=15)
            data = {"recovery":recovery,"recovery_time":recovery_time}
            dao.update_many(user.id,data,User)
            emailSender.send_recovery(user,recovery)
            return user.id
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid User."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def confirm_verification_code(self,id,data):
        try:
            user = dao.get_by_id(id,User)
            time = datetime.datetime.now() - datetime.timedelta(minutes=15)
            if user.recovery==data['verificationCode'] and user.recovery_time>time:
                token =  create_token(user)
                dao.update(user.id,'token',token,User)
                return user
            else:
                raise ObjectInvalid
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid User or Code."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))
  
    def profile_image(self, user, base64_img):
        path = "/src/images/"+str(user.id)+"_profile"+".jpg"
        with open(str(os.getcwd())+path, "wb") as fh:
            data = base64_img['image'].encode('utf-8')
            fh.write(base64.decodebytes(data))
        fh.close()
        userDao.update_image(user.id, "http://127.0.0.1:5000/mobile-api/v1/user/image-profile/"+str(user.id))

    def get_image_profile(self, id):
        return str(os.getcwd())+"/src/images/"+str(id)+"_profile"+".jpg"

userController = UserController()