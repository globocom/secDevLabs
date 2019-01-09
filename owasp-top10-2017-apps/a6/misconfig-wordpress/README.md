# Vulnerable Wordpress Misconfig
> This is a simple Wordpress web application that contains an example of a Security Misconfiguration vulnerability.

<!-- <img src="images/example-wordpress.png" align="center"/> -->

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

To understand how this vulnerability can be exploited, check this section!

## Mitigating the vulnerability

To understand how this vulnerability can be mitigated, check this other section!

[Docker Install]:  https://docs.docker.com/install/
[Docker Compose Install]: https://docs.docker.com/compose/install/
[App]: http://127.0.0.1:8000

## Contributing

Yes, please. :zap:
