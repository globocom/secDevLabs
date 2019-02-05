# CopyNPaste API
> This is a simple Golang API that contains an example of an Injection vulnerability.

<img src="images/CopyNPaste.png" align="center"/>

## What is Injection?

Definition from [OWASP](https://www.owasp.org/images/7/72/OWASP_Top_10-2017_%28en%29.pdf.pdf):

Injection flaws, such as SQL, NoSQL, OS, and LDAP injection, occur when untrusted data is sent to an interpreter as part of a command or query. The attacker’s hostile data can trick the interpreter into executing unintended commands or accessing data without proper authorization.

## Requirements

To build this lab you will need [Docker][Docker Install] and [Docker Compose][Docker Compose Install].

## Deploy and Run

After cloning this repository, you can type the following command to start the vulnerable application:

```sh
$ make install
```

Then simply visit [localhost:3000][App] !

## Attack Narrative

To understand how this vulnerability can be exploited, check [this section](docs/ATTACK.md)!

## Mitigating the vulnerability

(Spoiler alert 🧐) To understand how this vulnerability can be mitigated, check [this other section](https://github.com/globocom/secDevLabs/pulls?q=is%3Apr+label%3AA1-OWASP-2017+label%3A%22mitigation+solution+%F0%9F%94%92%22)!

## Contributing

Yes, please. :zap:

[Docker Install]:  https://docs.docker.com/install/
[Docker Compose Install]: https://docs.docker.com/compose/install/
[App]: http://127.0.0.1:3000
