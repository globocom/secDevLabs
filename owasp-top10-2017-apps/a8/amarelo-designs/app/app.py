# coding: utf-8
import os
import jwt
import uuid

from datetime import datetime, timedelta
from flask import Flask, request, make_response, render_template, redirect, flash

app = Flask(__name__)

@app.route("/")
def ola():
    return render_template('index.html')

@app.route("/admin", methods=['GET','POST'])
def login():
    user_admin = os.environ("USER_ADMIN")
    pass_admin = os.environ("PASS_ADMIN")
    jwt_priv_key = os.environ("JWT_PRIV_KEY")

    if request.method == 'POST':
        username = request.values.get('username')
        password = request.values.get('password')
    
        if username == user_admin and password == pass_admin:
            session_id = str(uuid.uuid4().hex)
            claims = {              
                "username": username,
                "admin": True,
                "sessionId": session_id,
                "exp": datetime.utcnow() + timedelta(minutes=60*5)
            }
            try:
                encoded_token = jwt.encode(claims, jwt_priv_key, algorithms=["ES256"])
            except jwt.PyJWTError:
                return "Error!\n"
            resp = make_response(redirect("/user"))
            resp.set_cookie("sessionId", encoded_token)
            return resp

        else:
            return redirect("/admin")

    else:
        return render_template('admin.html')

@app.route("/user", methods=['GET'])
def userInfo():
    jwt_pub_key = os.environ("JWT_PUB_KEY")
    encoded_jwt = request.cookies.get("sessionId", "")
    if encoded_jwt == None:
        return "Não Autorizado!"
    try:
        decoded_token = jwt.decode(encoded_jwt, jwt_pub_key, algorithms=["ES256"])
    except jwt.PyJWTError:
        return redirect("/admin")

    return render_template('user.html')
    
if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
