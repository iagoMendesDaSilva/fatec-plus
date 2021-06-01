from modelsDao import dao
from models.benefit import Benefit
from app.applications import database
from app.exceptions import ObjectInvalid

class BenefitDao:

    def __init__(self):
        pass

    def update_many(self,id,data):
                object = dao.get_by_id(id,Benefit)
                if object:
                    for key in data:
                        if hasattr(object, key) and self.key_is_valid(key):
                            setattr(object, key, data[key])
                    dao.commit()
                else:
                    raise ObjectInvalid

    def delete_all(self,id_job):
        database.session.query(Benefit).filter(Benefit.id_job==id_job).delete()
        dao.commit()

    def key_is_valid(self, key):
        return key=='name' or key=='description'

benefitDao = BenefitDao()