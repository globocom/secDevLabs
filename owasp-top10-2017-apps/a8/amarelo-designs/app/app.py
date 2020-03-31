# coding: utf-8

from flask import Flask, request, make_response, render_template, redirect, flash
from datetime import datetime, timedelta
import uuid
import pickle
import base64
import os
import jwt
app = Flask(__name__)


@app.route("/")
def ola():
    return render_template('index.html')

@app.route("/admin", methods=['GET','POST'])
def login():
    if request.method == 'POST':
        username = request.values.get('username')
        password = request.values.get('password')
    
        if username == "admin" and password == os.environ['ADMIN_PASSWORD']:
            token = jwt.encode(
                {
                    "exp": datetime.utcnow() + timedelta(minutes=15),
                    "username": username,
                    "sessionId": str(uuid.uuid4().hex),
                    "admin": True
                },
                os.environ.get('JWT_SECRET'),
                algorithm="HS256"
            )
            resp = make_response(redirect("/user"))
            resp.set_cookie("sessionId", token)
            return resp

        else:
            return redirect("/admin")

    else:
        return render_template('admin.html')

@app.route("/user", methods=['GET'])
def userInfo():
    cookie = request.cookies.get("sessionId")

    if cookie == None:
        return "Não Autorizado!"
    try:
        token = jwt.decode(cookie, os.environ.get('JWT_SECRET'), algorithms=['HS256'])
    except jwt.InvalidTokenError:
        return "Não Autorizado!"

    return render_template('user.html')
    



if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
