FROM mongo

ADD deployments/mongo-init.js /docker-entrypoint-initdb.d/