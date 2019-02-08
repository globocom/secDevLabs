# coding: utf-8

from flask import Flask, request, make_response, render_template, redirect, flash
import uuid
import pickle
import hmac
import hashlib
import base64
import jwt
import os

app = Flask(__name__)


@app.route("/")
def ola():
    return render_template('index.html')

def jwt_secret():
    return os.environ['JWT_SECRET']

def get_cookie():
    cookie = request.cookies.get("sessionId", "")
    try:
        return jwt.decode(cookie, jwt_secret(), algorithms=['HS256']), None
    except :
        return None,'Não Autorizado!'

def prepare_cookie(value):
    encoded_jwt = jwt.encode(value, jwt_secret(), algorithm='HS256')
    return encoded_jwt

@app.route("/admin", methods=['GET','POST'])
def login():
    if request.method == 'POST':
        username = request.values.get('username')
        password = request.values.get('password')
    
        if username == "admin" and password == "admin":
            token = str(uuid.uuid4().hex)
            cookie = { "username":username, "admin":True, "sessionId":token }
            prepared_cookie = prepare_cookie(cookie)
            resp = make_response(redirect("/user"))
            resp.set_cookie("sessionId", prepared_cookie)
            return resp

        else:
            return redirect("/admin")

    else:
        return render_template('admin.html')

@app.route("/user", methods=['GET'])
def userInfo():
    cookie, err = get_cookie()
    if err:
        return err

    return render_template('user.html')
    
if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
