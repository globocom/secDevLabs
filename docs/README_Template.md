<!-- This is a README Template for secDevLabs apps -->
# Your app's name here!

> All comments on how to write a README are displayed between ( ), and should not be in the app's final version

( Be sure to add a banner image of your app here! )
<p align="center">
    <img src="https://raw.githubusercontent.com/globocom/secDevLabs/master/owasp-top10-2017-apps/a2/saidajaula-monster/images/img1.png"/>
</p>

( Here's a short description of your app! )

## Index

( Remember to fix these links when everything is done! )
- [Definition](#what-is-the-vulnerability-?)
- [Setup](#setup)
- [Attack narrative](#attack-narrative)
- [Objectives](#secure-this-app)
- [Solutions](#pr-solutions)
- [Contributing](#contributing)


## What is ( vulnerability being explored in this app )?

( OWASP vulnerability definition here )

The main goal of this app is to discuss how **( vulnerability being explored in this app )** vulnerabilities can be exploited and to encourage developers to send secDevLabs Pull Requests on how they would mitigate these flaws.

## Setup

( What do you need to do to get it up and running? Remember to add all the commands used as well! )

## Get to know the app ( Cool emoji describing the app - Get creative! 😝 )

To properly understand how this application works, you can follow these simple steps:

( Add steps for an user to follow and get to know your app )

## Attack narrative

Now that you know the purpose of this app, what could possibly go wrong? The following section describes how an attacker could identify and eventually find sensitive information about the app or it's users. We encourage you to follow these steps and try to reproduce them on your own to better understand the attack vector! 😜

### 👀

#### ( Brief description of what was exploited/is vulnerable )

This first part, 👀 , is dedicated to describing all the steps needed to identify the vulnerability installed on your app so that anyone following this guide is able to replicate it.

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
    <img src="https://raw.githubusercontent.com/globocom/secDevLabs/master/owasp-top10-2017-apps/a2/saidajaula-monster/images/attack1.png"/>
</p>

Started the analysis on how the app handles cookies:

<p align="center">
    <img src="https://raw.githubusercontent.com/globocom/secDevLabs/master/owasp-top10-2017-apps/a2/saidajaula-monster/images/attack3.png"/>
</p>

Confirmed the suspicion by having a look at the code!

<p align="center">
    <img src="https://raw.githubusercontent.com/globocom/secDevLabs/master/owasp-top10-2017-apps/a2/saidajaula-monster/images/attack4.png"/>
</p>

Add as many images as you can! A picture is worth more than a thousand words!

### 🔥

This second part, 🔥 , is dedicated to describing all the steps needed to exploit the vulnerability found previously.

In this section, your goal should be on how to exploit the app and it's steps. A good guideline to follow is:
* Include all the steps to reproduce the exploit.
* If you used the command line, be sure to add the command here!
* It would be great if you added references to your narrative, such as used tools, exploits (preferably from [ExploitDB]) , a RFC, or any other text.

And as always, images!!! 😃

Some good examples of images are as follows:

Creating a payload:

<p align="center">
    <img src="https://raw.githubusercontent.com/globocom/secDevLabs/master/owasp-top10-2017-apps/a2/saidajaula-monster/images/attack7.png"/>
</p>

Delivering a payload, and results!

<p align="center">
    <img src="https://raw.githubusercontent.com/globocom/secDevLabs/master/owasp-top10-2017-apps/a2/saidajaula-monster/images/attack8.png"/>
</p>

## Secure this app

How would you migitate this vulnerability? After your changes, an attacker should not be able to:

- ( What  needs to be done for you to consider this app's vulnerability to be mitigated? )

## PR solutions

[Spoiler alert 🚨 ] To understand how this vulnerability can be mitigated, check out [these pull requests]!

( We know when creating a new app that there won't, probably, be any solutions yet. Open an issue to remind us to fix this link, please )

## Contributing

We encourage you to contribute to SecDevLabs! Please check out the [Contributing to SecDevLabs](../../../docs/CONTRIBUTING.md) section for guidelines on how to proceed! 🎉

[secDevLabs]: https://github.com/globocom/secDevLabs
[ExploitDB]: https://www.exploit-db.com/
