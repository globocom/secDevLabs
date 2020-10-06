# Comment-killer

Use this app to learn about XSS vulnerability.

# What is XSS?

Cross-site Scripting (XSS) is a client-side code injection attack. The attacker aims to execute malicious scripts in a web browser of the victim. The actual attack occurs when the victim visits the web page or web application that executes the malicious code. Learn more <a href="https://owasp.org/www-community/attacks/xss/">here</a>.

# Installation

```bash
cd secDevLabs/owasp-top10-2017-apps/a7/comment-killer
docker-compose up -d --build
docker-compose ps
```

Now visit http://localhost:3000/

In order to stop-

```bash
docker-compose stop
```

# Now what?

Type -

```
<script>alert(1)</script>
```

in the comment section and hit the "comment" button.

you will see-

<img src="img/img1.png" align="center"/>

If you want to reset the app then reload the page.
