FROM golang

WORKDIR /go/src/github.com/globocom/secDevLabs/owasp-top10-2017-apps/a3/snake-pro/app

COPY app/go.mod app/go.sum ./
RUN go mod download

RUN openssl req -new -newkey rsa:4096 -days 365 -nodes -x509 \
    -subj "/C=BR/ST=Denial/L=RJ/O=Dis/CN=localhost" \
    -keyout server.key  -out server.crt

COPY app/ ./
