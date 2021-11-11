#!/bin/sh
#
# This script creates new environment variables every time it runs.
#

DATABASE="a5db"
DATABASE_USER=User$RANDOM$RANDOM
DATABASE_PASSWORD=Pass$RANDOM$RANDOM
SECRET=$RANDOM$RANDOM
PORT=3306
DATABASE_HOST="mysqldb"

echo "#" > deployments/.dockers.env
echo "# This file is auto generated and contains all environment variables needed by Tic-Tac-Toe's database" >> deployments/.dockers.env
echo "#" >> deployments/.dockers.env
echo "SECRET=$SECRET" >> deployments/.dockers.env
echo "DB_PASSWORD=$DATABASE_PASSWORD" >> deployments/.dockers.env
echo "MYSQL_PASSWORD=$DATABASE_PASSWORD" >> deployments/.dockers.env
echo "DB_DATABASE=$DATABASE" >> deployments/.dockers.env
echo "MYSQL_DATABASE=$DATABASE" >> deployments/.dockers.env
echo "DB_USER=$DATABASE_USER" >> deployments/.dockers.env
echo "MYSQL_USER=$DATABASE_USER" >> deployments/.dockers.env
echo "MYSQL_ROOT_PASSWORD=$DATABASE_PASSWORD" >> deployments/.dockers.env
echo "DB_HOST=$DATABASE_HOST" >> deployments/.dockers.env
echo "DB_PORT=$PORT" >> deployments/.dockers.env