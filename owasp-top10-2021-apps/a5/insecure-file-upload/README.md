<!-- This is a README Template for secDevLabs apps -->

# INSECURE FILE UPLOAD

<p align="center">
    <img src="https://github.com/Edmar-Sousa/secDevLabs/blob/feature/lab-upload-files/owasp-top10-2021-apps/a5/insecure-file-upload/images/img1.png"/>
</p>

Insecure File Upload is a web laboratory written in PHP, with weak file upload validations.
A simple app that uploads files to the server’s public folder and displays a list of saved
files that can be viewed.

This laboratory aims to demonstrate code execution on the server, a security flaw that
falls under A5 — Security Misconfiguration and A3 — Injection in the OWASP classification.

## Index

- [Definition](#definition)
- [Setup](#setup)
- [Attack narrative](#attack-narrative)
- [Objectives](#secure-this-app)
- [Solutions](#pr-solutions)
- [Contributing](#contributing)

## <a name="definition"></a> What is Unrestricted File Upload?

Unrestricted File Upload is a class of vulnerability that occurs when a web application accepts
and stores files from users without performing adequate validation, sanitization, or safe handling.
When file uploads are not properly checked (for type, content, name, storage location, and execution
permissions), an attacker can upload a crafted file that the server later interprets or executes —
for example, a PHP file disguised as an image. This can lead to remote code execution (RCE), local
file inclusion, information disclosure, or other severe compromises.

## Setup

To start this intentionally **insecure application**, you will need [Docker][docker install] and [Docker Compose][docker compose install]. After forking [secDevLabs](https://github.com/globocom/secDevLabs), you must type the following commands to start:

```sh
cd secDevLabs/owasp-top10-2021-apps/a5/insecure-file-upload
```

```sh
make install
```

Then simply visit [http://localhost:8080][app]

## Get to know the app :camera_flash:

To properly understand how this application works, you can follow these simple steps:

- Access the URL in your browser
- Click the Select Image button
- Choose a PNG image
- Click the Upload button
- Then the file list will update, and you can view the image by clicking the link icon

## Attack narrative

Now that you know the purpose of this app, what could possibly go wrong? The following section
describes how an attacker could identify and eventually find sensitive information about the app
or it's users. We encourage you to follow these steps and try to reproduce them on your own to
better understand the attack vector! 😜

### 👀

Upon accessing the page the attacker will see the following interface. They will then try to find a way to break the application.
A common flaw in applications is the lack of proper validation of user-submitted data. This allows an attacker to take advantage of it.

<p align="center">
    <img src="https://github.com/Edmar-Sousa/secDevLabs/blob/feature/lab-upload-files/owasp-top10-2021-apps/a5/insecure-file-upload/images/img1.png"/>
</p>

### 🔥

The attacker then decides to see how the application works and, meanwhile, will try to think of a security
vulnerability during the process. When they select an image and click **Upload**, the file list will refresh
with the new file, as shown in the image below.

<p align="center">
    <img src="https://github.com/Edmar-Sousa/secDevLabs/blob/feature/lab-upload-files/owasp-top10-2021-apps/a5/insecure-file-upload/images/img2.png"/>
</p>

Ok! Everything went well. In the file listing, when inspecting the page source code, the attacker notices that the image keeps its original name and was saved in the `/uploads` folder on the server.

<p align="center">
    <img src="https://github.com/Edmar-Sousa/secDevLabs/blob/feature/lab-upload-files/owasp-top10-2021-apps/a5/insecure-file-upload/images/img3.png"/>
</p>

Ok! At this point the attacker gets an idea: "what if I upload a file named `hello.png.php`?"

```sh
# hello.png.php
<?php
echo phpinfo();
```

Great! The file named `hello.png.php` passed the server's validation! When accessing the
link that was generated to view the image, the file's code was executed!

<p align="center">
    <img src="https://github.com/Edmar-Sousa/secDevLabs/blob/feature/lab-upload-files/owasp-top10-2021-apps/a5/insecure-file-upload/images/img4.png"/>
</p>

## Secure this app

How would you migitate this vulnerability? After your changes, an attacker should not be able to:

- Upload a file with an extension other than an image
- You will not be able to execute the code by accessing `/uploads/<filename>`

## PR solutions

- Issue still unresolved

<!-- [Spoiler alert 🚨 ] To understand how this vulnerability can be mitigated, check out [these pull requests]! -->

## Contributing

We encourage you to contribute to SecDevLabs! Please check out the [Contributing to SecDevLabs](../../../docs/CONTRIBUTING.md)
section for guidelines on how to proceed! 🎉

[secDevLabs]: https://github.com/globocom/secDevLabs
[ExploitDB]: https://www.exploit-db.com/
