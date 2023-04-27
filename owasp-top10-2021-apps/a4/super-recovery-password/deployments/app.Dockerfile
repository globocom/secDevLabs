FROM node:18-alpine

WORKDIR /app

ADD ./src/app/ /app/

RUN apk update && npm install

CMD npm start