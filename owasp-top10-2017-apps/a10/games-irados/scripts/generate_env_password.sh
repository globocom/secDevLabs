#!/bin/bash
#
# This script will generate environment passwords to build the environment.
#

# Generating "random" passwords
MYSQL_USER_TMP="user$RANDOM$RANDOM"
MYSQL_DATABASE_TMP="db$RANDOM$RANDOM"
MYSQL_PASSWORD_TMP="password$RANDOM$RANDOM"
MYSQL_ROOT_PASSWORD_TMP="rootpassword$RANDOM$RANDOM"

# Writing passwords into dockers.env file to be used by docker compose
# echo "MYSQL_USER=$MYSQL_USER_TMP" > deployments/dockers.env
# echo "MYSQL_DB=$MYSQL_DATABASE_TMP" >> deployments/dockers.env
# echo "MYSQL_PASSWORD=$MYSQL_PASSWORD_TMP" >> deployments/dockers.env

echo "MYSQL_USER=\"$MYSQL_USER_TMP\"" > deployments/dockers.env
echo "MYSQL_DB=\"$MYSQL_DATABASE_TMP\"" >> deployments/dockers.env
echo "MYSQL_PASSWORD=\"$MYSQL_PASSWORD_TMP\"" >> deployments/dockers.env
echo "MYSQL_ENDPOINT=\"db\"" >> deployments/dockers.env

echo "MYSQL_ROOT_PASSWORD=\"$MYSQL_ROOT_PASSWORD_TMP\"" > deployments/mysqldocker.env
echo "MYSQL_USER=\"$MYSQL_USER_TMP\"" >> deployments/mysqldocker.env
echo "MYSQL_DB=\"$MYSQL_DATABASE_TMP\"" >> deployments/mysqldocker.env
echo "MYSQL_PASSWORD=\"$MYSQL_PASSWORD_TMP\"" >> deployments/mysqldocker.env
