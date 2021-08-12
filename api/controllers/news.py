from modelsDao import dao
from models.new import  New, news_schema
from flask import abort, make_response, jsonify

class NewsController:
    def __init__(self):
        pass

    def get_by_version(self,current_user):
        try:
            return news_schema.dump(dao.get_all_by_key('version_app',current_user.version_app,New))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))
       
newsController = NewsController()