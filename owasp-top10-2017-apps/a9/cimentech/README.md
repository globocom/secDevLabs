# Cimentech
 > This is a simple web application built with Drupal that contains an example of a component with a known vulnerabilty.

<p align="center">
 <img width="560" height="" src="docs/attack1.png">
</p>

## What does it mean to use a component with known vulnerabilities?

Definition from [OWASP](https://www.owasp.org/images/7/72/OWASP_Top_10-2017_%28en%29.pdf.pdf):

Components, such as libraries, frameworks, and other software modules, run with the same privileges as the application. If a vulnerable component is exploited, such an attack can facilitate serious data loss or server takeover. Applications and APIs using components with known vulnerabilities may undermine application defenses and enable various attacks and impacts.

## Requirements

To build this lab you will need [Docker][Docker Install] and [Docker Compose][Docker Compose Install].

## Deploy and Run

After cloning this repository, you can type the following command to start the vulnerable application:

```sh
make install
```

Then simply visit [localhost:80][App] !

## Attack Narrative

To understand how this vulnerability can be exploited, check [this section]!

## Mitigating the vulnerability

To understand how this vulnerability can be mitigated, check this other section!

## Contributing

Yes, please. :zap:

[Docker Install]:  https://docs.docker.com/install/
[Docker Compose Install]: https://docs.docker.com/compose/install/
[App]: http://127.0.0.1:80/
[this section]: docs/ATTACK.md
