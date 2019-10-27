FROM python:3.7-buster

RUN mkdir /app
COPY . /app
WORKDIR /app

RUN apt-get update && apt-get install -y cowsay

RUN pip3 install -I flask

CMD ["python3",  "/app/online_cowsay.py"]



