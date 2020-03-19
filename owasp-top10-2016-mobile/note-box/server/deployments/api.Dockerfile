FROM golang

ADD app/ /go/src/github.com/globocom/secDevLabs/owasp-top10-2016-mobile/note-box/server/app
WORKDIR /go/src/github.com/globocom/secDevLabs/owasp-top10-2016-mobile/note-box/server/app