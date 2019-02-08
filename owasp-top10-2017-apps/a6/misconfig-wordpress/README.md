# Vulnerable Wordpress Misconfig
> This is a simple Wordpress web application that contains an example of a Security Misconfiguration vulnerability.

<p align="center">
    <img src="images/banner.png"/>
</p>

## What is Security Misconfiguration?

Definition from [OWASP](https://www.owasp.org/images/7/72/OWASP_Top_10-2017_%28en%29.pdf.pdf):

Security misconfiguration is the most commonly seen issue. This is commonly a result of insecure default configurations, incomplete or ad hoc configurations, open cloud storage, misconfigured HTTP headers, and verbose error messages containing sensitive information. Not only must all operating systems, frameworks, libraries, and applications be securely configured, but they must be patched and upgraded in a timely fashion.

## Requirements

To build this lab you will need [Docker][Docker Install] and [Docker Compose][Docker Compose Install].

## Deploy and Run

After cloning this repository, you can type the following command to start the vulnerable application:

```sh
make install
```

Then simply visit [localhost:8000][App] !

## Attack Narrative

To understand how this vulnerability can be exploited, check [this section](docs/ATTACK.md)!

## Mitigating the vulnerability

(Spoiler alert 🧐) To understand how this vulnerability can be mitigated, check [this other section](https://github.com/globocom/secDevLabs/pulls?q=is%3Apr+label%3AA6-OWASP-2017+label%3A%22mitigation+solution+%F0%9F%94%92%22)!

## Contributing

Yes, please. :zap:

[Docker Install]:  https://docs.docker.com/install/
[Docker Compose Install]: https://docs.docker.com/compose/install/
[App]: http://127.0.0.1:8000
