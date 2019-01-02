#!/bin/bash
#
# This script will generate environment passwords to build the environment.
#

# Generating "random" passwords
MYSQL_ROOT_PASSWORD_TMP="root$RANDOM$RANDOM"
MYSQL_USER_TMP="user$RANDOM$RANDOM"
MYSQL_DATABASE_TMP="db$RANDOM$RANDOM"
MYSQL_PASSWORD_TMP="password$RANDOM$RANDOM"

# Writing passwords into dockers.env file to be used by docker compose
echo "MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD_TMP" > deployments/dockers.env
echo "MYSQL_USER=$MYSQL_USER_TMP" >> deployments/dockers.env
echo "MYSQL_DATABASE=$MYSQL_DATABASE_TMP" >> deployments/dockers.env
echo "MYSQL_PASSWORD=$MYSQL_PASSWORD_TMP" >> deployments/dockers.env

# Writing passwords into .env to be used by start-db.sh 
echo "export MYSQL_ROOT_PASSWORD=\"$MYSQL_ROOT_PASSWORD_TMP\"" > .env
echo "export MYSQL_USER=\"$MYSQL_USER_TMP\"" >> .env
echo "export MYSQL_DATABASE=\"$MYSQL_DATABASE_TMP\"" >> .env
echo "export MYSQL_PASSWORD=\"$MYSQL_PASSWORD_TMP\"" >> .env