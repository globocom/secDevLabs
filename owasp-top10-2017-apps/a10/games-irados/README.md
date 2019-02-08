# GamesIRADOS
> This is a simple Python  web application that contains an example of an Insufficient Logging & Monitoring vulnerability.

<img src="images/gamesirados-banner.png" align="center"/>

## What is Insufficient Logging & Monitoring?

Definition from [OWASP](https://www.owasp.org/index.php/Top_10-2017_A10-Insufficient_Logging%26Monitoring):

Insufficient logging and monitoring, coupled with missing or ineffective integration with incident response, allows attackers to further attack systems, maintain persistence, pivot to more systems, and tamper, extract, or destroy data. Most breach studies show time to detect a breach is over 200 days, typically detected by external parties rather than internal processes or monitoring.

## Requirements

To build this lab you will need [Docker][Docker Install] and [Docker Compose][Docker Compose Install].

## Deploy and Run

After cloning this repository, you can type the following command to install the vulnerable application:

```sh
make install
```

Finally run the app and visit [localhost:3001][App] !

## Attack Narrative

To understand how this vulnerability can be exploited, check [this section](docs/ATTACK.md)!

## Mitigating the vulnerability

(Spoiler alert 🧐) To understand how this vulnerability can be mitigated, check [this other section](https://github.com/globocom/secDevLabs/pulls?q=is%3Apr+label%3AA10-OWASP-2017+label%3A%22mitigation+solution+%F0%9F%94%92%22)!

## Contributing

Yes, please. :zap:

[Docker Install]:  https://docs.docker.com/install/
[Docker Compose Install]: https://docs.docker.com/compose/install/
[App]: http://127.0.0.1:3001
