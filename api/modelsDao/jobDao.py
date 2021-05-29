from modelsDao import dao
from models.job import Job
from app.applications import database
from app.exceptions import ObjectInvalid

class JobDao:

    def __init__(self):
        pass

    def get_all(self,limit=None,offset=None):
        if limit and offset:
            return Job.query.offset(offset).limit(limit).all()
        else:
            return Job.query.all()

    def get_all_by_company(self,id,limit=None,offset=None):
        if limit and offset:
            return Job.query.filter(Job.company==id).offset(offset).limit(limit).all()
        else:
            return Job.query.filter(Job.company==id).all()

    def update_many(self,id,data,model):
                object = dao.get_by_id(id,model)
                if object:
                    for key in data:
                        if hasattr(object, key) and self.key_is_valid(key):
                            setattr(object, key, data[key])
                    dao.commit()
                else:
                    raise ObjectInvalid

    def key_is_valid(self, key):
        return key=='date' or key=='description' or key=='job' or key=='active' or key=='name' or key=='internship' or key=='receive_by_email'

    def delete_all(self,id):
        database.session.query(Job).filter(Job.company==id).delete()
        dao.commit()

jobDao = JobDao()