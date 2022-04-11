# coding: utf-8

from flask import Flask, request, make_response, render_template, redirect, session
import uuid
import os
from datetime import timedelta

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get("SECRET")
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=5)

admin_token = []

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
            admin_token.append(token)
            session['sessionID'] = token
            return redirect('/user')

        else:
            return redirect("/admin")

    else:
        return render_template('admin.html')

@app.route("/user", methods=['GET'])
def userInfo():
    cookie = session['sessionID']
    if cookie == None:
        return render_template('admin.html')
    if cookie in admin_token:
        return render_template('user.html')
    return render_template('admin.html')

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
