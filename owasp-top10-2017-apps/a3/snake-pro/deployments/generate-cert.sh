#!/bin/sh
#
# This script creates a new self-signed certificate and private key every time it runs.
#

openssl req -x509 \
    -nodes \
    -days 365 \
    -newkey rsa:2048 \
    -keyout app/key.pem \
    -out app/cert.pem \
    -subj "/CN=localhost"
