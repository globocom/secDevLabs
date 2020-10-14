FROM openjdk:8-jdk-alpine

RUN apk add --update netcat-openbsd && rm -rf /var/cache/apk/*

COPY deployments/wait-for /wait-for

RUN chmod +x /wait-for

RUN addgroup -S spring && adduser -S spring -G spring

USER spring:spring

VOLUME /app

RUN mvn install -U -Dmaven.test.skip=true

ADD app/backend/target/streaming-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENV JAVA_OPTS=""