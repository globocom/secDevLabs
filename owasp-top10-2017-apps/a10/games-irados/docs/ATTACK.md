# Attack Narrative - GamesIRADOS
The main goal of this document is to describe how important it is to properly log all requests made to the application and how easily malicious requests could go unnoticed.

If you don't know [secDevLabs] or this [intended vulnerable web application][2] yet, you should check them out before reading this narrative.

---
## 👀

With the goal of verifying how an application handles events that are considered malicious, two attacks will be done to test it:
* Brute forcing the login screen
* Brute forcing the coupon validation screen

Initially, we begin by performing a wrong login attempt to see what the application does in that case, as shown by the image below:

<p align="center">
    <img src="attack1.png"/>
</p>

## 🔥

Now, using [Burp Suite] as a proxy, we can use it to fire as many requests as we want, only changing the content of the `password` field at every request, as depicted by the images below:

<p align="center">
    <img src="attack2.png"/>
</p>

<p align="center">
    <img src="attack3.png"/>
</p>

By having a look at the application on the server side, it's possible to see how little it logs our attack attempt, as shown below:

<p align="center">
    <img src="attack4.png"/>
</p>

Further more, if we try the `/coupon` route, instead of the `/login`, we can see similar results. The coupon page is shown below:

<p align="center">
    <img src="attack5.png"/>
</p>

Next, the value of the coupon field is selected so it will be changed at every request and then fired at the server.

<p align="center">
    <img src="attack6.png"/>
</p>

<p align="center">
    <img src="attack7.png"/>
</p>

As we can see from the last image, the requests seem to have been accepted by the server. We can confirm that by having another look at the server side, as shown by the image below:

<p align="center">
    <img src="attack8.png"/>
</p>

[secDevLabs]: https://github.com/globocom/secDevLabs
[2]:https://github.com/globocom/secDevLabs/tree/master/owasp-top10-2017-apps/a10/games-irados
[Burp Suite]: https://portswigger.net/burp