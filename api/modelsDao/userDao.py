from modelsDao import dao
from flask import abort
from models.user import User

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

    def update_many(self,id,data,model):
            try:
                object = dao.get_by_id(id,model)
                for key in data:
                    if hasattr(object, key) and self.key_is_valid(key):
                        setattr(object, key, data[key])
                dao.commit()
            except Exception as err:
                abort(404, err.args)

    def key_is_valid(self, key):
        return key=='image' or key=='city' or key=='birth_date' or key=='road' or key=='phone' or key=='district' or key=='studyng' or key=='description' or key=='number_address' or key=='job' or key=='name' or key=='internship' or key=='email'

userDao = UserDao()