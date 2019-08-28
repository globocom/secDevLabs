#!/bin/bash
#
# This script will generate environment passwords to build the environment.
#

FILEDIR=$(dirname $BASH_SOURCE)
source $FILEDIR/../.env
# Preparing script to create mongoDB default user
cat << EOF > deployments/mongo-init.js
var db = connect("mongodb://localhost/${MONGO_DBNAME}");
db.createUser(
    {
        user: "${MONGO_USERNAME}",
        pwd: "${MONGO_PASSWORD}",
        roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
    }
);
EOF

