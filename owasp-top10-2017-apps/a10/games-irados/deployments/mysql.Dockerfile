FROM mysql:5.7.15

MAINTAINER me

ADD deployments/schema.sql /docker-entrypoint-initdb.d/

EXPOSE 3306
