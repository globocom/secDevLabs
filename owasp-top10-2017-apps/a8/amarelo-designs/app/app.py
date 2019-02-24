# coding: utf-8

from flask import Flask, request, make_response, render_template, redirect, flash, session
import uuid
import pickle
import base64
import os
app = Flask(__name__)

app.secret_key = os.environ.get('SECRET_KEY', 'default_secret_key')

if app.secret_key == 'default_secret_key':
    print("[UNSAFE MODE] - The SECRET_KEY has not been set!")


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
            session['userSession'] = { "username":username, "admin":True, "sessionId":token }
            return redirect("/user")
        return redirect("/admin")
    return render_template('admin.html')

@app.route("/user", methods=['GET'])
def userInfo():
    cookie = request.cookies.get("sessionId")
    if 'userSession' not in session:
        return "Não Autorizado!"
    return render_template('user.html')
    
if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
