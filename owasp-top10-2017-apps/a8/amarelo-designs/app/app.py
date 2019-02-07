# coding: utf-8

from flask import Flask, request, make_response, render_template, redirect, flash, send_from_directory
import logging
import uuid
import pickle
import base64
import os
import jwt
import time

app = Flask(__name__, static_folder=None)
app.logger.setLevel(logging.INFO)

A8_ADMIN_USERNAME = os.environ['A8_ADMIN_USERNAME']
A8_ADMIN_PASSWORD = os.environ['A8_ADMIN_PASSWORD']
A8_DEBUG = os.environ['A8_DEBUG']
A8_SECRET_KEY = os.environ['A8_SECRET_KEY']


def encode_session_cookie(decoded_cookie):
    payload = {
        'exp': int(time.time()) + 30, # 30 seconds just for testing
        'data': decoded_cookie,
    }
    return jwt.encode(payload, A8_SECRET_KEY, algorithm='HS256')

def decode_session_cookie(encoded_cookie):
    result = jwt.decode(encoded_cookie, A8_SECRET_KEY, algorithms='HS256')
    return result['data']

@app.route("/")
def ola():
    return render_template('index.html')

@app.route("/admin", methods=['GET','POST'])
def login():
    if request.method == 'POST':
        username = request.values.get('username')
        password = request.values.get('password')

        if username == A8_ADMIN_USERNAME and password == A8_ADMIN_PASSWORD:
            token = str(uuid.uuid4().hex)
            cookie_dic = { "username": username, "admin": True, "sessionId": token }
            cookie = encode_session_cookie(cookie_dic)
            resp = make_response(redirect("/user"))
            resp.set_cookie("sessionId", cookie)
            return resp

        else:
            return redirect("/admin")

    else:
        return render_template('admin.html')

@app.route("/user", methods=['GET'])
def userInfo():
    cookie = request.cookies.get("sessionId", "")

    if not cookie:
        return redirect("/admin")

    try:
        cookie = decode_session_cookie(cookie)
    except:
        return redirect("/admin")

    return render_template('user.html')

@app.route('/static/<path:filename>')
def my_static(filename):
    cookie = request.cookies.get("sessionId", "")

    protected_pages = [
        'User/pages/index.html',
    ]
    if filename in protected_pages:
        if not cookie:
            return redirect("/admin")

        try:
            cookie = decode_session_cookie(cookie)
        except:
            return redirect("/admin")

    return send_from_directory(
        os.path.join(app.root_path, 'static'),
        filename
    )

if __name__ == '__main__':
    is_debug = (A8_DEBUG == '1')
    app.run(debug=is_debug, host='0.0.0.0')
