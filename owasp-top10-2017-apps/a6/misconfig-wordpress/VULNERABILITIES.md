# Vulnerabilities

## Public /wp-admin endpoint

**Solution**: Make the `/wp-admin` route private by protecting it behind a VPN access.

## Valid usernames are shown in the login page

**Solution**: Use a generic message for failed login attempts. For instance: `Invalid username or password`.

## Brute-force-friendly login page

**Solution**: Require the user to solve a captcha after a few invalid login attempts.

## Outdated WordPress installation

**Solution**: Update the WordPress installation and apply all security patches.

## Public directory listing for `/wp-includes/uploads`

**Solution**: Disabled directory listing for `/wp-includes/uploads`.

## Sensitive headers are returned by the server

**Solution**: Remove the `X-Powered-By` header from server responses.

## Missing security headers

**Solution**: Add the following headers to server responses: `X-Frame-Options: deny`, `X-XSS-Protection: 1` and `X-Content-Type-Options: nosniff`.

## Missing HttpOnly flag for cookies

**Solution**: Set the `HttpOnly` flag for all cookies sent by the server so they aren't available to JavaScript.