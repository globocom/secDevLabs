FROM node:8.15.1-alpine
WORKDIR /
ADD ./ /
# To workaround 'not get uid/gid'
RUN npm config set unsafe-perm true
RUN apk update && \
    npm install package.json && \
    npm install -g gulp@3.9.1
CMD gulp && node src/app.js
