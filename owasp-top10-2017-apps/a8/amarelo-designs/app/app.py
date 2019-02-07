# coding: utf-8

from flask import Flask, request, make_response, render_template, redirect, flash
import uuid
import pickle
import hmac
import hashlib
import base64
app = Flask(__name__)


@app.route("/")
def ola():
    return render_template('index.html')

def prepare_cookie(value):
    pickle_resultado = pickle.dumps(value)
    encodedSessionCookie =  hmac.new('shared-key', pickle_resultado, hashlib.sha1).hexdigest()
    prepared_cookie = '%s.%s' % (pickle_resultado, encodedSessionCookie)
    return prepared_cookie

def get_cookie():
    cookie = request.cookies.get("sessionId")
    if cookie == None:
        return None,'Não Autorizado!'

    pickled_data, recvd_digest  = cookie.split('.')
    new_digest = hmac.new('shared-key', pickled_data, hashlib.sha1).hexdigest()
    if recvd_digest != new_digest:
        return None, 'Integrity check failed'
    else:
        unpickled_data = pickle.loads(pickled_data)        
        cookie = pickle.loads(base64.b64decode(cookie))
        return cookie, None


@app.route("/admin", methods=['GET','POST'])
def login():
    if request.method == 'POST':
        username = request.values.get('username')
        password = request.values.get('password')
    
        if username == "admin" and password == "admin":
            token = str(uuid.uuid4().hex)
            cookie = { "username":username, "admin":True, "sessionId":token }
            prepared_cookie = prepare_cookie(cookie)
            resp = make_response(redirect("/user"))
            resp.set_cookie("sessionId", prepared_cookie)
            return resp

        else:
            return redirect("/admin")

    else:
        return render_template('admin.html')

@app.route("/user", methods=['GET'])
def userInfo():
    cookie, err = get_cookie()
    if err:
        return err

    return render_template('user.html')
    
if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
