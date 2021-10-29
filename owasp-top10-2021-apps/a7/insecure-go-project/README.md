# Insecure Go Project

<p align="center">
    <img src="images/banner.png"/>
</p>

Insecure Go Project is a simple Golang API that contains an example of an Identity and Authentication Failure vulnerability.

## Index

- [Definition](#what-is-identity-&-authentication-failure)
- [Setup](#setup)
- [Attack narrative](#attack-narrative)
- [Objectives](#secure-this-app)
- [Solutions](#pr-solutions)
- [Contributing](#contributing)

## What is Identity and Authentication Failure?

Application functions related to authentication and session management are often implemented incorrectly, allowing attackers to compromise passwords, keys, or session tokens, or to exploit other implementation flaws to assume other users’ identities temporarily or permanently.

The main goal of this app is to discuss how **Identity and Authentication Failure** vulnerabilities can be exploited and to encourage developers to send secDevLabs Pull Requests on how they would mitigate these flaws.

## Setup

To start this intentionally **insecure application**, you will need [Docker][docker install] and [Docker Compose][docker compose install]. After forking [secDevLabs](https://github.com/globocom/secDevLabs), you must type the following commands to start:

```sh
cd secDevLabs/owasp-top10-2017-apps/a2/insecure-go-project
```

```sh
make install
```

Then simply visit [localhost:10002][app] ! 😆

## Get to know the app 🐼

To properly understand how this application works, you can try:

- To take a moment to read the app's source code, and see how it works.

## Attack narrative

Now that you know the purpose of this app, what could go wrong? The following section describes how an attacker could identify and eventually find sensitive information about the app or its users. We encourage you to follow these steps and try to reproduce them on your own to better understand the attack vector! 😜

### 👀

#### Sensitive hardcoded credentials allow an attacker access to the database

After inspecting the application source code, it is possible to identify that some sensitive data from MongoDB are hardcoded on the [`config.yml`](../app/config.yml), as shown on the picture below:

<img src="images/attack-1.png" align="center"/>

This issue can also be found on [`mongo-init.js`](../deployments/mongo-init.js) file, as shown bellow:

<img src="images/attack-2.png" align="center"/>

### 🔥

Using this credentials to access local MongoDB, it was possible to check that they are indeed valid:

<img src="images/attack-3.png" align="center"/>

## Secure this app

How would you mitigate this vulnerability? After your changes, an attacker should not be able to:

- Find sensitive information (such as passwords or usernames) hardcoded.

## PR solutions

[Spoiler alert 🚨 ] To understand how this vulnerability can be mitigated, check out [these pull requests](https://github.com/globocom/secDevLabs/pulls?q=is%3Apr+label%3A%22mitigation+solution+%F0%9F%94%92%22+label%3A%22Insecure+Go+project%22)!

## Contributing

We encourage you to contribute to SecDevLabs! Please check out the [Contributing to SecDevLabs](../../../docs/CONTRIBUTING.md) section for guidelines on how to proceed! 🎉

[docker install]: https://docs.docker.com/install/
[docker compose install]: https://docs.docker.com/compose/install/
[app]: http://localhost:10002
[dirb]: https://tools.kali.org/web-applications/dirb
