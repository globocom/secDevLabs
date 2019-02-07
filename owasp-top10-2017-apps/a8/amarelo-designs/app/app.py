# coding: utf-8

import uuid
import base64

import jwt

from flask import Flask, request, make_response, render_template, redirect, flash


app = Flask(__name__)
vulnerable_secret = 'app-vulnerable-secret'
sessions_db = {}

@app.route("/")
def ola():
    return render_template('index.html')

@app.route("/admin", methods=['GET','POST'])
def login():
    if request.method == 'POST':
        username = request.values.get('username')
        password = request.values.get('password')

        if username == "admin" and password == "admin":
            session_id = str(uuid.uuid4().hex)
            cookie = {
                "username": username,
                "admin": True,
                "sessionId": session_id,
            }

            encodedSessionCookie = jwt.encode(cookie, vulnerable_secret, algorithm='HS256')
            resp = make_response(redirect("/user"))
            resp.set_cookie("sessionId", encodedSessionCookie)
            sessions_db[session_id] = cookie

            return resp

        else:
            return redirect("/admin")

    else:
        return render_template('admin.html')

@app.route("/user", methods=['GET'])
def userInfo():
    raw_cookie = request.cookies.get("sessionId")
    if raw_cookie == None:
        return "Não Autorizado!"

    cookie = jwt.decode(raw_cookie, vulnerable_secret, algorithms=['HS256'])
    session = sessions_db.get(cookie.get('sessionId'))
    if not session:
        return "Não Autorizado!"

    username_session = session.get('username')
    username_cookie = cookie.get('username')
    if username_cookie != username_session:
        return "Não Autorizado!"

    admin_session = session.get('admin')
    admin_cookie = cookie.get('admin')
    if admin_cookie != admin_session:
        return "Não Autorizado!"

    return render_template('user.html')


if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
