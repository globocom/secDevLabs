FROM golang

ADD . /go/src/github.com/globocom/secDevLabs/owasp-top10-2017-apps/a1/copy-n-paste/
WORKDIR /go/src/github.com/globocom/secDevLabs/owasp-top10-2017-apps/a1/copy-n-paste/
