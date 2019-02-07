# Mitigations for Wordpress

1. Keep it updated, using the admin interface update to the lastest wordpress version
1. Use a safe password for admin access.
1. Make sure apache is not serving indexes, verify that `.htaccess` has `Options -Indexes`.
1. Use the recommended rewrite rules:

```
RewriteEngine On
RewriteBase /
RewriteRule ^index\.php$ - [L]

# add a trailing slash to /wp-admin
RewriteRule ^wp-admin$ wp-admin/ [R=301,L]

RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]
RewriteRule ^(wp-(content|admin|includes).*) $1 [L]
RewriteRule ^(.*\.php)$ $1 [L]
RewriteRule . index.php [L]
```

1. Filter out unnecessary headers, install mod_header if needed and configure `.htaccess` to block the following headers:
 - X-Powered-By
 - LINK
 - SERVER (this one might not be possible to disable on `.htaccess`)

```
Header unset X-Powered-By
Header unset LINK
ServerSignature off
```

1. Set some extra headers like:

```
Header always set X-Content-Type-Options "nosniff"
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
```

1. Block access to some files:

```
<FilesMatch "^.*(error_log|wp-config\.php|php.ini|\.[hH][tT][aApP].*)$">
Order deny,allow
Deny from all
</FilesMatch>
```


