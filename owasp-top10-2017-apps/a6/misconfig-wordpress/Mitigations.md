# Security vulnerabilities mitigation

Suggestions for correcting the security vulnerabilities related to security misconfiguration. You can read more about this topic at the [OWASP website](https://owasp.org/www-project-top-ten/OWASP_Top_Ten_2017/Top_10-2017_A6-Security_Misconfiguration).

## Verbose error messages

Switch the default login error messages to more generic error, such as `Username or password not correct`. Following [this tutorial](https://www.wpbeginner.com/wp-tutorials/how-to-disable-login-hints-in-wordpress-login-error-messages/), one can add the following to `functions.php`:

```php
function no_wordpress_errors(){
  return 'Username or password not correct';
}
add_filter( 'login_errors', 'no_wordpress_errors' );
```

## Default credentials

The admin password should be changed to a more secure one, using the Wordpress admin control panel. As of 2020, the [OWASP Authentication Cheat Sheet](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Authentication_Cheat_Sheet.md#implement-proper-password-strength-controls) suggests a minimum of 8 characters.

About password management, you can read on the recommended practices in [this article](https://www.wpbeginner.com/beginners-guide/what-is-the-best-way-to-manage-passwords-for-wordpress-beginners/).

## Verbose tokens

### HTTP headers

To avoid PHP version exposure, unset the `X-powered-by` HTTP header by modifying your HTTP server configuration. On Apache, this could be achieved by writing the following to the configuration file:

```
Header unset X-Powered-By
```

Some HTTP security headers should be set, as suggested by [this article](https://www.webarxsecurity.com/https-security-headers-wp/), which explain the meaning of each header and values.

Set the `X-XSS-Protection` header to `1;mode=block`

Set the `X-Frame-Options` header to `deny`

Set the `X-Content-Type-Options` to `nosniff`

On Apache, this could be achieved by writing the following to the configuration file:

```
Header set X-XSS-Protection 1;mode=block
Header set X-Frame-Options deny
Header set X-Content-Type-Options nosniff
```

### Directory listing

[Disable directory listing](https://www.wpbeginner.com/wp-tutorials/disable-directory-browsing-wordpress/) by writing the following to the `.htaccess` file:

```
Options -Indexes
```

## Outdated CMS version

Update the Wordpress version using the admin control panel. As of the date this document is being written, the latest release is the version 5.4. It is good to check the latest version and changes on the [Wordpress Releases Page](https://wordpress.org/download/releases/)

---

For additional protection of the admin area, consider implement some suggestions of [this article](https://www.wpbeginner.com/wp-tutorials/11-vital-tips-and-hacks-to-protect-your-wordpress-admin-area/), including the 2-step verification at the login screen and the limitations of login attempts.
