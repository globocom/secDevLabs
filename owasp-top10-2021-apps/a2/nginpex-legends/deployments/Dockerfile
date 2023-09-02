FROM python

RUN pip3 install flask pycryptodome ecdsa

RUN mkdir /uploads

WORKDIR /app

ENTRYPOINT FLASK_APP=app flask run --host=0.0.0.0 --port=10002
