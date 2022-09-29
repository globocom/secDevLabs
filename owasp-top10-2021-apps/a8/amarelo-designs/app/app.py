# coding: utf-8

from flask import Flask, request, make_response, render_template, redirect, flash
#import uuid
#import pickle
#import base64
import os 
import jwt
app = Flask(__name__)

secret = os.environ.get('SECRET')

@app.route("/")
def ola():
    return render_template('index.html')

@app.route("/admin", methods=['GET','POST'])
def login():
    if request.method == 'POST':
        username = request.values.get('username')
        password = request.values.get('password')
    
        if username == "admin" and password == "admin":

            token = {
                #"username":username,
                "admin":True,
            }

            try: 
                encodedCookie = jwt.encode(token, secret,  algorithm='HS512')
            except:
                return "login invalido!"

            resp = make_response(redirect("/user"))
            resp.set_cookie("sessionId", encodedCookie)
            return resp

        else:
            return redirect("/admin")

    else:
        return render_template('admin.html')

@app.route("/user", methods=['GET'])
def userInfo():
    decodeCookie = request.cookies.get("sessionId", "")
    if decodeCookie == None:
        return "Não Autorizado!"
    cookie = jwt.decode(decodeCookie, secret, algorithms="HS512")

    #if cookie['admin'] != True:
    #    return "Voce não é admin \n"

    return render_template('user.html')
    



if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
