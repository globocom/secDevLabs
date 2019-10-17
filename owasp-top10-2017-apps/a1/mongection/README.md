
# Mongection

<p align="center"><img  src="images/a1-banner.png"/></p>

Mongection is a simple Nodejs web application that contains an example of a Injection vulnerability. On this example, a specific subcategory os Injection will be showed: NoSQL Injection with MongoDB.

## Index

- [Definition](#what-is-nosql-injection)
- [Setup](#setup)
- [How Works](#how-works)
- [The Application](#the-application)

## What is NoSQL Injection?



## Setup

To execute this application, you need of 2 tools on your machine:
1. Docker
2. docker-compose

And to up the application, simply run these commands:

```sh

cd secDevLabs/owasp-top10-2017-apps/a1/mongection

```

```sh

make install

```

Then simply visit http://localhost:9995😆

## How Works

The application simulate a simple Register/Login page. When you can register a account and when you do a successful login, you email will be showed on page.

## The Application

Accessing the application (http://localhost:9995), the homepage have 2 buttons: 1 to do Login (http://localhost:9995/login.html) and 1 to Register a new account (http://localhost:9995/register.html).😜

#### Homepage
<p  align="center"><img  src="images/attack0.png"/></p>

#### Login Page
<p  align="center"><img  src="images/attack1.png"/></p>

#### Register Page
<p  align="center"><img  src="images/attack2.png"/></p>


When you create a account, you will see a message containing Hello and your email. This occurs too when you do a successful login.

#### Register Message
<p  align="center"><img  src="images/attack3.png"/></p>

#### Login Message
<p  align="center"><img  src="images/attack4.png"/></p>

## Exploiting

So, to exploit this application, you must to send a NoSQL query on email and password fields, such as: {"$ne":""}. This query tells to MongoDB that must return all results that are different of " " (null, empty).

You can do this via curl and only can be exploited with this tool, simply make a request containing the NoSQL query on email and passwords fields to login endpoint:

```sh
curl -X 'POST' 'http://localhost:9995/login' -H "Content-Type: application/json" --data '{"email": {"$ne":""}, "password": {"$ne":""}}'
```

The application will return the first user that MongoDB find, and you'll see a message containing "Hello user".

#### Successful Login via curl
<p  align="center"><img  src="images/attack5.png"/></p>

#### Unsuccessful Login via curl
<p  align="center"><img  src="images/attack6.png"/></p>

#### NoSQL Injection via curl
<p  align="center"><img  src="images/attack7.png"/></p>