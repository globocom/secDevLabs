FROM openjdk:8-jdk-alpine
RUN apk update && apk add bash
RUN addgroup -S spring && adduser -S spring -G spring
COPY deployments/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
USER spring:spring
VOLUME /app
ADD app/backend/target/streaming-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENV JAVA_OPTS=""