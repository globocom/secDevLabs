# Builder stage
FROM clojure:openjdk-14-lein-alpine as builder

WORKDIR /edn-parser/
ADD project.clj /edn-parser/project.clj
ADD config/ /edn-parser/config
ADD src/ /edn-parser/src

RUN lein uberjar

# Now build a fresh container, copying across the compiled pieces

FROM java:8-alpine
MAINTAINER Your Name <you@example.com>

COPY --from=builder /edn-parser/target/edn-parser-0.0.1-SNAPSHOT-standalone.jar /edn-parser/app.jar

EXPOSE 10008

CMD ["java", "-jar", "/edn-parser/app.jar"]
