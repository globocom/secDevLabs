FROM maven:3.6.0-jdk-11-slim AS build

COPY app/backend/src /home/app/src

COPY app/backend/pom.xml /home/app

RUN mvn -f /home/app/pom.xml install -U -Dmaven.test.skip=true

FROM openjdk:8-jdk-alpine

RUN apk add --update netcat-openbsd && rm -rf /var/cache/apk/*

COPY deployments/wait-for /wait-for

RUN chmod +x /wait-for

RUN addgroup -S spring && adduser -S spring -G spring

USER spring:spring

VOLUME /app

COPY --from=build /home/app/target/streaming-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENV JAVA_OPTS=""