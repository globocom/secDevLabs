FROM golang

WORKDIR /go/src/github.com/globocom/secDevLabs/owasp-top10-2021-apps/a7/insecure-go-project/app

COPY app/go.mod app/go.sum ./
RUN go mod download

COPY app/ ./
