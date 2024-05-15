import json
from flask import Blueprint, request, jsonify, make_response
from flask_jwt_extended import create_access_token, jwt_required, unset_jwt_cookies, get_jwt_identity, get_jwt
from datetime import datetime, timezone, timedelta
from flask_mysqldb import MySQL
from flask_cors import CORS
from api import api, mysql

auth_bp = Blueprint('auth', __name__)

mysql = MySQL()

CORS(auth_bp, supports_credentials=True)

@auth_bp.route('/logintoken', methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email or not password:
        return jsonify({"error": "Se requieren email y contraseña"}), 400

    # Crear conexión a la base de datos
    cur = mysql.connection.cursor()

    try:
        # Ejecutar consulta SQL para obtener el usuario por su correo electrónico
        cur.execute("SELECT * FROM opticalusers WHERE email = %s", (email,))
        user_data = cur.fetchone()

        if user_data is None or user_data[10] != password:
            return jsonify({"error": "Email o contraseña incorrectos"}), 401

        # Generar el token de acceso
        access_token = create_access_token(identity=email)

        return jsonify({
            "email": email,
            "access_token": access_token
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        cur.close()

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.json
    dni = data.get('dni')
    name = data.get('name')
    lastname = data.get('lastname')
    works = data.get('works')
    department = data.get('department')
    municipality = data.get('municipality')
    salary = data.get('salary')
    username = data.get('username')
    rol = data.get('rol')
    email = data.get('email')
    password = data.get('pass')

    # Crear conexión a la base de datos
    cur = mysql.connection.cursor()

    try:
        # Verificar si el correo electrónico ya está en uso
        cur.execute("SELECT * FROM opticalusers WHERE email = %s", (email,))
        existing_user = cur.fetchone()
        if existing_user:
            return jsonify({'error': 'El correo electrónico ya está en uso'}), 409

        # Insertar nuevo usuario en la base de datos
        cur.execute("INSERT INTO opticalusers (dni, name, lastname, works, department, municipality, salary, username, rol, email, pass) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", (dni, name, lastname, works, department, municipality, salary, username, rol, email, password))
        mysql.connection.commit()

        # Devolver la respuesta con los detalles del usuario registrado
        return jsonify({'id': cur.lastrowid, 'name': name, 'lastname': lastname, 'email': email}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        cur.close()

@auth_bp.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if isinstance(data, dict):
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        return response




@auth_bp.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response
