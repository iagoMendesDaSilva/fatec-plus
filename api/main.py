from routes import *
from models import *
from app.applications import app,database

if __name__ == "__main__":
    database.create_all()
    app.run(host="192.168.0.31", port=5000, debug=True)