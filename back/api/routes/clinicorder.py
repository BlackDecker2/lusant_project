from flask import jsonify, request, Blueprint
from flask_jwt_extended import jwt_required
from flask_mysqldb import MySQL
from api import api, mysql

clinicorders_bp = Blueprint('clinicorders', __name__)

@clinicorders_bp.route('/list-clinicorders', methods=['GET'])
def list_clinicorders():
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 5))

    start_index = (page - 1) * per_page
    end_index = start_index + per_page

    cur = mysql.connection.cursor()

    try:
        cur.execute("SELECT * FROM clinicorder LIMIT %s, %s", (start_index, per_page))
        clinicorders = cur.fetchall()
        return jsonify(clinicorders), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        cur.close()

@clinicorders_bp.route('/get-clinicorder/<authorization_number>', methods=['GET'])
def get_clinicorder(authorization_number):
    cur = mysql.connection.cursor()

    try:
        cur.execute("SELECT * FROM clinicorder WHERE authorizationNumber = %s", (authorization_number,))
        clinicorder = cur.fetchone()

        if not clinicorder:
            return jsonify({'error': 'Clinicorder not found'}), 404

        return jsonify(clinicorder), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        cur.close()


@clinicorders_bp.route('/create-clinicorder', methods=['POST'])
def create_clinicorder():
    data = request.json

    id_patient = data.get('id_patient')  # ID del paciente relacionado
    id_optometrist = data.get('id_optometrist')  # ID del optometrista relacionado
    id_recepcionist = data.get('id_recepcionist')  # ID del recepcionista relacionado

    # Datos de la nueva orden clínica
    authorization_number = data.get('authorization_number')
    payment = data.get('payment')
    reason_visit = data.get('reason_visit')
    date = data.get('date')
    deliver_date = data.get('deliver_date')
    observation = data.get('observation')

    # Crear conexión a la base de datos
    cur = mysql.connection.cursor()

    try:
        # Insertar nueva orden clínica en la base de datos
        cur.execute("INSERT INTO clinicorder (authorizationNumber, idPatient, idOptometrist, idRecepcionist, payment, reasonVisit, date, deliverDate, observation) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)", 
                    (authorization_number, id_patient, id_optometrist, id_recepcionist, payment, reason_visit, date, deliver_date, observation))

        mysql.connection.commit()

        # Devolver la respuesta con los detalles de la orden clínica creada
        return jsonify({'message': 'Clinicorder created successfully'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        cur.close()

@clinicorders_bp.route('/edit-clinicorder/<authorization_number>', methods=['PUT'])
def edit_clinicorder(authorization_number):
    data = request.json

    id_patient = data.get('id_patient')  # ID del paciente relacionado
    id_optometrist = data.get('id_optometrist')  # ID del optometrista relacionado
    id_recepcionist = data.get('id_recepcionist')  # ID del recepcionista relacionado

    # Datos de la orden clínica a editar
    payment = data.get('payment')
    reason_visit = data.get('reason_visit')
    date = data.get('date')
    deliver_date = data.get('deliver_date')
    observation = data.get('observation')

    # Crear conexión a la base de datos
    cur = mysql.connection.cursor()

    try:
        # Verificar si la orden clínica existe
        cur.execute("SELECT * FROM clinicorder WHERE authorizationNumber = %s", (authorization_number,))
        existing_clinicorder = cur.fetchone()
        if not existing_clinicorder:
            return jsonify({'error': 'Clinicorder does not exist'}), 404

        # Actualizar la orden clínica en la base de datos
        cur.execute("UPDATE clinicorder SET idPatient = %s, idOptometrist = %s, idRecepcionist = %s, payment = %s, reasonVisit = %s, date = %s, deliverDate = %s, observation = %s WHERE authorizationNumber = %s", 
                    (id_patient, id_optometrist, id_recepcionist, payment, reason_visit, date, deliver_date, observation, authorization_number))

        mysql.connection.commit()

        # Devolver la respuesta con los detalles de la orden clínica editada
        return jsonify({'message': 'Clinicorder updated successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        cur.close()


@clinicorders_bp.route('/delete-clinicorder/<authorization_number>', methods=['DELETE'])
def delete_clinicorder(authorization_number):
    cur = mysql.connection.cursor()
    try:
        cur.execute("DELETE FROM clinicorder WHERE authorizationNumber = %s", (authorization_number,))
        mysql.connection.commit()
        return jsonify({'message': 'Orden clinica eliminada exitosamente'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()