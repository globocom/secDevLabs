# coding: utf-8

from flask import Flask, request, make_response, render_template, redirect, flash
import jwt

app = Flask(__name__)
app.secret_key = 'secret_key' 


@app.route("/")
def ola():
    return render_template('index.html')


@app.route("/admin", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.values.get('username')
        password = request.values.get('password')

        if username == "admin" and password == "admin":
            token = jwt.encode({'username': username, 'admin': True}, app.secret_key, algorithm='HS256')
            resp = make_response(redirect("/user"))
            resp.set_cookie("token", token)
            return resp

        else:
            return redirect("/admin")

    else:
        return render_template('admin.html')


@app.route("/user", methods=['GET'])
def userInfo():
    token = request.cookies.get("token")
    if not token:
        return "Não Autorizado!"

    try:
        payload = jwt.decode(token, app.secret_key, algorithms=['HS256'])
        username = payload['username']
        return render_template('user.html', username=username)
    except jwt.ExpiredSignatureError:
        return "Token expirado. Por favor, faça login novamente."
    except jwt.InvalidTokenError:
        return "Token inválido. Por favor, faça login novamente."


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

