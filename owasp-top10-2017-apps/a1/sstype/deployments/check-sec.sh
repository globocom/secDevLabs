#!/bin/bash
#
# This script verifies if app is vulnerable to the attack narrative
#

echo "secDevLabs: Exploiting your app locally!"
echo "Server-Side Template Injection"

echo

echo "Response:"

filteredResponse=$(curl -s --request GET "http://localhost:10001/?name=\{\{4*4\}\}" | grep "Hello: 16");

if [ "$filteredResponse" != "" ]; then
    echo "The app is vulnerable.";
else
    echo "Congrats! The app could not be exploited!";
fi