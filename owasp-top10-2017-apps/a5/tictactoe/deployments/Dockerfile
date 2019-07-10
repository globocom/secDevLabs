FROM node:8.15.1-alpine
WORKDIR /
ADD ./ /
RUN apk update && \
    npm install package.json && \
    npm install -g gulp@3.9.1
CMD gulp && node src/app.js