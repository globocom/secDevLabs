# Preventing Vulnerability

-> Try to change the apperance of the site:
    - The site looks like a WordPress site, it can be confirmed by the form, and its always a risk make an attacker realize what CMS or framework you are using.

-> Always have the latest version of your framework and CMS:

-> Use Username and password not usual:
    - One of the msot commons errors of sites is making easy password like, admin, 123456, this makes easier to the attacker to try invade your website.

-> Disable directory listinings:
    - `docker exec -it <container id>`
    - `vi .htaccess`
    - change `Options +Indexes` for `Options -Indexes`

-> Fix Full Path Disclosure error
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

-> fix username (`admin`) showing in RSS feed:
  - use the admin page create a nickname for the admin user and select the nickname under "Display name"

-> add some headers, remove some headers
    Add - ```
    <IfModule headers_module>
    Header unset Server # this one is not working properly
    Header unset X-Powered-By
    Header set X-Frame-Options SAMEORIGIN
    Header set X-XSS-Protection 1
    </IfModule>
    ```
-> Fix the login error message
    - There must have a plugin to help this out.

-> block access to files like `license.txt`

-> Limit access to the admin
    - Limit access to the /wp-admin just for some IP ranges

-> Allow Origin
    - Limit the `*.php` files we can access, to only allow `index.php` and the ones from `/wp-admin`