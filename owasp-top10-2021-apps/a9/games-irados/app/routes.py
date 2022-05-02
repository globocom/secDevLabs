#!/usr/bin/env python
# -*- coding: utf-8 -*-
from functools import wraps
import uuid
import datetime
from flask import (
    Flask,
    render_template,
    request,
    redirect,
    flash,
    session
)
from util.init_db import init_db
from flask.logging import default_handler
from flask_bootstrap import Bootstrap
from model.password import Password
from model.db import DataBase
import os
from flask_cors import CORS, cross_origin
from model.db import DataBase
import logging, logging.config

LOGGING_CONFIG = { 
    'version': 1,
    'disable_existing_loggers': True,
    'formatters': { 
        'standard': { 
            'format': '[%(levelname)s] - %(asctime)s - %(message)s'
        },
    },
    'handlers': { 
        'consolehandler': { 
            'level': 'INFO',
            'formatter': 'standard',
            'class': 'logging.StreamHandler',
            'stream': 'ext://sys.stdout',
        },
        'filehandler': { 
            'level': 'INFO',
            'formatter': 'standard',
            'class': 'logging.FileHandler',
            'filename': 'info.log',
        },
    },
    'loggers': { 
        '': {
            'handlers': ['consolehandler'],
            'level': 'NOTSET',
            'propagate': False
        },
        'file': { 
            'handlers': ['filehandler'],
            'level': 'INFO',
            'propagate': False
        },
        'console': {
            'handlers': ['consolehandler'],
            'level': 'INFO',
            'propagate': False
        },
    } 
}

logging.config.dictConfig(LOGGING_CONFIG)
app = Flask(__name__)
bootstrap = Bootstrap(app)
app.config.from_pyfile('config.py')
logfile = logging.getLogger('console')

def generate_csrf_token():
    '''
        Generate csrf token and store it in session
    '''
    if '_csrf_token' not in session:
        session['_csrf_token'] = str(uuid.uuid4())
    return session.get('_csrf_token')


app.jinja_env.globals['csrf_token'] = generate_csrf_token

@app.before_request
def csrf_protect():
    '''
        CSRF PROTECION
    '''
    if request.method == "POST":
        token_csrf = session.get('_csrf_token')
        form_token = request.form.get('_csrf_token')
        if not token_csrf or str(token_csrf) != str(form_token):
            logfile.info("Wrong value for csrf_token - IP: {}".format(request.remote_addr))
            return "ERROR: Wrong value for csrf_token"

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'username' not in session:
            flash('oops, session expired', "danger")
            logfile.info("Session expired - IP: {}".format(request.remote_addr))
            return redirect('/login')
        return f(*args, **kwargs)
    return decorated_function

@app.route('/', methods=['GET'])
def root():
    return redirect('/login')

@app.route('/logout', methods=['GET'])
@login_required
def logout():
    if 'username' in session:
        logfile.info("Logout - Username: {} - IP: {}".format(session.get('username'), request.remote_addr))
        session.clear()
    return redirect('/login')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username').encode('utf-8')
        psw = Password(request.form.get('password').encode('utf-8'))
        user_password, message, success = database.get_user_password(username)
        if not success:
            if message:
                flash("Database error", "danger")
                logfile.info("Unsuccessful login attempt (database error) - Username: {} - Database message: {} - IP: {}".format(username, message, request.remote_addr))
            else:
                flash("Usuario ou senha incorretos", "danger")
                logfile.info("Unsuccessful login attempt (invalid username) - Username: {} - IP: {}".format(username, request.remote_addr))
            return render_template('login.html')
        if not psw.validate_password(str(user_password[0])):
            flash("Usuario ou senha incorretos", "danger")
            logfile.info("Unsuccessful login attempt (invalid pass) - Username: {} - IP: {}".format(username, request.remote_addr))
            return render_template('login.html')
        session['username'] = username
        logfile.info("Successful login attempt - Username: {} - IP: {}".format(username, request.remote_addr))
        return redirect('/home')
    else:
        return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def newuser():
    if request.method == 'POST':
        username = request.form.get('username').encode('utf-8')
        psw1 = request.form.get('password1').encode('utf-8')
        psw2 = request.form.get('password2').encode('utf-8')

        if psw1 == psw2:
            psw = Password(psw1)
            hashed_psw = psw.get_hashed_password()
            message, success = database.insert_user(username, hashed_psw)
            if success == 1:
                flash("Novo usuario adicionado!", "primary")
                logfile.info("New user added: {} - IP: {}".format(username, request.remote_addr))
                return redirect('/login')
            else:
                flash(message, "danger")
                logfile.info("Unsuccessful insert_user attempt. Username: {} - Database message: {} - IP: {}".format(username, message, request.remote_addr))
                return redirect('/register')

        flash("Passwords must be the same!", "danger")
        logfile.info("Different passwords. - IP: {}".format(request.remote_addr))
        return redirect('/register')
    else:
        return render_template('register.html')

@app.route('/home', methods=['GET'])
@login_required
def home():
    return render_template('index.html')

@app.route('/coupon', methods=['GET', 'POST'])
@login_required
def cupom():
    if request.method == 'POST' and ('username' in session):
        coupon = request.form.get('coupon')
        rows, success = database.get_game_coupon(coupon, session.get('username'))
        if not success or rows == None or rows == 0:
            flash("Cupom invalido", "danger")
            logfile.info("Invalid coupon: {} - IP: {} - get_game_coupon() error".format(coupon, request.remote_addr))
            return render_template('coupon.html')
        game, success = database.get_game(coupon, session.get('username'))
        if not success or game == None:
            flash("Cupom invalido", "danger")
            logfile.info("Invalid coupon: {} - success: {} - IP: {} - get_game() error".format(coupon, success, request.remote_addr))
            return render_template('coupon.html')
        flash("Voce ganhou {}".format(game[0]), "primary")
        logfile.info("Valid coupon used: {} - Game: {} - IP: {}".format(coupon, game[0], request.remote_addr))
        return render_template('coupon.html')
    else:
        return render_template('coupon.html')

if __name__ == '__main__':
    dbEndpoint = os.environ.get('MYSQL_ENDPOINT')
    dbUser = os.environ.get('MYSQL_USER')
    dbPassword = os.environ.get('MYSQL_PASSWORD')
    dbName = os.environ.get('MYSQL_DB')
    database = DataBase(dbEndpoint, dbUser, dbPassword, dbName)
    init_db(database)
    app.run(host='0.0.0.0',port=10010, debug=True)
