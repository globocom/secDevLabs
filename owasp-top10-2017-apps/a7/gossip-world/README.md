# Gossip World
 > This is a simple Flask app that contains an example of a Cross-site Scripting vulnerability.

<img src="images/banner.png" align="center"/>

## What is Cross-site Scripting?

Definition from [OWASP](https://www.owasp.org/images/7/72/OWASP_Top_10-2017_%28en%29.pdf.pdf):

XSS flaws occur whenever an application includes untrusted data in a new web page without proper validation or escaping, or updates an existing web page with user-supplied data using a browser API that can create HTML or JavaScript. XSS allows attackers to execute scripts in the victim’s browser which can hijack user sessions, deface web sites, or redirect the user to malicious sites.

## Requirements

To build this lab you will need [Docker][Docker Install] and [Docker Compose][Docker Compose Install].

## Deploy and Run

After cloning this repository, you can type the following command to start the vulnerable application:

```sh
$ make install
```

Then simply visit [localhost:3001][App] !

## Attack Narrative

To understand how this vulnerability can be exploited, check [this section](docs/ATTACK.md)!

## Mitigating the vulnerability

To understand how this vulnerability can be mitigated, check this other section!

[Docker Install]:  https://docs.docker.com/install/
[Docker Compose Install]: https://docs.docker.com/compose/install/
[App]: http://127.0.0.1:3001
[this]: https://github.com/globocom/secDevLabs/blob/master/owasp-top10-2017-apps/a7/fofocando/docs/ATTACK.md

## Contributing

Yes, please. :zap:
