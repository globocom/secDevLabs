# Games Irados

<p align="center">
    <img src="images/gamesirados-banner.png"/>
</p>

Games Irados is a simple Python web application that contains an example of a Security Logging and Monitoring Failure vulnerability and, its main goal is to demonstrate how important it is to properly log all requests made to the application and how easily malicious requests could go unnoticed.

## Index

- [Definition](#what-is-security-logging-&-monitoring-failure)
- [Setup](#setup)
- [Attack narrative](#attack-narrative)
- [Objectives](#secure-this-app)
- [Solutions](#pr-solutions)
- [Contributing](#contributing)

## What is Security Logging and Monitoring Failure?

Security Logging and Monitoring failure, coupled with missing or ineffective integration with incident response, allows attackers to further attack systems, maintain persistence, pivot to more systems, and tamper, extract, or destroy data. Most breach studies show time to detect a breach is over 200 days, typically detected by external parties rather than internal processes or monitoring.

The main goal of this app is to discuss how **Security Logging and Monitoring Failure** can be exploited and to encourage developers to send secDevLabs Pull Requests on how they would mitigate these flaws.

## Setup

To start this intentionally **insecure application**, you will need [Docker][docker install] and [Docker Compose][docker compose install]. After forking [secDevLabs][secDevLabs], you must type the following commands to start:

```sh
cd secDevLabs/owasp-top10-2021-apps/a9/games-irados
```

```sh
make install
```

Then simply visit [localhost:10010][app] ! 😆

## Get to know the app 🎮

To properly understand how this application works, you can follow these simple steps:

- Create a new user!
- Check out all the games offered!
- Try redeeming a game coupon after login in!

## Attack narrative

Now that you know the purpose of this app, what could go wrong? The following section describes how an attacker could identify and eventually find sensitive information about the app or its users. We encourage you to follow these steps and try to reproduce them on your own to better understand the attack vector! 😜

### 👀

#### Poor application log might mask malicious requests made to the server

To verify how an application handles events that are considered malicious, two attacks will be done to test it:

- Brute forcing the login screen
- Brute forcing the coupon validation screen

Initially, we begin the first attack by sending an intentionally wrong login attempt, as shown by the image below:

<p align="center">
    <img src="images/attack1.png"/>
</p>

## 🔥

After that, an attacker could use [Burp Suite] as a proxy to send as many requests as needed until a valid password is found (if you need any help setting up your proxy, you should check this [guide][guide]). To do so, after finding the login POST request, right click and send to `Intruder`, as shown below:

<p align="center">
    <img src="images/attack9.png"/>
</p>

In the Positions tab, all fields must be cleared first via the `Clear §` button. To set `password` to change according to each password from our dictionary wordlist, simply click on `Add §` button after selecting it:

<p align="center">
    <img src="images/attack2.png"/>
</p>

If a valid password is found, the application may process new cookies and eventually redirect the flow to other pages. To guarantee that the brute force attack follows this behavior, set `Always` into `Follow Redirections` options in the `Options` tab, as shown below:

<p align="center">
    <img src="images/attack10.png"/>
</p>

You can use the following wordlist (`poc.txt`) just for POC purposes:

```
admin
password
123
qweasd
1qaz
123456789
flamengo
zxc
asd123qwe
YOURVALIDPASSWORD
```

Before executing the attack, you can open a new tab in your terminal and type the following command to observe how the malicious requests will come to the app:

```sh
docker logs app-a10 -f
```

In the `Payloads` tab, simply choose the wordlist from `Load...` option and then the attack may be performed via the `Start attack` button.

<p align="center">
    <img src="images/attack11.png"/>
</p>

As we can see from the results of the requests, the application handles successful and unsuccessful requests differently by responding to different status codes. As shown below, when the payload is correct the application responds a status code `302 FOUND`, otherwise it responds with a `200 OK`.

<p align="center">
    <img src="images/attack3.png"/>
</p>

By having a look at the application on the server side, it's possible to see that the logs provide little information regarding the attack, as shown below:

<p align="center">
    <img src="images/attack4.png"/>
</p>

Furthermore, if we try the `/coupon` route, instead of the `/login`, we can see similar results. The coupon page is shown below:

<p align="center">
    <img src="images/attack5.png"/>
</p>

Using Burp Suite again, we could send multiple requests to the application to simulate the second brute force attack, changing only the `coupon` field:

<p align="center">
    <img src="images/attack6.png"/>
</p>

If you need to generate a simple number wordlist, you can use the following command:

```sh
seq 100 200 > coupons.txt
```

As we can see from the image below, the requests seem to have been handled properly by the server.

<p align="center">
    <img src="images/attack7.png"/>
</p>

However, we can also confirm that little information is being logged at the server side, as shown by the image below:

<p align="center">
    <img src="images/attack8.png"/>
</p>

## Secure this app

How would you mitigate this vulnerability? After your changes, the new log system must give us:

- Who did the request
- What happened
- When did it happen
- Where did it happen

## PR solutions

[Spoiler alert 🚨] To understand how this vulnerability can be mitigated, check out [these pull requests](https://github.com/globocom/secDevLabs/pulls?q=is%3Apr+label%3A%22mitigation+solution+%F0%9F%94%92%22+label%3AGamesIrados.com)!

## Contributing

We encourage you to contribute to SecDevLabs! Please check out the [Contributing to SecDevLabs](../../../docs/CONTRIBUTING.md) section for guidelines on how to proceed! 🎉

[docker install]: https://docs.docker.com/install/
[docker compose install]: https://docs.docker.com/compose/install/
[secDevLabs]: https://github.com/globocom/secDevLabs
[app]: http://localhost:10010
[secdevlabs]: https://github.com/globocom/secDevLabs
[2]: https://github.com/globocom/secDevLabs/tree/master/owasp-top10-2021-apps/a9/games-irados
[burp suite]: https://portswigger.net/burp
[guide]: https://support.portswigger.net/customer/portal/articles/1783066-configuring-firefox-to-work-with-burp

