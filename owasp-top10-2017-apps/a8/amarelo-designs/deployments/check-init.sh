#!/bin/bash
#
# This script prints initialization messages after the compose phase.
#

COLOR_RESET='\033[0m'
COLOR_YELLOW='\033[33m'
COLOR_GREEN='\033[32m'
COLOR_BLUE='\033[1;34m'

PROJECT='A8 - Amarelo Designs'
PORT=5000
TRIES=20

printf "${COLOR_YELLOW}SecDevLabs: 👀  Your app is starting!\n${COLOR_RESET}"
while : ;do
    `curl -s -f http://localhost:$PORT > /dev/null`
    if [ $? == 0 ]; then
        break
    fi
    if [ $TRIES == 20 ]; then
        printf "${COLOR_GREEN}SecDevLabs: ☕️  Hmmm... Sounds good!${COLOR_RESET}\n"
    fi
    if [ $TRIES == 0 ]; then
        break
    fi
    sleep 5
    TRIES=$TRIES-1
    printf "${COLOR_YELLOW}SecDevLabs: 👀  Your app is still starting...\n${COLOR_RESET}"
done

if [ $TRIES == 0 ]; then
    printf "${COLOR_BLUE}SecDevLabs: Ooops! Something went wrong, please check api details for more information!"
else
    printf "${COLOR_GREEN}SecDevLabs: 🔥  ${PROJECT} is now running at ${COLOR_RESET}${COLOR_BLUE}http://localhost:$PORT${COLOR_RESET}\n"
fi