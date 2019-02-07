#!/bin/bash
#
# This script will generate environment passwords to build the environment.
#

# Generating "random" passwords
CERT_PASSPHRASE_TMP="certPass$RANDOM$RANDOM"
MONGO_DATABASE_USERNAME_TMP="huskyUser$RANDOM$RANDOM"
MONGO_DATABASE_PASSWORD_TMP="huskyPass$RANDOM$RANDOM"

# Writing passwords into dockers.env file to be used by docker compose
echo "MONGO_DATABASE_USERNAME=$MONGO_DATABASE_USERNAME_TMP" > deployments/dockers.env
echo "MONGO_DATABASE_PASSWORD=$MONGO_DATABASE_PASSWORD_TMP" >> deployments/dockers.env

# Writing passwords into .env to be used by run_create_cert.sh and to send to STDOUT
echo "export CERT_PASSPHRASE=\"$CERT_PASSPHRASE_TMP\"" > .env
echo "export MONGO_DATABASE_USERNAME=\"$MONGO_DATABASE_USERNAME_TMP\"" >> .env
echo "export MONGO_DATABASE_PASSWORD=\"$MONGO_DATABASE_PASSWORD_TMP\"" >> .env

cat << EOF > app/config.yml
mongoConf:
  mongoPassword: ${MONGO_DATABASE_PASSWORD_TMP}
  mongoUser: ${MONGO_DATABASE_USERNAME_TMP}
  mongoDBName: insecure_go_project
  mongoHost: mongodb
EOF

# Preparing script to create mongoDB default user
cat << EOF > deployments/mongo-init.js
var db = connect("mongodb://localhost/insecure_go_project");
db.createUser(
    {
        user: "${MONGO_DATABASE_USERNAME_TMP}",
        pwd: "${MONGO_DATABASE_PASSWORD_TMP}",
        roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
    }
);
EOF
