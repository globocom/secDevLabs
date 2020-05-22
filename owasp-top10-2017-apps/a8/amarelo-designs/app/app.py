# coding: utf-8

from flask import Flask, request, make_response, render_template, redirect, flash
import uuid
import base64
import jwt
import datetime
import os
app = Flask(__name__)

JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')

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

            if JWT_SECRET_KEY == None:
                return "Internal Error"

            payload_cookie = {
                "username":username,
                "admin":True,
                "sessionId":token,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(seconds=600)
            }

            cookie_encoded = jwt.encode(payload_cookie, JWT_SECRET_KEY, algorithm='HS256')
            resp = make_response(redirect("/user"))
            resp.set_cookie("sessionId", cookie_encoded)
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
        jwt.decode(cookie, JWT_SECRET_KEY, algorithms=['HS256'])
    except:
        return "Não Autorizado!"

    return render_template('user.html')
    



if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
