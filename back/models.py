from flask import Flask
from uuid import uuid4
from sqlalchemy.orm import DeclarativeBase
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String

""" db = SQLAlchemy()

def get_uuid():
    return str(uuid4().hex)[:11]  # Usar solo los primeros 11 caracteres de la representación hexadecimal

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(11), primary_key=True, unique=True, default=get_uuid)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    about = db.Column(db.Text, nullable=False)
 """