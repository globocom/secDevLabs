# pull official base image
FROM node:13.12.0-alpine

WORKDIR /app

ADD app/ /app/

RUN apk update && npm install

CMD npm start