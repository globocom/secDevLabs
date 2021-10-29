FROM golang

WORKDIR /go/src/github.com/globocom/secDevLabs/owasp-top10-2017-apps/a2/insecure-go-project/app

COPY app/go.mod app/go.sum ./
RUN go mod download

COPY app/ ./
