# Insecure Go Project
 > This is a simple Golang API that contains an example of a Broken Authentication vulnerability.

<img src="docs/attack-1.png" align="center"/>

## What is Broken Authentication?

Definition from [OWASP](https://www.owasp.org/images/7/72/OWASP_Top_10-2017_%28en%29.pdf.pdf):

Application functions related to authentication and session management are often implemented
incorrectly, allowing attackers to compromise passwords, keys, or session tokens, or to exploit
other implementation flaws to assume other users’ identities temporarily or permanently.

## Requirements

To build this lab you will need [Docker][Docker Install] and [Docker Compose][Docker Compose Install].

## Deploy and Run

After cloning this repository, you can type the following command to start the vulnerable application:

```sh
$ make install
```

Then simply check `/healthcheck` route:

```sh
$ curl localhost:9999/healthcheck
WORKING!
```

## Attack Narrative

To understand how this vulnerability can be exploited, check [this section]!

## Mitigating the vulnerability

(Spoiler alert 🧐) To understand how this vulnerability can be mitigated, check [this other section](https://github.com/globocom/secDevLabs/pulls?q=is%3Apr+label%3A%22mitigation+solution+%F0%9F%94%92%22+label%3A%22Insecure+Go+project%22)!

## Contributing

Yes, please. :zap:

[Docker Install]:  https://docs.docker.com/install/
[Docker Compose Install]: https://docs.docker.com/compose/install/
[this section]: https://github.com/globocom/secDevLabs/blob/master/owasp-top10-2017-apps/a2/insecure-go-project/docs/ATTACK.md
