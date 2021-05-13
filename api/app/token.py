import jwt
import datetime
from app import app
from functools import wraps
from models.user import User
from modelsDao.dao import dao
from jwt.exceptions import DecodeError
from flask import current_app, request, abort


def token(function):
    @wraps(function)
    def wrapper(*args, **kwargs):
        token = None
        if 'authorization' in request.headers:
            token = request.headers.get('Authorization')

        if not token:
            return abort(401)

        try:
            decoded = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = dao.get_by_id(decoded["id"],User)
        except DecodeError:
            return abort(403)
        except Exception as err:
            return abort(503, err.args)
            
        return function(current_user=current_user, *args, **kwargs)
    return wrapper

def create_token(user):
    payload = {'id': user.id, 'exp': datetime.datetime.utcnow() +datetime.timedelta(days=30)}
    token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm="HS256")
    return token
