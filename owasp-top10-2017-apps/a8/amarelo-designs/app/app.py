# coding: utf-8

from flask import Flask, request, make_response, render_template, redirect, flash
import uuid
import pickle
import base64
import hmac
import hashlib
import jwt
import datetime
from hashlib import sha1
from flask.sessions import session_json_serializer
from itsdangerous import URLSafeTimedSerializer
app = Flask(__name__)

app.config['SECRET_KEY'] = "secret"


@app.route("/")
def ola():
    return render_template('index.html')

@app.route("/admin", methods=['GET','POST'])
def login():
    if request.method == 'POST':
        username = request.values.get('username')
        password = request.values.get('password')
    
        if username == "admin" and password == "admin":
            payload = { 
                "username":username, 
                "admin":True,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(seconds=360)
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
    token = request.cookies.get("sessionId", "")
    try:
        data = jwt.decode(token, app.config['SECRET_KEY'], algorithms="HS256")
    except:
        if jwt.exceptions.ExpiredSignatureError:
            return redirect("/")
        return "Invalid cookie!"
    if(len(data) != 3):
        return "Invalid cookie!"
    if data['admin'] != True:
        return "You are not an admin. \n"
    return render_template('user.html')

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
