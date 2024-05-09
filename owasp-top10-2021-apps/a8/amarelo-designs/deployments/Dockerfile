FROM python:3
WORKDIR /app
ADD app/requirements.txt /app/requirements.txt
# Consertando a build, instalando o pacote netcat-traditional ao invés de `netcat`
RUN apt-get update && apt-get -y install netcat-traditional && apt-get clean 
RUN pip install -r requirements.txt
CMD python app.py