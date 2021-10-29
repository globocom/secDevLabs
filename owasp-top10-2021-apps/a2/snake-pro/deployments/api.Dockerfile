FROM golang

WORKDIR /go/src/github.com/globocom/secDevLabs/owasp-top10-2017-apps/a3/snake-pro/app

COPY app/go.mod app/go.sum ./
RUN go mod download

COPY app/ ./
