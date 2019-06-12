# secDevLabs

<img src="images/secDevLabs-logo.png" align="" height="" />

[![Join the chat at https://gitter.im/secDevLabs/community](https://badges.gitter.im/secDevLabs/community.svg)](https://gitter.im/secDevLabs/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A laboratory for learning secure web development in a practical manner.

## Build your lab

By provisioning local environments via docker-compose, you will learn how the most critical web application security risks are exploited and how these vulnerable codes can be fixed to mitigate them. 👩‍💻

## How do I start?

After forking this repository, you will find multiple intended vulnerable apps based on real-life scenarios in various languages such as Golang, Python and PHP. A good start would be installing the ones you are most familiar with. 💡

Each of them has an `Attack Narrative` section that describes how an attacker would exploit the corresponding vulnerability.  Before reading any code, it may be a good idea following these steps so you can better understand the attack itself. 💉

Now it's time to shield the application up! Imagine that this is your application and you need to fix these flaws! Your mission is writing new codes that mitigate them and sending a new Pull Request to deploy a secure app! 🔐

## How secure is my new code?

After mitigating a vulnerability, you can send a Pull Request to gently ask the secDevLabs community to review your new secure codes. If you're feeling a bit lost, try having a look at [this mitigation solution](https://github.com/globocom/secDevLabs/pull/29), it might help! 🚀

##  OWASP Top 10 (2017) apps:

Disclaimer: You are about to install vulnerable apps in your machine! 🔥

| Vulnerability | Language | Application |
| --- | --- | --- | 
| A1 - Injection | Golang | [CopyNPaste API](owasp-top10-2017-apps/a1/copy-n-paste) |
| A2 - Broken Authentication | Python | [Saidajaula Monster Fit](owasp-top10-2017-apps/a2/saidajaula-monster) |
| A2 - Broken Authentication | Golang | [Insecure go project](owasp-top10-2017-apps/a2/insecure-go-project) |
| A3 - Sensitive Data Exposure | Golang | [SnakePro](owasp-top10-2017-apps/a3/snake-pro)|
| A4 - XML External Entities (XXE) | PHP | [ViniJr Blog](owasp-top10-2017-apps/a4/vinijr-blog) |
| A5 - Broken Access Control | Golang | [Vulnerable Ecommerce API](owasp-top10-2017-apps/a5/ecommerce-api) |
| A6 - Security Misconfiguration | PHP | [Vulnerable Wordpress Misconfig](owasp-top10-2017-apps/a6/misconfig-wordpress) |
| A6 - Security Misconfiguration | NodeJS | [Stegonography](owasp-top10-2017-apps/a6/stegonography) |
| A7 - Cross-Site Scripting (XSS) | Python | [Gossip World](owasp-top10-2017-apps/a7/gossip-world) |
| A8 - Insecure Deserialization | Python | [Amarelo Designs](owasp-top10-2017-apps/a8/amarelo-designs) |
| A9 - Using Components With Known Vulnerabilities | PHP | [Cimentech](owasp-top10-2017-apps/a9/cimentech) |
| A10 - Insufficient Logging & Monitoring | Python | [GamesIrados.com](owasp-top10-2017-apps/a10/games-irados) |

## Contributing
We encourage you to contribute to SecDevLabs! Please check out the [Contributing to SecDevLabs](/docs/CONTRIBUTING.md) section for guidelines on how to proceed! 🎉

## License

This project is licensed under the BSD 3-Clause "New" or "Revised" License - read [LICENSE.md](LICENSE.md) file for details. 📖
