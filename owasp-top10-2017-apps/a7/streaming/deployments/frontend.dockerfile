FROM node:12.7-alpine as node
WORKDIR /app
COPY app/frontend/package.json app/frontend/package-lock.json /app/
RUN npm install
COPY app/frontend/ /app/
ARG env=prod
RUN npm run build
FROM nginx:1.17.1-alpine
COPY --from=node /app/dist/streaming /usr/share/nginx/html
COPY app/frontend/nginx-custom.conf /etc/nginx/conf.d/default.conf