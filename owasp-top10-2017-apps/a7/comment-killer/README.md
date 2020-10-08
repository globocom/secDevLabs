# Comment-killer

<img src="image/img1.png" alt="img1.png"/>

Comment-killer is a simple ReactJS app, which is has Cross-Site Scripting vulnerability and its main goal is to describe how a malicious user could exploit them on this purposefully vulnerable app.

# Index

1. [ Definition ](#Def)
2. [ Setup ](#Set)
3. [ Attack narrative ](#Att)
4. [ Objectives ](#Obj)
5. [ Solutions ](#Sol)
6. [ Contributing ](#Cont)

<a name="Def"></a>

## What is Cross-Site Scripting?

XSS flaws occur whenever an application includes untrusted data in a new web page without proper validation or escaping, or updates an existing web page with user-supplied data using a browser API that can create HTML or JavaScript. XSS allows attackers to execute scripts in the victim’s browser which can hijack user sessions, deface web sites, or redirect the user to malicious sites.

The main goal of this app is to discuss how **Cross-Site Scripting** vulnerabilities can be exploited and to encourage developers to send secDevLabs Pull Requests on how they would mitigate these flaws. Learn more <a href="https://owasp.org/www-community/attacks/xss/">here</a>.

<a name="Set" ></a>

## Setup

To start this intentionally **insecure application**, you will need [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/). After forking [secDevLabs](https://github.com/globocom/secDevLabs), you must type the following commands to start:

```bash
cd secDevLabs/owasp-top10-2017-apps/a7/comment-killer
docker-compose up -d --build
```

Then simply visit [http://localhost:10007/](http://localhost:10007/) ! 😆

In order to stop the app- `docker-compose stop`

## Get to know the app 👾

To properly understand how this application works, you can follow these simple steps:

-   Read all blog posts.
-   Comment in a post.

If you want to reset the app then reload the page.

<a name="Att"></a>

## Attack narrative

Now that you know the purpose of this app, what could go wrong? The following section describes how an attacker could identify and eventually find sensitive information about the app or its users. We encourage you to follow these steps and try to reproduce them on your own to better understand the attack vector! 😜

Note: This attack narrative works best in Mozilla Firefox.

👀

Non-sanitization of user input allows for cross-site scripting

After inspecting the application, it is possible to identify that some entries are not sanitized and can be executed on a web browser. It occurs in search, comment, and post fields. The following images show this behavior when the following text is used as an input on these fields:

Type- `<script>alert(1)</script>` in the comment box and comment it. You will see this-

<img src="image/img2.png" alt="img2.png">

This website has interpreted your comment as a block of code, and stored it in it's server. Hence, whenever the comment section loads on anybody's machine, this block of code will be executed!

<a name="Obj"></a>

## Secure this app

How would you mitigate this vulnerability? After your changes, an attacker should not be able to:

-   Execute scripts through input fields

<a name="Sol"></a>

## PR solutions

[Spoiler alert 🚨] To understand how this vulnerability can be mitigated, check out [these pull requests](https://github.com/globocom/secDevLabs/pulls?q=is%3Apr+label%3A%22mitigation+solution+%F0%9F%94%92%22+label%3AComment-Killer)!

<a name="Cont"></a>

## Contributing

We encourage you to contribute to SecDevLabs! Please check out the [Contributing to SecDevLabs](../../../docs/CONTRIBUTING.md) section for guidelines on how to proceed! 🎉

[docker install]: https://docs.docker.com/install/
[docker compose install]: https://docs.docker.com/compose/install/
[app]: http://localhost:10007
