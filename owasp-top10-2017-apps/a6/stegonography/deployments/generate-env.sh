#!/bin/sh
#
# This script creates a new SECRET environment variable every time it runs.
#

SECRET=$RANDOM$RANDOM

echo "#.env" > app/.env
echo "SECRET=$SECRET" >> app/.env