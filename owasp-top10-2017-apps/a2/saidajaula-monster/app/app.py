#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask, request, make_response, render_template, redirect, Markup
from model.password import Password
from model.db import DataBase
import base64
import os
import json
import hashlib, binascii
import time
import uuid
from functools import wraps
import uuid
import jwt
import time


app = Flask(__name__)
database = DataBase(os.environ.get('A2_DATABASE_HOST'), os.environ.get('A2_DATABASE_USER'),
    os.environ.get('A2_DATABASE_PASSWORD'), os.environ.get('A2_DATABASE_NAME'))

SECRET_KEY = os.environ.get('A2_SECRET_KEY')

def encode_session_cookie(decoded_cookie):
    payload = {
        'exp': int(time.time()) + 30, # 30 seconds just for testing
        'data': decoded_cookie,
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

def decode_session_cookie(encoded_cookie):
    result = jwt.decode(encoded_cookie, SECRET_KEY, algorithms='HS256')
    return result['data']

def login_admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        cookie = request.cookies.get("sessionId", "")

        if not cookie:
            return redirect("/login")

        try:
            cookie = decode_session_cookie(cookie)
        except:
            return redirect("/login")

        if cookie['permissao'] != 1:
            return redirect("/login")

        return f(*args, **kwargs)
    return decorated_function

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        cookie = request.cookies.get("sessionId", "")

        if not cookie:
            return redirect("/login")

        try:
            cookie = decode_session_cookie(cookie)
        except:
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


@app.route("/login", methods=['GET','POST'])
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

        if result == None:
            return "Login failed! \n"

        password = Password(form_password, form_username, result[2])
        if not password.validate_password(result[0]):
            return "Login failed! \n"

        cookie_dic = {"permissao": result[1], "username": form_username}
        cookie = encode_session_cookie(cookie_dic)
        resp = make_response()
        resp.set_cookie("sessionId", cookie)
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
    if not SECRET_KEY:
        raise Exception('Your application must define an A2_SECRET_KEY environment variable')

    app.run(debug=True, host='0.0.0.0', port=10082)
