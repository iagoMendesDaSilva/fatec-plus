from modelsDao import languageDao,dao
from flask import abort, make_response, jsonify
from app.exceptions import ObjectInvalid,CurrentUser
from models import  Language,language_schema,languages_schema

class LanguageController:
    def __init__(self):
        pass

    def create(self, current_user, data):
        try:
            language = Language(
            level=data['level'],
            language=data['language'],
            id_user=current_user.id)
            dao.add(language)
            return True
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Language."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def create_many(self, current_user, datas):
        try:
            languages = []
            for data in datas:
                language = Language(
                level=data['level'],
                language=data['language'],
                id_user=current_user.id)
                languages.append(language)
            dao.add_all(languages)
            return True
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Language."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def get(self, id):
        try:
            return language_schema.dump(dao.get_by_id(id,Language))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Language."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def get_all_by_user(self,user_id):
        try:
            return languages_schema.dump(dao.get_all_by_key('id_user',user_id,Language))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def delete(self,current_user,id):
        try:
            language  =dao.get_by_id(id,Language)
            if language:
                if current_user.id == language.id_user:
                    dao.remove(language)
                else:
                    raise CurrentUser
            else:
                raise ObjectInvalid
        except CurrentUser as err:
            abort(make_response(jsonify({"response":"Without Permission."}), 403))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Language."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))


    def delete_all(self,current_user):
        try:
            languageDao.delete_all(current_user.id)
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def update(self,current_user,data,id):
        try:
            language  =dao.get_by_id(id,Language)
            if language:
                if current_user.id == language.id_user:
                    languageDao.update_many(id,data)
                else:
                    raise CurrentUser
            else:
                raise ObjectInvalid
        except CurrentUser as err:
            abort(make_response(jsonify({"response":"Without Permission."}), 403))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Language."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

       
languageController = LanguageController()