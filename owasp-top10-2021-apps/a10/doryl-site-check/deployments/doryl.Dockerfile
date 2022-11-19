FROM golang:1.17.7-alpine AS build

WORKDIR /doryl-site-check

COPY app/ .
RUN go mod download

RUN go build -o /doryld

ENTRYPOINT ["/doryld"]
