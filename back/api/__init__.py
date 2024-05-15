from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_mysqldb import MySQL
from .config import Config

api = Flask(__name__)
CORS(api, supports_credentials=True)
api.config.from_object(Config)

bcrypt = Bcrypt(api)
jwt = JWTManager(api)
mysql = MySQL(api)

from .routes.auth import auth_bp
from .routes.opticalusers import users_bp
from .routes.patients import patients_bp
from .routes.clinicorder import clinicorders_bp