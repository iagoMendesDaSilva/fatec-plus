from routes import *
from models import *
from app.applications import app,database,ip

if __name__ == "__main__":
    database.create_all()
    app.run(host=ip, port=5000, debug=True)