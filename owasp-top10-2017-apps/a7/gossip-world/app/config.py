import os

DEBUG = os.environ.get('DEBUG', 'False')
SECRET_KEY = os.environ.get('SECRET_KEY', 'ooops,algo errado!')

MYSQL_ENDPOINT = os.environ.get('MYSQL_ENDPOINT')
MYSQL_PASSWORD = os.environ.get('MYSQL_PASSWORD')
MYSQL_USER = os.environ.get('MYSQL_USER')
MYSQL_DB = os.environ.get('MYSQL_DB')
