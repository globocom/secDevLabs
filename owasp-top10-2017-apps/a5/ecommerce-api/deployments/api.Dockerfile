FROM golang

ADD . /go/src/github.com/globocom/secDevLabs/owasp-top10-2017-apps/a5/ecommerce-api
WORKDIR /go/src/github.com/globocom/secDevLabs/owasp-top10-2017-apps/a5/ecommerce-api
