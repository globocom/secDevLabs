#!/bin/bash
#
# This script will generate environment passwords to build the environment.
#

# Generating "random" passwords
MONGO_DATABASE_USERNAME_TMP="User$RANDOM$RANDOM"
MONGO_DATABASE_PASSWORD_TMP="Pass$RANDOM$RANDOM"

# Writing passwords into dockers.env file to be used by docker compose
echo "MONGO_DATABASE_USERNAME=$MONGO_DATABASE_USERNAME_TMP" > deployments/dockers.env
echo "MONGO_DATABASE_PASSWORD=$MONGO_DATABASE_PASSWORD_TMP" >> deployments/dockers.env

# Writing passwords into .env to be used by run_create_cert.sh and to send to STDOUT
echo "MONGO_DATABASE_USERNAME=\"$MONGO_DATABASE_USERNAME_TMP\"" > .env
echo "MONGO_DATABASE_PASSWORD=\"$MONGO_DATABASE_PASSWORD_TMP\"" >> .env

# Preparing script to create mongoDB default user
cat << EOF > deployments/mongo-init.js
var db = connect("mongodb://localhost/DB");
db.createUser(
    {
        user: "${MONGO_DATABASE_USERNAME_TMP}",
        pwd: "${MONGO_DATABASE_PASSWORD_TMP}",
        roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
    }
);
EOF
