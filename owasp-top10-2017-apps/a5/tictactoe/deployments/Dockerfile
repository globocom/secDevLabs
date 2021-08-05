FROM node:10.24.1-alpine
WORKDIR /
ADD ./ /
RUN apk update && \
    npm install package.json && \
    npm install -g gulp
CMD gulp && node src/app.js