# Contribution Guidelines

Thanks for taking the time to contribute!

The following is a set of guidelines for contributing to SecDevLabs. These are just guidelines, not rules, so use your best judgement and feel free to propose changes to this document in a pull request! 😃

## So... I built this app, it looks great, but how can I send it to SecDevLabs?

Well, a good place to start is to make sure you can deploy your app with Docker-Compose. All the apps in SecDevLabs are built with it in order to ensure you can get get right into the action! ✓

So your app can be deployed with Docker-Compose, nice job! But wait, does it have a Makefile? If it doesn't, be sure to have a look [here][1], we have a template you can follow to create your own! ✓

## Ok, my app is looking awesome and all set up with Docker-Compose, what else do I need to send it?

Do you have an attack narrative? Well, if you don't, worry not, we got you! Have a look at this [attack narrative template][2] and you will be able to write your own in no time! ✓

Just be sure to add some pictures! A picture is worth a thousand words! 👍

## I think I know how to solve a vulnerability, but how can I send my solution to SecDevLabs?

Nice! You can send us your mitigation of the vulnerability directly through a Pull Request, using the [review requested 👀][3] label.

We expect your mitigation proposal to have all the changes needed to completely fix the vulnerability and a short explanation on what you are doing. If you're feeling a bit lost, try having a look at [this mitigation solution][4], it might help!

## I've found an error on one of the apps!

Please let us know! Send a Pull Request with the `bug 🕷 ` label!

[1]:/docs/Makefile
[2]:/docs/Attack_Narrative_Template.md
[3]:https://github.com/globocom/secDevLabs/labels/review%20requested%20%F0%9F%91%80
[4]:https://github.com/globocom/secDevLabs/pull/29