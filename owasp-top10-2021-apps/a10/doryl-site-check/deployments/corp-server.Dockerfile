FROM python:3

WORKDIR /www/

COPY app/corp-server/ /www/

CMD python3 -m http.server 8080
