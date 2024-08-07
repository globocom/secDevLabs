#!/bin/sh
#
# This script creates new environment variables every time it runs.
#

# API environment variables
SECRET=$(pwgen -s $KEY_LENGTH 1 | md5sum | awk '{print $1}')
USER=$(pwgen -s $KEY_LENGTH 1 | md5sum | awk '{print $1}')
PASS=$(pwgen -s $KEY_LENGTH 1 | md5sum | awk '{print $1}')

echo "#.env" > app/.env
echo "SECRET=$SECRET" >> app/.env
# echo "USER=$USER" >> app/.env
# echo "PASS=$PASS" >> app/.env


# Database environment variables
MONGO_DATABASE="stego$(pwgen -s $KEY_LENGTH 1 | md5sum | awk '{print $1}')"
MONGO_DATABASE_USERNAME=User$(pwgen -s $KEY_LENGTH 1 | md5sum | awk '{print $1}')
MONGO_DATABASE_PASSWORD=Pass$(pwgen -s $KEY_LENGTH 1 | md5sum | awk '{print $1}')
MONGO_PORT=27017
MONGO_ROOT_PASSWORD=Root$(pwgen -s $KEY_LENGTH 1 | md5sum | awk '{print $1}')

echo "#" > deployments/.dockers.env
echo "# This file is auto generated and contains all environment variables needed by Stegonography's database" >> deployments/.dockers.env
echo "#" >> deployments/.dockers.env
echo "MONGO_ROOT_PASSWORD=$MONGO_ROOT_PASSWORD" >> deployments/.dockers.env
echo "MONGO_DATABASE=$MONGO_DATABASE" >> deployments/.dockers.env
echo "MONGO_USER=$MONGO_DATABASE_USERNAME" >> deployments/.dockers.env
echo "MONGO_PASSWORD=$MONGO_DATABASE_PASSWORD" >> deployments/.dockers.env
echo "MONGO_PORT=$MONGO_PORT" >> deployments/.dockers.env
echo "USER=$USER" >> deployments/.dockers.env
echo "PASS=$PASS" >> deployments/.dockers.env




# KEY_LENGTH=32

# # Gera uma chave criptograficamente segura
# SECURE_KEY=$(pwgen -s $KEY_LENGTH 1 | md5sum | awk '{print $1}')

# # Exibe a chave gerada
# echo "Chave gerada: $SECURE_KEY"