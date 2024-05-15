from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_mysqldb import MySQL
from api import api, mysql
from api.config import Config
from api.routes.opticalusers import users_bp  # Importa el blueprint de usuarios
from api.routes.auth import auth_bp
from api.routes.patients import patients_bp
from api.routes.clinicorder import clinicorders_bp

# Configurar la aplicación Flask
api = Flask(__name__)
CORS(api, supports_credentials=True)
api.config.from_object(Config)

bcrypt = Bcrypt(api)
jwt = JWTManager(api)
mysql = MySQL(api)

# Registrar blueprints de las rutas
api.register_blueprint(users_bp)  # Registra el blueprint de usuarios
api.register_blueprint(auth_bp)
api.register_blueprint(patients_bp)
api.register_blueprint(clinicorders_bp)

# Resto del código...
