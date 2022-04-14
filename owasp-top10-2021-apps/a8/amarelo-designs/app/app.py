# coding: utf-8

from flask import Flask, request, render_template, redirect, session
from model.db import DataBase
import uuid
import os
import logging
from datetime import timedelta

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get("SECRET")
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=5)

logging.basicConfig(filename='log.log', level=logging.DEBUG, format=f'%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')

database = DataBase(os.environ.get('A8_DATABASE_HOST'),
                    os.environ.get('A8_DATABASE_USER'),
                    os.environ.get('A8_DATABASE_PASSWORD'),
                    os.environ.get('A8_DATABASE_NAME'))

@app.route("/")
def ola():
    return render_template('index.html')

@app.route("/admin", methods=['GET','POST'])
def login():
    if request.method == 'POST':
        username = request.values.get('username')
        password = request.values.get('password')
    
        if username == os.environ.get("APP_USER") and password == os.environ.get("APP_PASS"):
            token = str(uuid.uuid4().hex)
            #admin_token.append(token)
            message, success = database.insert_token(token)
            if not success:
                app.logger.info("Database error: {}".format(message))
                return "Database error."
            session['sessionID'] = token
            return redirect('/user')

        else:
            return redirect("/admin")

    else:
        return render_template('admin.html')

@app.route("/user", methods=['GET'])
def userInfo():
    if 'sessionID' in session:
        message, success = database.get_token_id(session['sessionID'])
        if success:
            app.logger.info("Token id used: {}".format(message))
            return render_template('user.html')
    return redirect("/admin")

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
