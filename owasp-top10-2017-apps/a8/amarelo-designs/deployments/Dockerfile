FROM python:3
RUN apt-get update && apt-get -y install netcat && apt-get clean
WORKDIR /app
ADD app/requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt
CMD python app.py
