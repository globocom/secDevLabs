First of All, you must update your WordPress version.

In your Dashboard, click on “Please update now”. Go ahead and follow the instructions to update it.

Another problem we need to fix change the message when user type his/her credentials:

  - Change the message  “The password you entered for the USERNAME %s is incorrect” to “The username or password you entered is incorrect.” In wp-includes/user.php

- Change the message “The password you entered for the email ADDRESS %s is incorrect.” To “The username or password you entered is incorrect.”


In .htaccess file, you must add “Options -Indexes” in the end of file in order to prevent fold browsing in your WordPress website.
