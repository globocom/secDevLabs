# coding: utf-8

from flask import Flask, session, request, make_response, render_template, redirect, flash
import uuid
import os
import base64
app = Flask(__name__)
app.secret_key = os.environ["SECRET_KEY"]

@app.route("/")
def ola():
    return render_template('index.html')

@app.route("/admin", methods=['GET','POST'])
def login():
    if request.method == 'POST':
        username = request.values.get('username')
        password = request.values.get('password')
    
        if username == os.environ["ADMIN_CRED_USER"] and password == os.environ["ADMIN_CRED_PASS"]:
            session['username'] = username
            session['admin'] = True
            return make_response(redirect("/user"))

        else:
            return redirect("/admin")

    else:
        return render_template('admin.html')

@app.route("/user", methods=['GET'])
def userInfo():
    cookie = request.cookies.get("sessionId")
    if 'username' not in session:
        return "Não Autorizado!"
    return render_template('user.html')


if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
