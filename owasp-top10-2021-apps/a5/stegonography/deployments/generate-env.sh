
#!/bin/sh
#
# This script creates environment variables for Stegonography.
#

# API environment variables
SECRET=$(openssl rand -hex 32)
ADMIN_PASSWORD=$(openssl rand -hex 16)

echo "# API environment variables" > app/.env
echo "SECRET=$SECRET" >> app/.env
echo "ADMIN_PASSWORD=$ADMIN_PASSWORD" >> app/.env

# Database environment variables
MONGO_DATABASE="stego"
MONGO_DATABASE_USERNAME="User$(openssl rand -hex 8)"
MONGO_DATABASE_PASSWORD="Pass$(openssl rand -hex 8)"

echo "#" > deployments/.dockers.env
echo "# MongoDB environment variables" >> deployments/.dockers.env
echo "MONGO_INITDB_ROOT_USERNAME=$MONGO_DATABASE_USERNAME" >> deployments/.dockers.env
echo "MONGO_INITDB_ROOT_PASSWORD=$MONGO_DATABASE_PASSWORD" >> deployments/.dockers.env
echo "MONGO_DATABASE=$MONGO_DATABASE" >> deployments/.dockers.env
echo "MONGO_USER=$MONGO_DATABASE_USERNAME" >> deployments/.dockers.env
echo "MONGO_PASSWORD=$MONGO_DATABASE_PASSWORD" >> deployments/.dockers.env
echo "MONGO_PORT=27017" >> deployments/.dockers.env

# Restrict access to generated environment files
chmod 600 app/.env deployments/.dockers.env
