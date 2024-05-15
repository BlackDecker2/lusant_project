from flask import jsonify, request, Blueprint
from flask_jwt_extended import jwt_required
from flask_mysqldb import MySQL
from api import api, mysql

patients_bp = Blueprint('patients', __name__)

#rutas
@patients_bp.route('/signup-patient', methods=['POST'])
def signup_patient():
    data = request.json
    typedocument = data.get('typedocument')
    dni = data.get('dni')
    name = data.get('name')
    lastname = data.get('lastname')
    hobbies = data.get('hobbies')
    maritalstate = data.get('maritalstate')
    gender = data.get('gender')
    disabilitycondition = data.get('disabilitycondition')
    phone = data.get('phone')
    ethniccommunities = data.get('ethniccommunities')
    occupation = data.get('occupation')
    dateofbirth = data.get('dateofbirth')
    socialcondition = data.get('socialcondition')
    eps = data.get('eps')
    address = data.get('address')
    observation = data.get('observation')
    department = data.get('department')
    typeperson = data.get('typeperson')
    zone = data.get('zone')
    municipality = data.get('municipality')
    typeofregimen = data.get('typeofregimen')
    email = data.get('email')
    

    # Create database connection
    cur = mysql.connection.cursor()

    try:
        # Check if email is already in use
        cur.execute("SELECT * FROM patients WHERE email = %s", (email,))
        existing_patient = cur.fetchone()
        if existing_patient:
            return jsonify({'error': 'Email already exists'}), 409

        # Insert new patient into the database
        cur.execute("INSERT INTO patients (typedocument, dni, name, lastname, hobbies, maritalstate, gender, disabilitycondition, phone, ethniccommunities, occupation, dateofbirth, socialcondition, eps, address, observation, department, typeperson, zone, municipality, typeofregimen, email) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", (typedocument, dni, name, lastname, hobbies, maritalstate, gender, disabilitycondition, phone, ethniccommunities, occupation, dateofbirth, socialcondition, eps, address, observation, department, typeperson, zone, municipality, typeofregimen, email))
        mysql.connection.commit()

        # Return response with details of the registered patient
        return jsonify({'id': cur.lastrowid, 'name': name, 'lastname': lastname, 'email': email, 'dni':dni}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        cur.close()



@patients_bp.route('/list-patients', methods=['GET'])
def list_patients():
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 5))

    start_index = (page - 1) * per_page

    cur = mysql.connection.cursor()

    try:
        cur.execute("SELECT * FROM patients LIMIT %s, %s", (start_index, per_page))
        patients = cur.fetchall()
        return jsonify(patients), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        cur.close()

@patients_bp.route('/get-patient/<dni>', methods=['GET'])
def get_patient(dni):
    cur = mysql.connection.cursor()

    try:
        cur.execute("SELECT * FROM patients WHERE dni = %s", (dni,))
        patient_data = cur.fetchone()

        if not patient_data:
            return jsonify({'error': 'Paciente no encontrado'}), 404

        return jsonify({
            'typedocument': patient_data[0],
            'name': patient_data[1],
            'lastname': patient_data[2],
            'hobbies': patient_data[3],
            'maritalstate': patient_data[4],
            'gender': patient_data[5],
            'disabilitycondition': patient_data[6],
            'dni': patient_data[7],
            'phone': patient_data[8],
            'ethniccommunities': patient_data[9],
            'occupation': patient_data[10],
            'dateofbirth': patient_data[11].strftime('%Y-%m-%d'),
            'socialcondition': patient_data[12],
            'eps': patient_data[13],
            'address': patient_data[14],
            'observation': patient_data[15],
            'department': patient_data[16],
            'typeperson': patient_data[17],
            'zone': patient_data[18],
            'municipality': patient_data[19],
            'typeofregimen': patient_data[20],
            'email': patient_data[21]
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        cur.close()

@patients_bp.route('/edit-patient/<dni>', methods=['POST'])
def edit_patient(dni):
    data = request.json
    typedocument = data.get('typedocument')
    name = data.get('name')
    lastname = data.get('lastname')
    hobbies = data.get('hobbies')
    maritalstate = data.get('maritalstate')
    gender = data.get('gender')
    disabilitycondition = data.get('disabilitycondition')
    phone = data.get('phone')
    ethniccommunities = data.get('ethniccommunities')
    occupation = data.get('occupation')
    dateofbirth = data.get('dateofbirth')
    socialcondition = data.get('socialcondition')
    eps = data.get('eps')
    address = data.get('address')
    observation = data.get('observation')
    department = data.get('department')
    typeperson = data.get('typeperson')
    zone = data.get('zone')
    municipality = data.get('municipality')
    typeofregimen = data.get('typeofregimen')
    email = data.get('email')

    cur = mysql.connection.cursor()

    try:
        cur.execute("SELECT * FROM patients WHERE dni = %s", (dni,))
        existing_patient = cur.fetchone()
        if not existing_patient:
            return jsonify({'error': 'Patient does not exist'}), 404

        cur.execute( "UPDATE patients SET typedocument = %s, name = %s, lastname = %s, hobbies = %s, maritalstate = %s, gender = %s, disabilitycondition = %s, phone = %s, ethniccommunities = %s, occupation = %s, dateofbirth = %s, socialcondition = %s, eps = %s, address = %s, observation = %s, department = %s, typeperson = %s, zone = %s, municipality = %s, typeofregimen = %s, email = %s WHERE dni = %s", (typedocument, name, lastname, hobbies, maritalstate, gender, disabilitycondition, phone, ethniccommunities, occupation, dateofbirth, socialcondition, eps, address, observation, department, typeperson, zone, municipality, typeofregimen, email, dni))
        mysql.connection.commit()

        return jsonify({'dni': dni, 'name': name, 'lastname': lastname, 'email': email}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        cur.close()

@patients_bp.route('/delete-patient/<dni>', methods=['DELETE'])
def delete_patient(dni):
    cur = mysql.connection.cursor()
    try:
        cur.execute("DELETE FROM patients WHERE dni = %s", (dni,))
        mysql.connection.commit()
        return jsonify({'message': 'Patient successfully deleted'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()

@patients_bp.route("/search-patients", methods=["GET"])
def search_patients():
    search_query = request.args.get("query")

    cur = mysql.connection.cursor()

    found_patients = []
    if search_query:
        cur.execute("SELECT * FROM patients WHERE dni LIKE %s OR email LIKE %s", (f"%{search_query}%", f"%{search_query}%"))
        found_patients = cur.fetchall()

    return jsonify(found_patients)
