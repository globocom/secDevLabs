FROM golang:1.14

WORKDIR /go/src/github.com/globocom/secDevLabs/owasp-top10-2017-apps/a5/ecommerce-api/app

COPY app/go.mod app/go.sum ./
RUN go mod download

COPY app/ ./
