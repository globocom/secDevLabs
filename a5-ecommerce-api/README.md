# Vulnerable Ecommerce API
> This is a simple Golang web application that contains an example of a Broken Access Control vulnerability.

<img src="images/example-api.png" align="center"/>

## What is XXE?

Definition from [OWASP](https://www.owasp.org/index.php/Broken_Access_Control):

Access control, sometimes called authorization, is how a web application grants access to content and functions to some users and not others. These checks are performed after authentication, and govern what ‘authorized’ users are allowed to do. Access control sounds like a simple problem but is insidiously difficult to implement correctly. A web application’s access control model is closely tied to the content and functions that the site provides. In addition, the users may fall into a number of groups or roles with different abilities or privileges.

## Requirements

To build this lab you will need [Docker][Docker Install] and [Docker Compose][Docker Compose Install].

## Deploy and Run

After cloning this repository, you can type the following command to start the vulnerable application:

```sh
make install
```

## Available routes

```
$ curl http://localhost:8888/healthcheck
WORKING
```

```
$ curl -s -H "Content-Type: application/json" -d '{"username":"rafael","password":"password"}' http://localhost:8888/register
Register: success!
```

```
$ curl -s -H "Content-Type: application/json" -d '{"username":"rafael","password":"password"}' http://localhost:8888/login
Hello, rafael! This is your userID: 2b53f961-85fe-4988-99b4-c90481ed54ef
```

```
$ curl http://localhost:8888/ticket/2b53f961-85fe-4988-99b4-c90481ed54ef
Hey, rafael! This is your ticket: rafael-08e8805f-422b-477b-8565-b0876b89da17
```

## Attack Narrative

To understand how this vulnerability can be exploited, check this section!

## Mitigating the vulnerability

To understand how this vulnerability can be mitigated, check this other section!

[Docker Install]:  https://docs.docker.com/install/
[Docker Compose Install]: https://docs.docker.com/compose/install/

## Contributing

Yes, please. :zap:
