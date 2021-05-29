from app import *
from routes import *
from models import *


if __name__ == "__main__":
    database.create_all()
    app.run(host="127.0.0.1", port=5000, debug=True)