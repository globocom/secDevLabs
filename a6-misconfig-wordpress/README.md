# Vulnerable Wordpress Misconfig
> This is a simple Wordpress web application that contains an example of a Security Misconfiguration vulnerability.

<!-- <img src="images/example-wordpress.png" align="center"/> -->

## What is Security Misconfiguration?

Definition from [OWASP](https://www.owasp.org/index.php/Top_10-2017_A6-Security_Misconfiguration):

Security misconfiguration can happen at any level of an application stack, including the network services, platform, web server, application server, database, frameworks, custom code, and pre-installed virtual machines, containers, or storage. Automated scanners are useful for detecting misconfigurations, use of default accounts or configurations, unnecessary services, legacy options, etc.

## Requirements

To build this lab you will need [Docker][Docker Install] and [Docker Compose][Docker Compose Install].

## Deploy and Run

After cloning this repository, you can type the following command to start the vulnerable application:

```sh
make install
```

Then simply visit [localhost:8000][App] !

## Attack Narrative

(SPOILER) To understand how this vulnerability can be exploited, check this section!

## Mitigating the vulnerability

(SPOILER) To understand how this vulnerability can be mitigated, check this other section!

[Docker Install]:  https://docs.docker.com/install/
[Docker Compose Install]: https://docs.docker.com/compose/install/
[App]: http://127.0.0.1:8000

## Contributing

Yes, please. :zap:
