# coding: utf-8

from distutils.log import error
from secrets import token_urlsafe
from flask import Flask, request, make_response, render_template, redirect, flash
import uuid
import os
import jwt
from datetime import datetime, timedelta
app = Flask(__name__)

admin_user = os.environ.get("ADMIN_USER")
admin_pass = os.environ.get("ADMIN_PASS")
jwt_secret_key = os.environ.get("JWT_SECRET_KEY")

@app.route("/")
def ola():
    return render_template('index.html')

@app.route("/admin", methods=['GET','POST'])
def login():

    

    if request.method == 'POST':
        username = request.values.get('username')
        password = request.values.get('password')
    
        if username == admin_user and password == admin_pass:
            session_id = str(uuid.uuid4().hex)

            claims = {
                "username": username,
                "admin": True,
                "sessionId": session_id,
                "exp": datetime.utcnow() + timedelta(seconds = 30)

            }
            try:
                token = jwt.encode(claims, jwt_secret_key, algorithms = "HS256")
            except:
                return "Error!\n"
            resp = make_response(redirect("/user"))
            resp.set_cookie("sessionId", token)
            return resp

        else:
            return redirect("/admin")

    else:
        return render_template('user.html')

@app.route("/user", methods=['GET'])
def userInfo():
   
    token = request.cookies.get("sessionId", "")

       
    if token["admin"] == None:
            return "Não Autorizado!"
            
    try:

        decoded_token = jwt.decode(token, jwt_secret_key, algorithms = "HS256")

    except:
        return render_template('/admin')
                
    return redirect("user.html")



if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
