#!/bin/sh
#
# This script creates new environment variables every time it runs.
#

# API environment variables
SECRET=$RANDOM$RANDOM

echo "#.env" > app/.env
echo "SECRET=$SECRET" >> app/.env
echo "ADMIN_USERNAME=joseph_little_drop"
echo "ADMIN_PASSWORD=X3_vNDwkETxH+/m2L"


# Database environment variables
# MONGO_DATABASE="stego"
MONGO_DATABASE_USERNAME=User$RANDOM$RANDOM
MONGO_DATABASE_PASSWORD=Pass$RANDOM$RANDOM
# MONGO_PORT=27017

echo "#" > deployments/.dockers.env
echo "# This file is auto generated and contains all environment variables needed by Stegonography's database" >> deployments/.dockers.env
echo "#" >> deployments/.dockers.env
echo "MONGO_ROOT_PASSWORD=$MONGO_ROOT_PASSWORD" >> deployments/.dockers.env
echo "MONGO_DATABASE=$MONGO_DATABASE" >> deployments/.dockers.env
echo "MONGO_USER=$MONGO_USER" >> deployments/.dockers.env
echo "MONGO_PASSWORD=$MONGO_PASSWORD" >> deployments/.dockers.env
echo "MONGO_PORT=$MONGO_PORT" >> deployments/.dockers.env
echo "NODE_ENV=production" >> deployments/.dockers.env