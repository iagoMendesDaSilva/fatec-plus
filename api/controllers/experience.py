from modelsDao import experienceDao,dao
from flask import abort, make_response, jsonify
from app.exceptions import ObjectInvalid,CurrentUser
from models import  Experience,experience_schema,experiences_schema

class ExperienceController:
    def __init__(self):
        pass

    def create(self, current_user, data):
        try:
            experience = Experience(
            job=data['job'],
            end_year=data['end_year'],
            company=data['company'],
            start_year=data['start_year'],
            id_user=current_user.id)
            dao.add(experience)
            return True
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Experience."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 500))

    def create_many(self, current_user, datas):
        try:
            experiences = []
            for data in datas:
                experience = Experience(
                job=data['job'],
                end_year=data['end_year'],
                company=data['company'],
                start_year=data['start_year'],
                id_user=current_user.id)
                experiences.append(experience)
            dao.add_all(experiences)
            return True
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Experience."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 500))

    def get(self, id):
        try:
            return experience_schema.dump(dao.get_by_id(id,Experience))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Experience."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 500))

    def get_all_by_user(self,user_id):
        try:
            return experiences_schema.dump(dao.get_all_by_key('id_user',user_id,Experience))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 500))

    def delete(self,current_user,id):
        try:
            experience  =dao.get_by_id(id,Experience)
            if experience:
                if current_user.id == experience.id_user:
                    dao.remove(experience)
                else:
                    raise CurrentUser
            else:
                raise ObjectInvalid
        except CurrentUser as err:
            abort(make_response(jsonify({"response":"Without Permission."}), 403))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Experience."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 500))


    def delete_all(self,current_user):
        try:
            experienceDao.delete_all(current_user.id)
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 500))

    def update(self,current_user,data,id):
        try:
            experience  =dao.get_by_id(id,Experience)
            if experience:
                if current_user.id == experience.id_user:
                    experienceDao.update_many(id,data)
                else:
                    raise CurrentUser
            else:
                raise ObjectInvalid
        except CurrentUser as err:
            abort(make_response(jsonify({"response":"Without Permission."}), 403))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Experience."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 500))

       
experienceController = ExperienceController()