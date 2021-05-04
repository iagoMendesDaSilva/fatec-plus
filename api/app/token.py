import jwt
from functools import wraps
from models.user import User
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
            current_user = User.query.filter(User.id == decoded.get("id")).first()
        except DecodeError:
            return abort(403)
            
        return function(current_user=current_user, *args, **kwargs)
    return wrapper
