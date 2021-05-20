from models.user import *
from flask import abort
from app import database
from sqlalchemy.exc import IntegrityError

class DaoDefault:

    def __init__(self):
        pass

    def add(self, object):
        self.commit(object, "add")

    def remove(self,object) :
        self.commit(object, "delete")

    def update(self, id, key, value, model):
            try:
                object = self.get_by_id(id,model)
                setattr(object, key, value)
                self.commit()
            except Exception as err:
                abort(404, err.args)

    def update_many(self,id,data,model):
            try:
                object = self.get_by_id(id,model)
                for key in data:
                    if hasattr(object, key):
                        setattr(object, key, data[key])
                self.commit()
            except Exception as err:
                abort(404, err.args)
       

    def get_by_id(self, id, model):
        try:
            return model.query.filter(model.id == id).first_or_404()
        except Exception as err:
             abort(404, err.args)

    def get_by_key(self, key, value, model):
        try:
            key = self.get_key_formated(key, model)
            return model.query.filter(key == value).first_or_404()
        except Exception as err:
            print(err)
            abort(404, err.args)

    def get_all_by_key(self,key, value, model):
        try:
            key = self.get_key_formated(key, model)
            return model.query.filter(key == value).all()
        except Exception as err:
             abort(404, err.args)

    def get_all_by_model(self, model):
        try:
            return model.query.all()
        except Exception as err:
             abort(404, err.args)

    def get_key_formated(self, key, model):
        try:
            return eval(model.__tablename__.title() + f".{key}")
        except Exception as err:
             abort(503, err.args)

    def commit(self, object=None, method=None):
        try: 
            if(method=="add"):
                database.session.add(object)
            elif(method=="delete"):
                database.session.delete(object)
            database.session.commit() 
        except IntegrityError as err:
            database.session.remove()
            abort(409, err.args)
        except Exception as err:
            database.session.remove()
            abort(400, err.args)

dao = DaoDefault()
    