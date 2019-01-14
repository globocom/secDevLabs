First of all, update WordPress version.

Click in "Please update now." in admin dashboad and proceed with the update.

--

To mitigate the problem while sign-in that shows the username sent is valid, but not the password.

In file `wp-includes/user.php`

Line 171, change: 

`__( '<strong>ERROR</strong>: The password you entered for the username %s is incorrect.' ),`

to

`__( '<strong>ERROR</strong>: The username or password you entered is incorrect.' ),`

And line 243, change:

`__( '<strong>ERROR</strong>: The password you entered for the email address %s is incorrect.' ),`

to

`__( '<strong>ERROR</strong>: The username or password you entered is incorrect.' ),`

--

Disable folder listing 

Change

`Options +Indexes`

to

`Options -Indexes`

in `/var/www/html/.htaccess`

--

Remove `X-Powered-By: PHP` from response header

Add `expose_php = Off` to file `/usr/local/etc/php/php.ini`