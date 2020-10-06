# Comment-killer

Use this app to learn about XSS vulnerability.

# Installation

```bash
cd secDevLabs/owasp-top10-2017-apps/a7/comment-killer
npm start
```

Now visit http://localhost:3000/

# Usage

Type -

```
<script>alert(1)</script>
```

in the comment section and hit the "comment" button to see the magic :)

If you want to reset the app then reload the page.
