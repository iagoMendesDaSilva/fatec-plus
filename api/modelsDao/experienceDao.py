from modelsDao import dao
from app.applications import database
from models.experience import Experience
from app.exceptions import ObjectInvalid

class ExperienceDao:

    def __init__(self):
        pass

    def update_many(self,id,data):
                object = dao.get_by_id(id,Experience)
                if object:
                    for key in data:
                        if hasattr(object, key) and self.key_is_valid(key):
                            setattr(object, key, data[key])
                    dao.commit()
                else:
                    raise ObjectInvalid

    def delete_all(self,id_user):
        database.session.query(Experience).filter(Experience.id_user==id_user).delete()
        dao.commit()

    def key_is_valid(self, key):
        return key=='end_year' or key=='start_year' or key=='job' or key=='company' 

experienceDao = ExperienceDao()