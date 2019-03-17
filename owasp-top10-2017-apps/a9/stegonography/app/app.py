# coding: utf-8

import os
from flask import Flask, render_template, request, redirect, url_for
from werkzeug.utils import secure_filename

app = Flask(__name__)

@app.route("/", methods=['GET','POST'])
def home():
    if request.method == 'GET':
        return render_template('index.html')

@app.route("/healthcheck")
def healthcheck():
    return "Working!"

if __name__ == '__main__':
    app.run(host='0.0.0.0',
            port=10009,
            ssl_context='adhoc',
            )
