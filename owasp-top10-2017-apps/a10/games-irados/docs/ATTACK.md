# Attack Narrative - GamesIRADOS
The main goal of this document is to describe how important it is to properly log all requests made to the application and how easily malicious requests could go unnoticed.

If you don't know [secDevLabs] or this [intended vulnerable web application][2] yet, you should check them out before reading this narrative.

---
## 👀

With the goal of verifying how an application handles events that are considered malicious, two attacks will be done to test it:
* Brute forcing the login screen
* Brute forcing the coupon validation screen

Initially, we begin the first attack by sending an intentionally wrong login attempt, as shown by the image below:

<p align="center">
    <img src="attack1.png"/>
</p>

## 🔥

Now, using [Burp Suite] as a proxy, we can use it to send as many requests as we want, only changing the content of the `password` field at every request, as depicted by the images below:

<p align="center">
    <img src="attack2.png"/>
</p>

As we can see from the results of the requests, the application handles successfull and unsuccessfull requests differently by responding different status codes. As shown below, when the payload is correct the application responds a status code `302 FOUND`, otherwise it responds with a `202 OK`.

<p align="center">
    <img src="attack3.png"/>
</p>

By having a look at the application on the server side, it's possible to see that the logs provide little information regarding the attack, as shown below:

<p align="center">
    <img src="attack4.png"/>
</p>

Further more, if we try the `/coupon` route, instead of the `/login`, we can see similar results. The coupon page is shown below:

<p align="center">
    <img src="attack5.png"/>
</p>

Using Burp Suite again, we could send multiple requests to the application to simulate the second brute force attack, changing only `coupon` field:

<p align="center">
    <img src="attack6.png"/>
</p>

As we can see from the image below, the requests seem to have been handled properly by the server.

<p align="center">
    <img src="attack7.png"/>
</p>

 We can confirm that by having another look at the server side, as shown by the image below:

<p align="center">
    <img src="attack8.png"/>
</p>

[secDevLabs]: https://github.com/globocom/secDevLabs
[2]:https://github.com/globocom/secDevLabs/tree/master/owasp-top10-2017-apps/a10/games-irados
[Burp Suite]: https://portswigger.net/burp