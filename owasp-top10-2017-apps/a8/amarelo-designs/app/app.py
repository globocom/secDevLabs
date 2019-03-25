# coding: utf-8

from flask import Flask, request, make_response, render_template, redirect, flash
import uuid
import base64
import jwt
import os
app = Flask(__name__)

jwt_secret = os.environ['A8_SECRET']

@app.route("/")
def ola():
    return render_template('index.html')

@app.route("/admin", methods=['GET','POST'])
def login():
    if request.method == 'POST':
        username = request.values.get('username')
        password = request.values.get('password')
    
        if username == "admin" and password == "admin":
            token = str(uuid.uuid4().hex)
            cookie = { "username":username, "admin":True, "sessionId":token }
            encodedSessionCookie = jwt.encode(cookie, jwt_secret, algorithm='HS256')
            resp = make_response(redirect("/user"))
            resp.set_cookie("sessionId", encodedSessionCookie)
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
    cookie = jwt.decode(cookie, jwt_secret, algorithms=['HS256'])

    return render_template('user.html')
    



if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
