
# Mongection

<p align="center"><img  src="images/a1-banner.png"/></p>

Mongection is a simple NodeJS web application that simulates a login page. It has both `/register` and `/login` routes that, by communicating with a Mongo database, enable users to register and enter into a generic system.

## Index

- [Definition](#what-is-injection)
- [Setup](#setup)
- [Attack narrative](#attack-narrative)
- [Objectives](#secure-this-app)
- [Solutions](#pr-solutions)
- [Contributing](#contributing)

## What is Injection?

Injection flaws, such as SQL, NoSQL, OS, and LDAP injection, occur when untrusted data is sent to an interpreter as part of a command or query. The attacker’s hostile data can trick the interpreter into executing unintended commands or accessing data without proper authorization.

The main goal of this project is to discuss how **NoSQL Injection** vulnerabilities can be exploited and to encourage developers to send Pull Requests to secDevLabs on how they would mitigate these flaws.

## Setup

To start this intentionally **insecure application**, you will need [Docker][Docker Install] and [Docker Compose][Docker Compose Install]. After forking [secDevLabs](https://github.com/globocom/secDevLabs), you must type the following commands to start:

```sh
cd secDevLabs/owasp-top10-2017-apps/a1/mongection
```

```sh
make install
```

Then simply visit [localhost:10001][App], as exemplified below:

<img src="images/attack0.png" align="center"/>

## Get to know the app 💉

To properly understand how this application works, you can follow these simple steps:

- Register a new user via front-end.
- Login as this user via front-end.
* Register another user now using command line:
```sh
curl -X POST http://localhost:10001/register -H "Content-Type: application/json" --data '{"name":"bob", "email":"bob@example.com", "password":"bobisboss"}'
```
* Login as this second user now using command line:
```sh
curl -X POST http://localhost:10001/login -H "Content-Type: application/json" --data '{"email":"bob@example.com", "password":"bobisboss"}'
```

## Attack Narrative

Now that you know the purpose of this app, what could go wrong? The following section describes how an attacker could identify and eventually find sensitive information about the app or its users. We encourage you to follow these steps and try to reproduce them on your own to better understand the attack vector! 😜

### 👀

#### Lack of input validation allows injection of NoSQL queries

After reviewing [`db.js`]((https://github.com/globocom/secDevLabs/blob/master/owasp-top10-2017-apps/a1/mongection/src/db.js)) file, it was possible to see that some input from users are concatenated with NoSQL queries, as shown in the following code snippets:

```js
const existUser = await User.findOne({email: email});
```

```js
const existsUser = await User.findOne({$and: [ { email: email}, { password: password} ]});
```

As no validation is being made on these variables, injected queries may be successfully executed in MongoDB. 

#### 🔥

An attacker could create a malicious query such as `{"$ne":""}` and pass it to email and password fields. Since `$ne` is the not equals condition in MongoDB, this is querying all the entries in the logins collection where both `username` and `password` are not equal to "" (empty). 

Using `curl` on CLI interface, the malicious payload could be sent as shown bellow:

```sh
curl -X 'POST' 'http://localhost:10001/login' -H "Content-Type: application/json" --data '{"email": {"$ne":""}, "password": {"$ne":""}}'
```

<p  align="center"><img  src="images/attack1.png"/></p>

The application will return the first user that MongoDB finds with a "Hello, Welcome Again!" message, demonstrating that authentication has been bypassed. There must be at least one user already registered in the database to recieve this message.

The same result could be reached if the attacker sent a payload using `$gt` (greater than) directive. The following query will search for entries with both `username` and `password `fields greater than "" (empty).

```sh
curl -X 'POST' 'http://localhost:10001/login' -H "Content-Type: application/json" --data '{"email": {"$gt": ""}, "password": {"$gt": ""}}'
```
<p  align="center"><img  src="images/attack2.png"/></p>

Another possible malicious payload could use `$in` directive. The following query will iterate through every element of the given array and try each value listed for the `username` field. Also, `{"$gt":""}` will guarantee the `password` field is not evaluated.

```sh
curl -X 'POST' 'http://localhost:10001/login' -H "Content-Type: application/json" --data '{"email": {"$in":["admin@example.com", "root@example", "ana@example.com", "bob"]}, "password": {"$gt":""}}'
```

<p  align="center"><img  src="images/attack3.png"/></p>

## Secure this app

How could you now mitigate this vulnerability? After your code modification, an attacker should not be able to:

* Run NoSQL queries in the database.

## PR Solutions

[Spoiler alert] To understand how this vulnerability can be mitigated, check [these pull requests](https://github.com/globocom/secDevLabs/pulls?utf8=%E2%9C%93&q=is%3Apr+label%3A%22mitigation+solution+%F0%9F%94%92%22+label%3A%22Mongection%22)!

## Contributing

We encourage you to contribute to SecDevLabs! Please check out the [Contributing to SecDevLabs](../../../docs/CONTRIBUTING.md) section for guidelines on how to proceed! 🎉

[Docker Install]:  https://docs.docker.com/install/
[Docker Compose Install]: https://docs.docker.com/compose/install/
[App]: http://localhost:10001