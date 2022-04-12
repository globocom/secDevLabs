#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask, request, render_template, redirect, session
from model.password import Password
from model.db import DataBase
import os
import uuid
from functools import wraps
from datetime import timedelta

app = Flask(__name__)
database = DataBase(os.environ.get('A2_DATABASE_HOST'),
                    os.environ.get('A2_DATABASE_USER'),
                    os.environ.get('A2_DATABASE_PASSWORD'),
                    os.environ.get('A2_DATABASE_NAME'))

app.config['SECRET_KEY'] = os.environ.get("SECRET")
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=5)

def login_admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not all(k in session for k in ('username','permissao')):
            return redirect("/login")
        if session['permissao'] != 1:
            return "You don't have permission to access this route. You are not an admin. \n"
        return f(*args, **kwargs)
    return decorated_function

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not all(k in session for k in ('username','permissao')):
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
        
        result, success = database.get_user(form_username)
        if success and result == None:
            guid = str(uuid.uuid4())
            password = Password(form_password, form_username, guid)
            hashed_password = password.get_hashed_password()
            message, success = database.insert_user(guid, form_username, hashed_password)
            if success:
                return render_template('login.html')
            return "Error: account creation failed; Database_message: {}\n".format(message)
        return "User already exist."

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
        #result[0]=password_hash; result[1]=permissao; result[2]=salt;
        if (not success) or (result is None):
            return "Login failed! \n"

        password = Password(form_password, form_username, result[2])
        if not password.validate_password(result[0]):
            return "Login failed! \n"

        session['permissao'] = result[1]
        session['username'] = form_username
        return "Logged in!"

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
