# Saidajaula Monster Fit
 > This is a simple web application built with Flask that contains an example of a Broken Authentication vulnerability.

<img src="images/img1.png" align="center"/>

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
make install
```

Then simply visit [localhost:10082][App] !

## Attack Narrative

To understand how this vulnerability can be exploited, check [this section]!

## Mitigating the vulnerability

To understand how this vulnerability can be mitigated, check this section!

[Docker Install]:  https://docs.docker.com/install/
[Docker Compose Install]: https://docs.docker.com/compose/install/
[App]: http://127.0.0.1:10082
[this section]: https://github.com/globocom/secDevLabs/blob/master/owasp-top10-2017-apps/a2/saidajaula-monster/docs/ATTACK.md

## Contributing

Yes, please. :zap:
