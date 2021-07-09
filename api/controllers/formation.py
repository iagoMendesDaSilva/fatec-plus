from modelsDao import formationDao,dao
from flask import abort, make_response, jsonify
from app.exceptions import ObjectInvalid,CurrentUser
from models import  Formation,formation_schema,formations_schema

class FormationController:
    def __init__(self):
        pass

    def create(self, current_user, data):
        try:
            formation = Formation(
            title=data['title'],
            subtitle=data['subtitle'],
            end_year=data['endYear'],
            workload=data['workload'],
            start_year=data['startYear'],
            id_user=current_user.id)
            dao.add(formation)
            return True
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Formation."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def create_many(self, current_user, datas):
        try:
            formations = []
            for data in datas:
                formation = Formation(
                title=data['title'],
                subtitle=data['subtitle'],
                end_year=data['endYear'],
                workload=data['workload'],
                start_year=data['startYear'],
                id_user=current_user.id)
                formations.append(formation)
            dao.add_all(formations)
            return True
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Formation."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def get(self, id):
        try:
            return formation_schema.dump(dao.get_by_id(id,Formation))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Formation."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def get_all_by_user(self,user_id):
        try:
            return formations_schema.dump(dao.get_all_by_key('id_user',user_id,Formation))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def delete(self,current_user,id):
        try:
            formation  =dao.get_by_id(id,Formation)
            if formation:
                if current_user.id == formation.id_user:
                    dao.remove(formation)
                else:
                    raise CurrentUser
            else:
                raise ObjectInvalid
        except CurrentUser as err:
            abort(make_response(jsonify({"response":"Without Permission."}), 403))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Formation."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))


    def delete_all(self,current_user):
        try:
            formationDao.delete_all(current_user.id)
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def update(self,current_user,data,id):
        try:
            formation  =dao.get_by_id(id,Formation)
            if formation:
                if current_user.id == formation.id:
                    formationDao.update_many(id,data)
                else:
                    raise CurrentUser
            else:
                raise ObjectInvalid
        except CurrentUser as err:
            abort(make_response(jsonify({"response":"Without Permission."}), 403))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Formation."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

       
formationController = FormationController()