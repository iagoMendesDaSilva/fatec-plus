from modelsDao import socialNetworkDao,dao
from flask import abort, make_response, jsonify
from app.exceptions import ObjectInvalid,CurrentUser
from models import  SocialNetwork,socialNetwork_schema,socialNetworks_schema

class SocialNetworkController:
    def __init__(self):
        pass

    def create(self, current_user, data):
        try:
            socialNetwork = SocialNetwork(
            url=data['url'],
            name=data['name'],
            id_user=current_user.id)
            dao.add(socialNetwork)
            return True
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid SocialNetwork."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def create_many(self, current_user, datas):
        try:
            socialNetworks = []
            for data in datas:
                socialNetwork = SocialNetwork(
                url=data['url'],
                name=data['name'],
                id_user=current_user.id)
                socialNetworks.append(socialNetwork)
            dao.add_all(socialNetworks)
            return True
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid SocialNetwork."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def get(self, id):
        try:
            return socialNetwork_schema.dump(dao.get_by_id(id,SocialNetwork))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid SocialNetwork."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def get_all_by_user(self,user_id):
        try:
            return socialNetworks_schema.dump(dao.get_all_by_key('id_user',user_id,SocialNetwork))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def delete(self,current_user,id):
        try:
            socialNetwork  =dao.get_by_id(id,SocialNetwork)
            if socialNetwork:
                if current_user.id == socialNetwork.id_user:
                    dao.remove(socialNetwork)
                else:
                    raise CurrentUser
            else:
                raise ObjectInvalid
        except CurrentUser as err:
            abort(make_response(jsonify({"response":"Without Permission."}), 403))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid SocialNetwork."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))


    def delete_all(self,current_user):
        try:
            socialNetworkDao.delete_all(current_user.id)
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def update(self,current_user,data,id):
        try:
            socialNetwork  =dao.get_by_id(id,SocialNetwork)
            if socialNetwork:
                if current_user.id == socialNetwork.id_user:
                    socialNetworkDao.update_many(id,data)
                else:
                    raise CurrentUser
            else:
                raise ObjectInvalid
        except CurrentUser as err:
            abort(make_response(jsonify({"response":"Without Permission."}), 403))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid SocialNetwork."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

       
socialNetworkController = SocialNetworkController()