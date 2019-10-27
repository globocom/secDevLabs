# CopyNPaste API

<img src="images/cowsay.png" align="center"/>

OnlineCowsay is a Python web application that allows the user to render a cow
saying a phrase. It's backend is based on the cowsay classic package, written
in perl 20 years ago. What could go wrong?

## Index

- [Definition](#what-is-injection)
- [Setup](#setup)
- [Attack narrative](#attack-narrative)
- [Objectives](#secure-this-app)
- [Solutions](#pr-solutions)
- [Contributing](#contributing)

## What is Injection?

Injection flaws, such as SQL, NoSQL, OS, and LDAP injection, occur when untrusted data is sent to an interpreter as part of a command or query. The attacker’s hostile data can trick the interpreter into executing unintended commands or accessing data without proper authorization.

The main goal of this project is to discuss how **Command Injection** vulnerabilities can be exploited and to encourage developers to send Pull Requests to secDevLabs on how they would mitigate these flaws.

## Setup

To start this intentionally **insecure application**, you will need [Docker][Docker Install]. After forking [secDevLabs](https://github.com/globocom/secDevLabs), you must type the following commands to start:

```sh
cd secDevLabs/owasp-top10-2017-apps/a1/cowsay
```

```sh
docker build . -t online_cowsay
```

```sh
docker run -p 5000:5000 online_cowsay
```

Then simply visit [localhost:5000][App], as exemplified below:

<img src="images/cowsay.png" align="center"/>

## Get to know the app 💉

To properly understand how this application works, you can follow these simple steps:

- Try showing some messages
- Its pretty self-explanatory

## Attack narrative

On this web application, we are calling an external binary and passing user
input as an argument. As good attackers, we will try some inputs to see how the
application handles user input.

#### Trying some stuff
Reading [cowsay manpage(1)](https://linux.die.net/man/1/cowsay) we discover
that we can change her eyes through the `-e` option. If we try inputting 
`-e xx i'm dead!` we notice we are probably dealing with a vulnerable system!

#### Taking a look at the implementation

```python
def cowsay(phrase):
    return os.popen("/usr/games/cowsay" + phrase)
```

This is the function with calls the cowsay backend. It has no validation over
the user input. It doesn't use a good interface to call cowsay, just throws a 
string randomly in the shell. This is why we can pass options to cowsay with 
almost no effort.

#### Exploring the flaw
Lets try running some stuff on our server through the webapp:

If we send `| ls` we get this output:

```shell
Dockerfile online_cowsay.py static templates
```

Seems like we have remote shell access. Try inspecting the code with `| cat
online_cowsay.py`. Works like a charm. The only problem is that we have no
interactive access. But what can we do? With unrestricted remote shell access,
you can do almost anything. In this example, we will just break our application
with a simple:


**BEWARE: don't run this if you aren't running on docker!**
```shell
| rm -rf / --no-preserve-root
```
Cowsay machine broke.

## Secure this app

How could you now mitigate this vulnerability? After your code modification, an attacker should not be able to:

* Have remote shell access to your server

## PR solutions

[Spoiler alert] To understand how this vulnerability can be mitigated, check [our pull requests](https://github.com/globocom/secDevLabs/pulls?q=is%3Apr+label%3A%22mitigation+solution+%F0%9F%94%92%22+label%3A%22cowsay%22)!

## Contributing

We encourage you to contribute to SecDevLabs! Please check out the [Contributing to SecDevLabs](../../../docs/CONTRIBUTING.md) section for guidelines on how to proceed! 🎉

[Docker Install]:  https://docs.docker.com/install/
[App]: http://localhost:5000
