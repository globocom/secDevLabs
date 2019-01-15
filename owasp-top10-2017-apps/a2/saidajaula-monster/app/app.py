#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask, request, make_response, redirect
from model.password import Password
from model.db import DataBase
import os
import uuid
from functools import wraps
import jwt
from jwt import InvalidSignatureError



app = Flask(__name__)
database = DataBase(os.environ.get('A2_DATABASE_HOST'), os.environ.get('A2_DATABASE_USER'),
			os.environ.get('A2_DATABASE_PASSWORD'), os.environ.get('A2_DATABASE_NAME'))

def login_admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        cookie = request.cookies.get("sessionId", "")

        try:
            payload = jwt.decode(cookie, os.environ.get('JWT_SECRET'), algorithm='HS256')
        except InvalidSignatureError as e:
            return redirect("/login")

        if payload.get("permissao") != 1:
            return "You don't have permission to access this route. You are not an admin."
        return f(*args, **kwargs)
    return decorated_function

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        cookie = request.cookies.get("sessionId", "")

        try:
            payload = jwt.decode(cookie, os.environ.get('JWT_SECRET'), algorithm='HS256')
        except InvalidSignatureError as e:
            return redirect("/login")
        return f(*args, **kwargs)
    return decorated_function

@app.route("/register", methods=['POST'])
def register():
    if request.method == 'POST':
        form_username = request.form.get('username', "")
        form_password = request.form.get('password', "")
        form_password2 = request.form.get('password2', "")

        if form_username == "" or form_password == "":
            return "Error! You have to pass username and password!"
        elif form_password != form_password2:
            return "Error! Passwords must be the same!"

        guid = str(uuid.uuid4())
        password = Password(form_password, form_username, guid)
        hashed_password = password.get_hashed_password()
        message, success = database.insert_user(guid, form_username, hashed_password)
        if success:
            return "New account created!"
        return "Error: account creation failed"


@app.route("/login", methods=['POST'])
def login():
    if request.method == 'POST':
        form_username = request.form.get('username', "")
        form_password = request.form.get('password', "")
        if form_username == "" or form_password == "":
            return "Error! You have to pass username and password!"

        result, success = database.get_user(form_username)
        if not success:
            return "Login failed!"

        if result == None:
            return "Login failed!"

        password = Password(form_password, form_username, result[2])
        if not password.validate_password(result[0]):
            return "Login failed!"

        payload = {"permissao": result[1], "username": form_username}
        cookie_done = jwt.encode(payload, os.environ.get('JWT_SECRET'), algorithm='HS256')

        resp = make_response()
        resp.set_cookie("sessionId", cookie_done)

        return resp



@app.route("/admin", methods=['GET'])
@login_admin_required
def admin():
    return "You are an admin!"

@app.route("/user", methods=['GET'])
@login_required
def userInfo():
    return "You are an user!"

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=10082)
