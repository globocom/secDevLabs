# Attack Narrative - The Template
The main goal of this document is to describe how a malicious user could exploit a %NAME_OF_THE_OWASP_TOP_10_VULN% vulnerability, intentionally installed on `your app's name` from secDevLabs, to `add here the vulnerability`.

If you don't know [secDevLabs] or this `intended vulnerable web application` (be sure to leave a link here!) yet, you should check them before reading this narrative.

---
## 👀

This first part, 👀, is dedicated to describing all the steps needed to identify the vulnerability installed on your app so that anyone following ATTACK.md is able to replicate it.

Usually, some nice steps to include are:
* What's the app main page?
* How can you access it?
* How did you discover the vulnerability?
* If you used the command line, be sure to include the command used! You can include the command by doing this:

```sh
    ```sh
    $ My awesome command here

    ```
```

A nice example of images to have on an attack narrative in the discovery section is:

First time acessing the app:

<p align="center">
    <img src="https://raw.githubusercontent.com/globocom/secDevLabs/master/owasp-top10-2017-apps/a2/saidajaula-monster/images/img1.png"/>
</p>

Found an interesting page:

<p align="center">
    <img src="https://raw.githubusercontent.com/globocom/secDevLabs/master/owasp-top10-2017-apps/a2/saidajaula-monster/docs/attack1.png"/>
</p>

Started the analysis on how the app handles cookies:

<p align="center">
    <img src="https://raw.githubusercontent.com/globocom/secDevLabs/master/owasp-top10-2017-apps/a2/saidajaula-monster/docs/attack3.png"/>
</p>

Confirmed the suspicion by having a look at the code!

<p align="center">
    <img src="https://raw.githubusercontent.com/globocom/secDevLabs/master/owasp-top10-2017-apps/a2/saidajaula-monster/docs/attack4.png"/>
</p>

Add as many images as you can! A picture is worth more than a thousand words!

## 🔥

This second part, 🔥, is dedicated to describing all the steps needed to exploit the vulnerability found previously.

In this section, your goal should be on how to exploit the app and it's steps. A good guideline to follow is:
* Include all the steps to reproduce the exploit.
* If you used the command line, be sure to add the command here!
* It would be great if you added references to your narrative, such as used tools, exploits (preferably from [ExploitDB]) , a RFC, or any other text.

And as always, images!!! 😃

Some good examples of images are as follows:

Creating a payload:

<p align="center">
    <img src="https://raw.githubusercontent.com/globocom/secDevLabs/master/owasp-top10-2017-apps/a1/copy-n-paste/docs/attack-0.png"/>
</p>

Delivering a payload, and results!

<p align="center">
    <img src="https://raw.githubusercontent.com/globocom/secDevLabs/master/owasp-top10-2017-apps/a2/saidajaula-monster/docs/attack8.png"/>
</p>


[secDevLabs]: https://github.com/globocom/secDevLabs
[ExploitDB]: https://www.exploit-db.com/
