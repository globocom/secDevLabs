solution:

1. give `admin` a secure password:
  - use the admin page to generate a strong password for `admin` user
  - the password cannot be a dictionary word. Something like "1y*%AaI9!1oNrD6Xmqd)JKIc"

1. update WordPress
  - use the admin page to update WordPress version

1. update theme
  - use the admin page to update the default theme `twentyseventeen`

1. disable directory listing:
  - `docker exec -it <container id>`
  - `vi .htaccess`
  - change `Options +Indexes` for `Options -Indexes`

1. fix Full Path Disclosure error
  - `docker exec -it <container id>`
  - `vi .htaccess`
  - add:
    ```
    # Block wp-includes folder and files
    <IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^wp-admin/includes/ - [F,L]
    RewriteRule !^wp-includes/ - [S=3]
    RewriteRule ^wp-includes/[^/]+\.php$ - [F,L]
    RewriteRule ^wp-includes/js/tinymce/langs/.+\.php - [F,L]
    RewriteRule ^wp-includes/theme-compat/ - [F,L]
    </IfModule>
    ```

1. fix username (`admin`) showing in RSS feed:
  - use the admin page create a nickname for the admin user and select the nickname under "Display name publicly as"

1. add some headers, remove some headers
  - `docker exec -it <container id>`
  - `a2enmod headers && service apache2 restart`
  - `vi .htaccess`
  - add:
    ```
    <IfModule headers_module>
    Header unset Server # this one is not working properly
    Header unset X-Powered-By
    Header set X-Frame-Options SAMEORIGIN
    Header set X-XSS-Protection 1
    </IfModule>
    ```

1. fix the login error message. I would look for some plugin or try to make the change manually

1. block access to files like `license.txt`

1. optionally, limit access to the /wp-admin just for some IP ranges

1. limit the `*.php` files we can access, to only allow `index.php` and the ones from `/wp-admin`
