#!/bin/sh
#
# This script creates new environment variables every time it runs.
#

# API environment variables
M2_SECRET=$RANDOM$RANDOM

echo "#" > deployments/api.env
echo "# This file is auto generated and contains all environment variables needed by Cool-Game's server side API" >> deployments/mongo.env
echo "#" >> deployments/api.env
echo "M2_SECRET=$M2_SECRET" >> deployments/api.env

# Database environment variables
MONGO_DATABASE_NAME="coolgames"
MONGO_DATABASE_USERNAME=User$RANDOM$RANDOM
MONGO_DATABASE_PASSWORD=Pass$RANDOM$RANDOM
MONGO_DATABASE_PORT=27017

echo "#" > deployments/mongo.env
echo "# This file is auto generated and contains all environment variables needed by Cool-Game's server database" >> deployments/mongo.env
echo "#" >> deployments/mongo.env
echo "MONGO_DATABASE_NAME=$MONGO_DATABASE_NAME" >> deployments/mongo.env
echo "MONGO_DATABASE_USERNAME=$MONGO_DATABASE_USERNAME" >> deployments/mongo.env
echo "MONGO_DATABASE_PASSWORD=$MONGO_DATABASE_PASSWORD" >> deployments/mongo.env
echo "MONGO_DATABASE_PORT=$MONGO_DATABASE_PORT" >> deployments/mongo.env

FILEDIR=$(dirname $BASH_SOURCE)
source $FILEDIR/mongo.env
# Preparing script to create mongoDB default user
cat << EOF > deployments/mongo-init.js
var db = connect("mongodb://localhost/${MONGO_DATABASE_NAME}");
db.createUser(
    {
        user: "${MONGO_DATABASE_USERNAME}",
        pwd: "${MONGO_DATABASE_PASSWORD}",
        roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
    }
);
EOF