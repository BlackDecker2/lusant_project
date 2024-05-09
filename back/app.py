import json
from flask import Flask, request, jsonify
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_mysqldb import MySQL

api = Flask(__name__)
CORS(api, supports_credentials=True)

api.config['SECRET_KEY'] = 'blackdecker-yoelsant'
api.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)

bcrypt = Bcrypt(api)

api.config['MYSQL_HOST'] = 'localhost'
api.config['MYSQL_USER'] = 'root'
api.config['MYSQL_PASSWORD'] = ''
api.config['MYSQL_DB'] = 'db_lusant'

mysql = MySQL(api)

jwt = JWTManager(api)

@api.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@api.route('/logintoken', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # Crear conexión a la base de datos
    cur = mysql.connection.cursor()

    # Ejecutar consulta SQL para obtener el usuario por su correo electrónico
    cur.execute("SELECT * FROM opticalusers WHERE email = %s", (email,))
    user = cur.fetchone()

    # Verificar si el usuario existe y si la contraseña es correcta
    if user is None or user[10] != password:  # user[10] es la posición del campo de la contraseña en la tupla
        return jsonify({"error": "Wrong email or password"}), 401

    cur.close()
  
    # Generar el token de acceso
    access_token = create_access_token(identity=email)
  
    return jsonify({
        "email": email,
        "access_token": access_token
    })

@api.route('/signup', methods=['POST'])
def signup():
    data = request.json
    dni = data.get('dni')
    name = data.get('name')
    lastname = data.get('lastname')
    works = data.get('works')
    department = data.get('departament')
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
            return jsonify({'error': 'Email already exists'}), 409

        # Insertar nuevo usuario en la base de datos
        cur.execute("INSERT INTO opticalusers (dni, name, lastname, works, department, municipality, salary, username, rol, email, pass) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", (dni, name, lastname, works, department, municipality, salary, username, rol, email, password))
        mysql.connection.commit()

        # Devolver la respuesta con los detalles del usuario registrado
        return jsonify({'id': cur.lastrowid, 'name': name, 'lastname': lastname, 'email': email}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        cur.close()

@api.route('/list-users', methods=['GET'])
def list_optical_users():
    # Obtener los parámetros de consulta de la solicitud
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 5))  # Por defecto, 5 usuarios por página

    # Calcular el índice de inicio y fin para la consulta
    start_index = (page - 1) * per_page
    end_index = start_index + per_page

    # Crear conexión a la base de datos
    cur = mysql.connection.cursor()

    try:
        # Consultar la base de datos para obtener los usuarios paginados
        cur.execute("SELECT * FROM opticalusers LIMIT %s, %s", (start_index, per_page))
        users = cur.fetchall()

        # Devolver los usuarios paginados
        return jsonify(users), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        cur.close()
       

@api.route('/get-user/<dni>', methods=['GET'])
def get_user(dni):
    try:
        # Crear conexión a la base de datos
        cur = mysql.connection.cursor()

        # Obtener los datos del usuario de la base de datos
        cur.execute("SELECT * FROM opticalusers WHERE dni = %s", (dni,))
        user_data = cur.fetchone()

        if not user_data:
            return jsonify({'error': 'User not found'}), 404

        # Devolver los datos del usuario
        return jsonify({
            'dni': user_data['dni'],
            'name': user_data['name'],
            'lastname': user_data['lastname'],
            'works': user_data['works'],
            'department': user_data['department'],
            'municipality': user_data['municipality'],
            'salary': user_data['salary'],
            'username': user_data['username'],
            'rol': user_data['rol'],
            'email': user_data['email'],
            'pass': user_data['pass']
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        cur.close()


       
@api.route('/edit-user/<dni>', methods=['POST'])
def edit_user(dni):
    data = request.json
    # Obteniendo los datos del formulario
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
        # Verificar si el usuario existe
        cur.execute("SELECT * FROM opticalusers WHERE dni = %s", (dni,))
        existing_user = cur.fetchone()
        if not existing_user:
            return jsonify({'error': 'User does not exist'}), 404

        # Actualizar los datos del usuario en la base de datos
        cur.execute("UPDATE opticalusers SET name = %s, lastname = %s, works = %s, department = %s, municipality = %s, salary = %s, username = %s, rol = %s, email = %s, pass = %s WHERE dni = %s", (name, lastname, works, department, municipality, salary, username, rol, email, password, dni))
        mysql.connection.commit()

        # Devolver la respuesta con los detalles del usuario actualizado
        return jsonify({'dni': dni, 'name': name, 'lastname': lastname, 'email': email}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        cur.close()


@api.route('/delete-user/<dni>', methods=['DELETE'])
def delete_user(dni):
    # Eliminar el usuario de la base de datos
    cur = mysql.connection.cursor()
    try:
        cur.execute("DELETE FROM opticalusers WHERE dni = %s", (dni,))
        mysql.connection.commit()
        return jsonify({'message': 'Usuario eliminado exitosamente'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()

        
# Ruta para buscar usuarios por DNI o correo electrónico
@api.route("/search-users", methods=["GET"])
def search_users():
    search_query = request.args.get("query")

    # Lógica para buscar usuarios en la base de datos por DNI o correo electrónico
    found_users = []
    if search_query:
        # Busca usuarios por DNI o correo electrónico que contengan la query
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM opticalusers WHERE dni LIKE %s OR email LIKE %s", (f"%{search_query}%", f"%{search_query}%"))
        found_users = cur.fetchall()
        cur.close()

    # Convierte los usuarios encontrados a un formato JSON y los devuelve como respuesta
    return jsonify(found_users)

        
@api.after_request
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

@api.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@api.route('/profile/<getemail>')
@jwt_required() 
def my_profile(getemail):
    if getemail is None:
        return jsonify({"error": "No email provided"}), 400

    cur = mysql.connection.cursor(dictionary=True)
    cur.execute("SELECT id, name, email, about FROM opticalusers WHERE email = %s", (getemail,))
    user = cur.fetchone()
    cur.close()

    if user is None:
        return jsonify({"error": "User not found"}), 404

    return jsonify(user)

if __name__ == '__main__':
    api.run(debug=True)
