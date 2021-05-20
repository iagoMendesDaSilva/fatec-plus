from models.user import User
from flask import abort
from app import database
from sqlalchemy.exc import IntegrityError

class UserDao:

    def __init__(self):
        pass

    def get_students(self, limit=None, offset=None):
        if limit and offset:
            return User.query.filter(User.category=='student').offset(offset).limit(limit).all()
        else:
            return User.query.filter(User.category=='student').all()

    def get_teachers(self,limit=None,offset=None):
        if limit and offset:
            return User.query.filter(User.category=='teacher').offset(offset).limit(limit).all()
        else:
            return User.query.filter(User.category=='teacher').all()

    def get_companies(self,limit=None,offset=None):
        if limit and offset:
            return User.query.filter(User.category=='company').offset(offset).limit(limit).all()
        else:
            return User.query.filter(User.category=='company').all()
    
    def get_intership_coordinators(self,limit=None,offset=None):
        if limit and offset:
            return User.query.filter(User.category=='internship coordinator').offset(offset).limit(limit).all()
        else:
            return User.query.filter(User.category=='internship coordinator').all()

    def get_admins(self,limit=None,offset=None):
        if limit and offset:
            return User.query.filter(User.category=='admin').offset(offset).limit(limit).all()
        else:
            return User.query.filter(User.category=='admin').all()

    def get_all(self,limit=None,offset=None):
        if limit and offset:
            return User.query.offset(offset).limit(limit).all()
        else:
            return User.query.all()

userDao = UserDao()