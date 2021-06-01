from modelsDao import dao
from app.applications import database
from app.exceptions import ObjectInvalid
from models.requirement import Requirement

class RequirementDao:

    def __init__(self):
        pass

    def update_many(self,id,data):
                object = dao.get_by_id(id,Requirement)
                if object:
                    for key in data:
                        if hasattr(object, key) and self.key_is_valid(key):
                            setattr(object, key, data[key])
                    dao.commit()
                else:
                    raise ObjectInvalid

    def delete_all(self,id_job):
        database.session.query(Requirement).filter(Requirement.id_job==id_job).delete()
        dao.commit()

    def key_is_valid(self, key):
        return key=='name' or key=='description' or key=='mandatory' or key=='level'

requirementDao = RequirementDao()