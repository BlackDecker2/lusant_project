from flask import Blueprint

auth_bp = Blueprint('auth', __name__)
users_bp = Blueprint('opticalusers', __name__)
patients_bp = Blueprint('patients', __name__)
clinicorders_bp = Blueprint('clinicorders', __name__)

from .auth import *
from .opticalusers import *
from .patients import *
from .clinicorder import *
