FROM python:3
WORKDIR /app
ADD app/requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt
RUN export APP_JWT_KEY=$(openssl rand -base64 32)
CMD python app.py
