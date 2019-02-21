#!/bin/bash
#
# This script will generate environment passwords to build the environment.
#

# Generating "random" passwords
MONGO_DATABASE_USERNAME_TMP="User$RANDOM$RANDOM"
MONGO_DATABASE_PASSWORD_TMP="Pass$RANDOM$RANDOM"
MONGO_DATABASE_NAME_TMP="Db$RANDOM$RANDOM"

# Writing passwords into dockers.env file to be used by docker compose
echo "MONGO_USER=$MONGO_DATABASE_USERNAME_TMP" > deployments/dockers.env
echo "MONGO_PASSWORD=$MONGO_DATABASE_PASSWORD_TMP" >> deployments/dockers.env
echo "MONGO_DB_NAME=$MONGO_DATABASE_NAME_TMP" >> deployments/dockers.env
echo "MONGO_HOST=localhost" >> deployments/dockers.env

# Preparing script to create mongoDB default user
cat << EOF > deployments/mongo-init.js
var db = connect("mongodb://localhost/${MONGO_DATABASE_NAME_TMP}");
db.createUser(
    {
        user: "${MONGO_DATABASE_USERNAME_TMP}",
        pwd: "${MONGO_DATABASE_PASSWORD_TMP}",
        roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
    }
);
EOF
