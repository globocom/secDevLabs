# Comment-killer

Comment-killer is a simple JS app that contains an example of multiple Cross-Site Scripting vulnerabilities and its main goal is to describe how a malicious user could exploit them on this purposefully vulnerable app.

## What is Cross-Site Scripting?

XSS flaws occur whenever an application includes untrusted data in a new web page without proper validation or escaping, or updates an existing web page with user-supplied data using a browser API that can create HTML or JavaScript. XSS allows attackers to execute scripts in the victim’s browser which can hijack user sessions, deface web sites, or redirect the user to malicious sites.

The main goal of this app is to discuss how **Cross-Site Scripting** vulnerabilities can be exploited and to encourage developers to send secDevLabs Pull Requests on how they would mitigate these flaws. Learn more <a href="https://owasp.org/www-community/attacks/xss/">here</a>.

## Setup

To start this intentionally **insecure application**, you will need [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/). After forking [secDevLabs](https://github.com/globocom/secDevLabs), you must type the following commands to start:

`sh cd secDevLabs/owasp-top10-2017-apps/a7/comment-killer `

`sh make install `

Then simply visit [http://localhost:3000/](http://localhost:3000/) ! 😆

## Get to know the app 👾

To properly understand how this application works, you can follow these simple steps:

-   Read all blog posts.
-   Comment in a post.

If you want to reset the app then reload the page.

## Attack narrative

So now you have the app up and running - congrats! This section will show how a hackers can use XSS and attack anybody who visits this webpage.

## Secure this app

How would you mitigate this vulnerability? After your changes, an attacker should not be able to:

-   Execute scripts through input fields

## PR solutions

[Spoiler alert 🚨] To understand how this vulnerability can be mitigated, check out [these pull requests](https://github.com/globocom/secDevLabs/pulls?q=is%3Apr+label%3A%22mitigation+solution+%F0%9F%94%92%22+label%3AComment-Killer)!

## Contributing

We encourage you to contribute to SecDevLabs! Please check out the [Contributing to SecDevLabs](../../../docs/CONTRIBUTING.md) section for guidelines on how to proceed! 🎉

[docker install]: https://docs.docker.com/install/
[docker compose install]: https://docs.docker.com/compose/install/
[app]: http://localhost:10007
