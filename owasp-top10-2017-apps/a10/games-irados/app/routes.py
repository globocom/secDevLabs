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
    make_response,
    session
)
from util.init_db import init_db
from flask.logging import default_handler
from flask_bootstrap import Bootstrap
from model.password import Password
from model.db import DataBase
import logging
import os

from flask_cors import CORS, cross_origin
from model.db import DataBase

app = Flask(__name__)
bootstrap = Bootstrap(app)

app.config.from_pyfile('config.py')

logger = logging.getLogger('games-irados')
logger.setLevel(logging.INFO)

ch = logging.StreamHandler()
ch.setLevel(logging.INFO)
formatter = logging.Formatter(
    '%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)

logger.addHandler(ch)


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
            return "ERROR: Wrong value for csrf_token"


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'username' not in session:
            flash('oops, session expired', "danger")
            return redirect('/login')
        return f(*args, **kwargs)
    return decorated_function


@app.route('/', methods=['GET'])
def root():
    return redirect('/login')


@app.route('/logout', methods=['GET'])
@login_required
def logout():
    session.clear()
    return redirect('/login')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        log_content = {
            "ip_adress": request.remote_addr,
            "username": "unknown",
            "action": "",
            "request_route": request.path,
            "request_method": request.method,
            "response": "200",
            "outcome": ""
        }
        username = request.form.get('username').encode('utf-8')
        psw = Password(request.form.get('password').encode('utf-8'))
        user_password, success = database.get_user_password(username)
        log_content["action"] = "Login attempt"
        if not success or user_password == None or not psw.validate_password(str(user_password[0])):
            log_content["outcome"] = "login failed"
            log_content["response"] = "403"
            logger.error(log_content)
            flash("Usuario ou senha incorretos", "danger")
            return render_template('login.html')
        session['username'] = username
        log_content["outcome"] = "login successful"
        logger.info(log_content)
        return redirect('/home')
    else:
        return render_template('login.html')


@app.route('/register', methods=['GET', 'POST'])
def newuser():
    if request.method == 'POST':
        log_content = {
            "ip_adress": request.remote_addr,
            "username": "unknown",
            "message": "",
            "request_route": request.path,
            "request_method": request.method,
            "response": "200",
            "outcome": ""
        }
        username = request.form.get('username').encode('utf-8')
        psw1 = request.form.get('password1').encode('utf-8')
        psw2 = request.form.get('password2').encode('utf-8')
        log_content["message"] = "Register attempt"
        if psw1 == psw2:
            psw = Password(psw1)
            hashed_psw = psw.get_hashed_password()
            message, success = database.insert_user(username, hashed_psw)
            if success == 1:
                log_content["outcome"] = "Register successful"
                logger.info(log_content)
                flash("Novo usuario adicionado!", "primary")
                return redirect('/login')
            else:
                log_content["status"] = "500"
                log_content["outcome"] = "Register failed"
                logger.error(log_content)
                flash(message, "danger")
                return redirect('/register')
        log_content["outcome"] = "Passwords don't match"
        log_content["status"] = "500"
        logger.error(log_content)
        flash("Passwords must be the same!", "danger")
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
    if request.method == 'POST':
        log_content = {
            "ip_adress": request.remote_addr,
            "username": session.get('username'),
            "message": "",
            "request_route": request.path,
            "request_method": request.method,
            "response": "200",
            "outcome": ""
        }
        log_content["message"] = "Coupon retrieval attempt"
        coupon = request.form.get('coupon')
        rows, success = database.get_game_coupon(
            coupon, session.get('username'))
        if not success or rows == None or rows == 0:
            log_content["outcome"] = "Invalid coupon"
            log_content["status"] = "422"
            logger.error(log_content)
            flash("Cupom invalido", "danger")
            return render_template('coupon.html')
        game, success = database.get_game(coupon, session.get('username'))
        if not success or game == None:
            log_content["outcome"] = "Invalid coupon"
            log_content["status"] = "422"
            logger.error(log_content)
            flash("Cupom invalido", "danger")
            return render_template('coupon.html')
        log_content["outcome"] = "Coupon validated"
        log_content["status"] = "200"
        logger.info(log_content)
        flash("Voce ganhou {}".format(game[0]), "primary")
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
    app.run(host='0.0.0.0', port=3001, debug=True)
