# edn-parser

API used to parse external EDN files

## What is Insecure Deserialization?

Insecure deserialization often leads to remote code execution. Even if deserialization flaws do not result in remote code execution, they can be used to perform attacks, including replay attacks, injection attacks, and privilege escalation attacks.

The main goal of this app is to discuss how insecure deserialization vulnerabilities can be exploited and to encourage developers to send secDevLabs Pull Requests on how they would mitigate these flaws.

## Setup
To start this intentionally **insecure application**, you will need [Docker][Docker Install] and [Docker Compose][Docker Compose Install]. After forking [secDevLabs](https://github.com/globocom/secDevLabs), you must type the following commands to start:

```sh
cd secDevLabs/owasp-top10-2017-apps/a8/edn-parser
```

```sh
make install
```

## Get to know the app work
To properly understand how this application works, you can follow these simple steps:

```sh
curl http://127.0.0.1:8080/parse-edn -H 'content-type: application/json' -d '{"query":"http://url.of.edn.file"}'
```
