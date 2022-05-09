# coding: utf-8

from flask import Flask, request, render_template, redirect, make_response
from model.db import DataBase
import os
import datetime
import jwt

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get("SECRET")

database = DataBase(os.environ.get('A8_DATABASE_HOST'),
                    os.environ.get('A8_DATABASE_USER'),
                    os.environ.get('A8_DATABASE_PASSWORD'),
                    os.environ.get('A8_DATABASE_NAME'))

@app.route("/")
def index():
    return render_template('index.html')

@app.before_request
def check_for_admin(*args, **kw):
    if request.path.startswith('/static/User/pages/'):
        token = request.cookies.get('sessionId')
        try:
            if jwt.decode(token, app.config['SECRET_KEY'], algorithms="HS256")["is_admin"]!="True":
                return redirect("/")
        except:
            return redirect("/")

@app.route("/admin", methods=['GET','POST'])
def login():
    if request.method == 'POST':
        username = request.values.get('username')
        password = request.values.get('password')

        if database.validate(username, password) and database.is_admin(username):
            payload = {
                "username" : username,
                "is_admin" : 'True',
                "exp" : datetime.datetime.utcnow() + datetime.timedelta(minutes=5),
            }
            token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm="HS256")
            resp = make_response(redirect("/user"))
            resp.set_cookie("sessionId", token)
            return resp
        else:
            return redirect("/admin")
    else:
        return render_template('admin.html')

@app.route("/user", methods=['GET'])
def userInfo():
    token = request.cookies.get('sessionId')
    try:
        jwt.decode(token, app.config['SECRET_KEY'], algorithms="HS256")
    except:
        return redirect("/admin")
    return render_template('user.html')

@app.route("/register", methods=['POST'])
def register():
    username = request.values.get('username')
    password = request.values.get('password')
    is_admin = request.values.get('is_admin')
    register_secret = request.values.get('register_secret')
    if register_secret==os.environ.get("REGISTER_SECRET"):
        if username and password and is_admin and len(username)<99 and len(password)<99 and (is_admin=='True' or is_admin=='False'):
            if database.insert_user(username, password, is_admin):
                return "User has been successfully added."
            else:
                return "Database error", 400 
        else:
            return "Incorrect syntax", 400
    else:
        return "Unauthorized request", 401

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
