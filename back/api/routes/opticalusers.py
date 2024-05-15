from flask import jsonify, request, Blueprint
from flask_jwt_extended import jwt_required
from flask_mysqldb import MySQL
from api import api, mysql

users_bp = Blueprint('opticalusers', __name__)



@users_bp.route('/list-users', methods=['GET'])
def list_users():
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 5))

    start_index = (page - 1) * per_page
    end_index = start_index + per_page

    cur = mysql.connection.cursor()

    try:
        cur.execute("SELECT * FROM opticalusers LIMIT %s, %s", (start_index, per_page))
        users = cur.fetchall()
        return jsonify(users), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        cur.close()

@users_bp.route('/get-user/<dni>', methods=['GET'])
def get_user(dni):
    cur = mysql.connection.cursor()

    try:
        cur.execute("SELECT * FROM opticalusers WHERE dni = %s", (dni,))
        user_data = cur.fetchone()

        if not user_data:
            return jsonify({'error': 'User not found'}), 404

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
            'email': user_data['email']
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        cur.close()

@users_bp.route('/edit-user/<dni>', methods=['POST'])
def edit_user(dni):
    data = request.json
    name = data.get('name')
    lastname = data.get('lastname')
    works = data.get('works')
    department = data.get('department')
    municipality = data.get('municipality')
    salary = data.get('salary')
    username = data.get('username')
    rol = data.get('rol')
    email = data.get('email')

    cur = mysql.connection.cursor()

    try:
        cur.execute("SELECT * FROM opticalusers WHERE dni = %s", (dni,))
        existing_user = cur.fetchone()
        if not existing_user:
            return jsonify({'error': 'User does not exist'}), 404

        cur.execute("UPDATE opticalusers SET name = %s, lastname = %s, works = %s, department = %s, municipality = %s, salary = %s, username = %s, rol = %s, email = %s WHERE dni = %s", (name, lastname, works, department, municipality, salary, username, rol, email, dni))
        mysql.connection.commit()

        return jsonify({'dni': dni, 'name': name, 'lastname': lastname, 'email': email}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        cur.close()

@users_bp.route('/delete-user/<dni>', methods=['DELETE'])
def delete_user(dni):
    cur = mysql.connection.cursor()
    try:
        cur.execute("DELETE FROM opticalusers WHERE dni = %s", (dni,))
        mysql.connection.commit()
        return jsonify({'message': 'Usuario eliminado exitosamente'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()

@users_bp.route("/search-users", methods=["GET"])
def search_users():
    search_query = request.args.get("query")

    cur = mysql.connection.cursor()

    found_users = []
    if search_query:
        cur.execute("SELECT * FROM opticalusers WHERE dni LIKE %s OR email LIKE %s", (f"%{search_query}%", f"%{search_query}%"))
        found_users = cur.fetchall()

    return jsonify(found_users)
