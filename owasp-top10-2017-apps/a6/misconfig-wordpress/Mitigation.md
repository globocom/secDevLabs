# A6 - Misconfig WordPress

## Some steps can be taken to mitigate vulnerabilities:
- Update the wordpress to the latest version
- Use complex passwords

### Accessing wp-admin
- Restrict the access to the admin endpoint to a private network

### Login error message giving hints to an attacker
- Change the login error messages to be more generic like, "Login failed; Invalid username or password"

### Brute-Force attacks to guess passwords
- Employ a password lockout mechanism that locks out an account for a period of time if too many unsuccessful login attempts are made. Another option is implementing a captcha system to check if the user is human. (Or maybe both)

### Directory listing
- Disable directory listing to prevent folder browsing in the wordpress website

### HTTP Headers
- Remove `x-powered-by` from header to omit technology information about the server
- Add `X-Frame-Options: deny` to avoid clickjacking attacks
- Add `X-XSS-Protection: 1; mode=block` to prevent rendering the page if a XXS attack is detected
- Add `X-Content-Type-Options: nosniff` to use the server-provided `Content-Type`

Lastly, set `httponly` flag to indicate the cookie should not be accessible on the client
