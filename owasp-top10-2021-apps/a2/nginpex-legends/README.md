<!-- This is a README Template for secDevLabs apps -->
# Nginpex Legends

<p align="center">
    <img src="https://raw.githubusercontent.com/chinchila/secDevLabs/lab-smuggling/owasp-top10-2021-apps/a6/golden-hat/images/img1.png"/>
</p>

This app is about a new game that has came out this year! On the website page you can download the game updates but only administrators can upload a new patch.

## Index

- [Definition](#definition)
- [Setup](#setup)
- [Attack narrative](#attack-narrative)
- [Objectives](#secure-this-app)
- [Solutions](#pr-solutions)
- [Contributing](#contributing)


## <a name="definition"></a> What does it mean to have Cryptographic Failures?

Previously known as #2 Sensitive Data Exposure, in owasp top 10 2021 its up to #2. This class of vulnerability is pretty wide and often developers don't really mind about it.

The first thing we learn about cryptography is that we can't make schemes. The second is that it is very likely to us be using the cryptographic scheme wrong. The third is that even using libs that deal with the primitives, we are using the wrong parameters. The main point of this vulnerability is to use wrong cryptographic schemes leading to sensitive data exposure or system compromise most of the time.

The main goal of this app is to discuss how using wrong cryptographic schemes can be exploited and to encourage developers to send secDevLabs Pull Requests on how they would mitigate these flaws.

## Setup

To run the app:

```
cd secDevLabs/owasp-top10-2021-apps/a2/nginpex-legends
make install
```

## Get to know the app 🕹️

To properly understand how this application works, you can follow these simple steps:

* Visit the homepage.

## Attack narrative

Now that you know the purpose of this app, what could possibly go wrong? The following section describes how an attacker could identify and eventually find sensitive information about the app or it's users. We encourage you to follow these steps and try to reproduce them on your own to better understand the attack vector! 😜

### 👀

#### Use of vulnerable mitmproxy version allows HTTP desync attacks

First time acessing the app on port 10006:

<p align="center">
    <img src="https://raw.githubusercontent.com/chinchila/secDevLabs/lab-smuggling/owasp-top10-2021-apps/a6/golden-hat/images/img1.png"/>
</p>

Once we try reaching the `/golden.secret` we can see interesting headers:

<p align="center">
    <img src="https://raw.githubusercontent.com/chinchila/secDevLabs/lab-smuggling/owasp-top10-2021-apps/a6/golden-hat/images/attack1.png"/>
</p>

As we can see this `Via: mitmproxy/5.3.0` helps us with the recon. Now that we know what is running on the server we can search for CVEs on this version of mitmproxy. Once we found the CVE-2021-39214, we can make an exploit to this vulnerability.

Let's take a look on the mitmproxy source code, [TAG 5.3.0](https://github.com/mitmproxy/mitmproxy/tree/v5.3.0) at file [/mitmproxy/net/http/http1/read.py:L209](https://github.com/mitmproxy/mitmproxy/blob/a738b335a36b58f2b30741d76d9fe41866309299/mitmproxy/net/http/http1/read.py#L209):

```python
if "chunked" in headers.get("transfer-encoding", "").lower():
    return None
```

As we can see this piece of code is responsible for the vulnerability. Now that we know that the proxy proccess any request as chunked that contains the chunked keyword, we can craft an request that the proxy will understand as `Transfer-Encoding` chunked and the gunicorn backend will understand as `Content-Length`.

```
GET /w HTTP/1.1
Host: 127.0.0.1:10006
Transfer-Encoding: chunkedasd
Content-Length: 4

35
GET /golden.secret HTTP/1.1
Host: 127.0.0.1:8000


0

GET / HTTP/1.1
Host: 127.0.0.1:10006


```

The first request forces a 404 error. The frontend(proxy) will parse the request as a normal request with body until the 0. The backend will process the first request until 35 and then will parse the request to `/golden.secret` poisoning the next socket. Then we just put a new alignment request at the end to poison a socket that we control.

After running this payload as a request we can see the secret page:


<p align="center">
    <img src="https://raw.githubusercontent.com/chinchila/secDevLabs/lab-smuggling/owasp-top10-2021-apps/a6/golden-hat/images/attack2.png"/>
</p>

This vulnerability is interesting because you can poison other clients requests and smug them to do what you want!

## Secure this app

How would you migitate this vulnerability? After your changes, an attacker should not be able to:

- Bypass proxy rules.

## PR solutions

[Spoiler alert 🚨 ] To understand how this vulnerability can be mitigated, check out [these pull requests]!

## Contributing

We encourage you to contribute to SecDevLabs! Please check out the [Contributing to SecDevLabs](../../../docs/CONTRIBUTING.md) section for guidelines on how to proceed! 🎉

[secDevLabs]: https://github.com/globocom/secDevLabs