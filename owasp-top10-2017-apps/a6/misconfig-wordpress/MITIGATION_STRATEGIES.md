In this document, I'll describe a few suggestions for resolving the vulnerabilities of "A Vulnerable Wordpress site" application.

- Application has the Admin page exposed for anyone
The admin page is the entrypoint to the attacker confirm it's a Wordpress application and
to brute-force login and passwords. An idea would disallow regular users to access this page,
and allow only to users of an specific IP, like users of a company all connected to the same network.

- Admin password is too weak.
Password should be lenghty and difficult, it should have uppercase and lowercase letters, symbols, etc.

- Application shows when user is correct, but password is not correct.
Giving this information for the attacker is highly not recommended, since she can confirm her suspicious.
To solve this, we need to personalize this Admin page so it won't give this type of message, but just a 
general message, like "User or password is incorrect". This could be achieved by a Wordpress configuration
if available, or by creating a whole new admin page.

- Attacker can perform a brute-force attack.
It would be interesting to limit requests by IP, so an attacker would receive errors when trying to perform
too much requests to the application.

- Wordpress version is outdated and vulnerable.
It would be a good idea to update its version so it doesn't have known vulnerabilities.

- Application has browseable directories.
It's important to hide directories so user cant see them and try to access those files. In Wordpress,
this restriction could be achieved adding a simple line with "Options -Indexes" in .htaccess file, 
for example.

- Security headers expose information in excess.
Some headers show too much information. That's happening to "x-powered-by" header, which shows the PHP version
used. This information could be used to look up for exploits and then attack the application. So to solve this,
it's important to unset this header.

- Other important headers are not present.
"X-Frame-Options" is important to avoid clickjacking attacks, by making sure their content is 
not embedded into other sites. We can set it to "sameorigin", to ensure the page can be displayed only
in a frame on the same origin of the page itself.
The header "X-XSS-Protection" tells the browser to stop loading the page if they detect XSS (cross-site
scripting) attacks, so it should be set. We can set it value to 1 so it's enabled.
Finally, "X-Content-Type-Options" should be set to "nosniff". This way, we prevent the user to render the site
differently than the MIME type.

- Cookie without the httponly flag.
Without this flag, this cookie can be accessed by some client-side scripting, and then, an attacker would
be able to steal this information. A solution to this is to set this flag when creating the cookie.