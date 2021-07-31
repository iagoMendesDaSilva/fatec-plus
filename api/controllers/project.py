from modelsDao import projectDao,dao
from flask import abort, make_response, jsonify
from app.exceptions import ObjectInvalid,CurrentUser
from models import  Project,project_schema,projects_schema

class ProjectController:
    def __init__(self):
        pass

    def create(self, current_user, data):
        try:
            project = Project(
            url=data['url'],
            name=data['name'],
            description=data['description'],
            id_user=current_user.id)
            dao.add(project)
            return True
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Project."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def create_many(self, current_user, datas):
        try:
            projects = []
            for data in datas:
                project = Project(
                url=data['url'],
                name=data['name'],
                description=data['description'],
                id_user=current_user.id)
                projects.append(project)
            dao.add_all(projects)
            return True
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Project."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def get(self, id):
        try:
            return project_schema.dump(dao.get_by_id(id,Project))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Project."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def get_all_by_user(self,user_id):
        try:
            return projects_schema.dump(dao.get_all_by_key('id_user',user_id,Project))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def delete(self,current_user,id):
        try:
            project  =dao.get_by_id(id,Project)
            if project:
                if current_user.id == project.id_user:
                    dao.remove(project)
                else:
                    raise CurrentUser
            else:
                raise ObjectInvalid
        except CurrentUser as err:
            abort(make_response(jsonify({"response":"Without Permission."}), 403))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Project."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))


    def delete_all(self,current_user):
        try:
            projectDao.delete_all(current_user.id)
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

    def update(self,current_user,data,id):
        try:
            project  =dao.get_by_id(id,Project)
            if project:
                if current_user.id == project.id_user:
                    projectDao.update_many(id,data)
                else:
                    raise CurrentUser
            else:
                raise ObjectInvalid
        except CurrentUser as err:
            abort(make_response(jsonify({"response":"Without Permission."}), 403))
        except ObjectInvalid as err:
            abort(make_response(jsonify({"response":"Invalid Project."}), 404))
        except Exception as err:
            abort(make_response(jsonify({"response":"Internal problem."}), 502))

       
projectController = ProjectController()