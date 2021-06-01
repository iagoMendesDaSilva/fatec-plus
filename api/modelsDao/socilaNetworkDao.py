from modelsDao import dao
from app.applications import database
from app.exceptions import ObjectInvalid
from models.socialNetwork import SocialNetwork

class SocialNetworkDao:

    def __init__(self):
        pass

    def update_many(self,id,data):
                object = dao.get_by_id(id,SocialNetwork)
                if object:
                    for key in data:
                        if hasattr(object, key) and self.key_is_valid(key):
                            setattr(object, key, data[key])
                    dao.commit()
                else:
                    raise ObjectInvalid

    def delete_all(self,id_user):
        database.session.query(SocialNetwork).filter(SocialNetwork.id_user==id_user).delete()
        dao.commit()

    def key_is_valid(self, key):
        return key=='url' or key=='name'

socialNetworkDao = SocialNetworkDao()