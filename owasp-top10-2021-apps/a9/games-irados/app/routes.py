import uuid
from functools import wraps
from flask import (
    Flask,
    render_template,
    request,
    redirect,
    flash,
    session
)
from util.init_db import init_db
from flask.logging import default_handler
from flask_bootstrap import Bootstrap
from model.password import Password
from model.db import DataBase
import logging
import os
from datetime import datetime

from flask_cors import CORS, cross_origin

app = Flask(__name__)
bootstrap = Bootstrap(app)

app.config.from_pyfile('config.py')

# Remove default logging configuration
logging.getLogger().setLevel(logging.NOTSET)
app.logger.handlers = []

# Configure logger for __main__
logger = logging.getLogger(__name__)
formatter = logging.Formatter('%(levelname)s: %(message)s')
stream_handler = logging.StreamHandler()
stream_handler.setFormatter(formatter)
logger.addHandler(stream_handler)
logger.setLevel(logging.INFO)

# Configure werkzeug logger
werkzeug_logger = logging.getLogger('werkzeug')
werkzeug_logger.setLevel(logging.INFO)
werkzeug_handler = logging.StreamHandler()
werkzeug_formatter = logging.Formatter('%(message)s')
werkzeug_handler.setFormatter(werkzeug_formatter)
werkzeug_logger.addHandler(werkzeug_handler)

# Remove default werkzeug logger handler
if werkzeug_logger.hasHandlers():
    werkzeug_logger.handlers.clear()

# Custom Request Logger
class RequestLogger(logging.LoggerAdapter):
    def process(self, msg, kwargs):
        request_info = request
        ip = request_info.remote_addr
        timestamp = datetime.now().strftime('%d/%b/%Y %H:%M:%S')
        method = request_info.method
        path = request_info.path
        status_code = kwargs.pop('status_code', '-')
        msg += f' - {ip} - - [{timestamp}] "{method} {path} HTTP/1.1" {status_code} -'
        return msg, kwargs

request_logger = RequestLogger(logger, {})

def generate_csrf_token():
    if '_csrf_token' not in session:
        session['_csrf_token'] = str(uuid.uuid4())
    return session.get('_csrf_token')

app.jinja_env.globals['csrf_token'] = generate_csrf_token

@app.before_request
def csrf_protect():
    if request.method == "POST":
        token_csrf = session.get('_csrf_token')
        form_token = request.form.get('_csrf_token')
        if not token_csrf or str(token_csrf) != str(form_token):
            return "ERROR: Wrong value for csrf_token"

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'username' not in session:
            flash('Oops, session expired', "danger")
            return redirect('/login')
        return f(*args, **kwargs)
    return decorated_function

@app.route('/', methods=['GET'])
def root():
    return redirect('/login')

@app.route('/logout', methods=['GET'])
@login_required
def logout():
    session.clear()
    return redirect('/login')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username').encode('utf-8')
        psw = Password(request.form.get('password').encode('utf-8'))
        user_password, success = database.get_user_password(username)
        if not success or user_password is None or not psw.validate_password(str(user_password[0])):
            request_logger.info("login inválido!", extra={'status_code': 200})
            flash("Usuário ou senha incorretos", "danger")
            return render_template('login.html')
        session['username'] = username
        request_logger.info("login efetuado com sucesso!", extra={'status_code': 302})
        return redirect('/home')
    else:
        return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def newuser():
    if request.method == 'POST':
        username = request.form.get('username').encode('utf-8')
        psw1 = request.form.get('password1').encode('utf-8')
        psw2 = request.form.get('password2').encode('utf-8')

        if psw1 == psw2:
            psw = Password(psw1)
            hashed_psw = psw.get_hashed_password()
            message, success = database.insert_user(username, hashed_psw)
            if success == 1:
                flash("Novo usuário adicionado!", "primary")
                return redirect('/login')
            else:
                flash(message, "danger")
                return redirect('/register')

        flash("As senhas devem ser iguais!", "danger")
        return redirect('/register')
    else:
        return render_template('register.html')

@app.route('/home', methods=['GET'])
@login_required
def home():
    return render_template('index.html')

@app.route('/coupon', methods=['GET', 'POST'])
@login_required
def cupom():
    if request.method == 'POST':
        coupon = request.form.get('coupon')
        username = session.get('username')
        if coupon:
            coupon_display = '****'  # Oculta o valor do cupom
        else:
            coupon_display = coupon
        
        request_logger.info(f'User: "id do usuário" attempted to redeem coupon: {coupon_display} - Result: Invalid', extra={'status_code': 200})
        
        rows, success = database.get_game_coupon(coupon, username)
        if not success or rows is None or rows == 0:
            flash("Cupom inválido", "danger")
            return render_template('coupon.html')
        game, success = database.get_game(coupon, username)
        if not success or game is None:
            flash("Cupom inválido", "danger")
            return render_template('coupon.html')
        request_logger.info(f'User: "id do usuário" redeemed coupon: {coupon_display} - Result: Valid', extra={'status_code': 200})
        flash("Você ganhou {}".format(game[0]), "primary")
        return render_template('coupon.html')
    else:
        return render_template('coupon.html')

if __name__ == '__main__':
    dbEndpoint = os.environ.get('MYSQL_ENDPOINT')
    dbUser = os.environ.get('MYSQL_USER')
    dbPassword = os.environ.get('MYSQL_PASSWORD')
    dbName = os.environ.get('MYSQL_DB')
    database = DataBase(dbEndpoint, dbUser, dbPassword, dbName)
    init_db(database)
    app.run(host='0.0.0.0', port=10010, debug=True)
