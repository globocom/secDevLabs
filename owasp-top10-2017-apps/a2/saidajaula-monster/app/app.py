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
import jwt
from functools import wraps

jwt_secret = os.environ.get('JWT_SECRET')
jwt_algorithm = os.environ.get('JWT_ALGORITHM')

app = Flask(__name__)
database = DataBase(os.environ.get('A2_DATABASE_HOST'),
                    os.environ.get('A2_DATABASE_USER'),
                    os.environ.get('A2_DATABASE_PASSWORD'),
                    os.environ.get('A2_DATABASE_NAME'))


def login_admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        cookie = request.cookies.get("sessionId", "")

        jwt_token = request.cookies.get("sessionId", "")

        try:
            jwt_token_decoded = jwt.decode(jwt_token, jwt_secret, algorithm='HS256')
            print(jwt_token_decoded)
        except:
            return "Invalid cookie!"

        if jwt_token_decoded['username'] == 'admin':
            return f(*args, **kwargs)
        else:
            return "You don't have permission to access this route. You are not an admin. \n"

    return decorated_function


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        jwt_token = request.cookies.get("sessionId", "")

        try:
            jwt_token_decoded = jwt.decode(jwt_token, jwt_secret, algorithm='HS256')
            print(jwt_token_decoded)
        except:
            return "Invalid cookie! \n"
        else:
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

        result, success = database.get_user(form_username)
        if not success:
            return "Login failed! \n"

        if result is None:
            return "Login failed! \n"

        password = Password(form_password, form_username, result[2])
        if not password.validate_password(result[0]):
            return "Login failed! \n"

        # implementing jwt
        payload = {'username': form_username}
        jwt_token = jwt.encode(payload, jwt_secret, jwt_algorithm)
        print(jwt_token)
        resp = make_response("Logged in!")
        resp.set_cookie("sessionId", jwt_token)

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
