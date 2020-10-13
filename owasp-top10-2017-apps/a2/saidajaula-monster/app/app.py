#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask, request, make_response, render_template, redirect, Markup
from model.password import Password
from model.db import DataBase
import base64
import os
import json
import hashlib
import uuid
from functools import wraps
from datetime import datetime
import random
import string

app = Flask(__name__)
database = DataBase(os.environ.get('A2_DATABASE_HOST'),
                    os.environ.get('A2_DATABASE_USER'),
                    os.environ.get('A2_DATABASE_PASSWORD'),
                    os.environ.get('A2_DATABASE_NAME'))


def gen_random_string():
    chars = string.ascii_letters + string.digits
    return ''.join(random.choice(chars) for i in range(20))


def basic_authentication(cookie):
    cookie = base64.b64decode(cookie).decode("utf-8")

    auth_token = database.get_token(cookie)

    if not auth_token:
        return False, None

    user_data = database.get_user(guid=auth_token[0])
    permission = user_data[0][1]

    return True, permission


def login_admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        authenticated, permission = basic_authentication(request.cookies.get(
            "sessionId", ""))

        if not authenticated:
            return redirect("/login")

        if permission != 1:
            return "You don't have permission to access this route. You are not an admin. \n"
        return f(*args, **kwargs)
    return decorated_function


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        authenticated = basic_authentication(request.cookies.get(
            "sessionId", ""))[0]

        if not authenticated:
            return redirect("/login")

        return f(*args, **kwargs)
    return decorated_function


@app.route("/", methods=['GET'])
def home():
    return render_template('index.html')


@app.route("/register", methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return render_template('register.html')

    if request.method == 'POST':
        form_username = request.form.get('username', "")
        form_password = request.form.get('password', "")
        form_password2 = request.form.get('password2', "")

        if form_username == "" or form_password == "":
            return "Error! You have to pass username and password! \n"
        elif form_password != form_password2:
            return "Error! Passwords must be the same! \n"

        guid = str(uuid.uuid4())
        password = Password(form_password, form_username, guid)
        hashed_password = password.get_hashed_password()
        message, success = database.insert_user(guid, form_username, hashed_password)
        if success:
            return render_template('login.html')
        return "Error: account creation failed \n"


@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')

    if request.method == 'POST':
        form_username = request.form.get('username', "")
        form_password = request.form.get('password', "")
        if form_username == "" or form_password == "":
            return "Error! You have to pass username and password! \n"

        result, success = database.get_user(username=form_username)

        if not success:
            return "Login failed! \n"

        if result is None:
            return "Login failed! \n"

        password = Password(form_password, form_username, result[2])
        if not password.validate_password(result[0]):
            return "Login failed! \n"

        now = datetime.now()

        cookie = str(form_username) + str(result[2]) + now.__str__() + gen_random_string()
        hash_cookie = hashlib.sha256(cookie.encode('utf-8')).hexdigest()

        message, success = database.insert_auth_token(
            hash_cookie, result[2], now.date().__str__(), now.time().__str__().split('.')[0])

        if not success:
            return make_response(message)

        cookie_done = base64.b64encode(str(hash_cookie).encode("utf-8"))
        resp = make_response("Logged in!")
        resp.set_cookie("sessionId", cookie_done)
        return resp


@app.route("/admin", methods=['GET'])
@login_admin_required
def admin():
    return "You are an admin! \n"


@app.route("/user", methods=['GET'])
@login_required
def userInfo():
    return "You are an user! \n"


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=10002)
