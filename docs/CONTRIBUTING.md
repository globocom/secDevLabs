# Contribution Guidelines

Thanks for taking the time to contribute!

The following is a set of guidelines for contributing to SecDevLabs. These are just guidelines, not rules, so use your best judgement and feel free to propose changes to this document in a pull request! 😃

## So... I built this app, it looks great, but how can I send it to SecDevLabs?

Well, a good place to start is to make sure you can deploy your app with Docker-Compose. All the apps in SecDevLabs are built with it in order to ensure you can get get right into the action! ✓

So your app can be deployed with Docker-Compose, nice job! But wait, does it have a Makefile? If it doesn't, be sure to have a look [here][1], we have a template you can follow or you can create your own! ✓

## Ok, my app is looking awesome and all set up with Docker-Compose, what else do I need to send it?

It would be awesome if you could follow this basic suggested skeleton for your app, as all others conform to this template:

```bash
├── owasp-top10-2017-apps
│   ├── a#
        ├── MY-APP
            ├── app
                ├── myApp.go
            ├── deployments
                ├── Dockerfile
                ├── check-init.sh
                ├── docker-compose.yml
            ├── images
                ├── image1.jpg
                ├── image2.jpg
            ├── .gitignore
            ├── Makefile
            ├── README.md
├── docs
├── images
├── LICENSE.md
├── README.md
└── .gitignore
```

Do you have a README file? If you don't, have a look at our [README template][3]!

Be sure to add some pictures! A picture is worth a thousand words! 👍

## I've found an error on one of the apps!

Please let us know! Send a Pull Request with the `bug 🕷 ` label or create an Issue! We have a [PR][4] and [issue][5] template to help you!

[1]:/docs/Makefile
[3]:/docs/README_Template.md
[4]:/docs/PR_Template.md
[5]:/docs/Issue_Template.md
