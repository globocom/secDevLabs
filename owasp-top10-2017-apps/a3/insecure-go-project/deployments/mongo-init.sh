#!/bin/sh

mongo --nodb --eval "var MONGO_USER='$MONGO_USER', MONGO_PASSWORD='$MONGO_PASSWORD', MONGO_DB_NAME='$MONGO_DB_NAME'" /docker-entrypoint-initdb.d/mongo-init-js
