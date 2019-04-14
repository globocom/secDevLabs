FROM node:8.15.1-alpine
WORKDIR /app
ADD app/ /app
RUN apk update && \
    npm  install package.json
CMD node index.js