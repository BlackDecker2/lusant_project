from datetime import timedelta

class Config:
    SECRET_KEY = 'blackdecker-yoelsant'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    MYSQL_HOST = 'localhost'
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = ''
    MYSQL_DB = 'db_lusant'
