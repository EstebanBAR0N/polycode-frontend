#!/bin/bash

# init ssh connection
ssh -o StrictHostKeyChecking=no esteban@162.38.112.131 | \

# update polycode-frontend repo
git config --global --add safe.directory /home/esteban/Documents/s8/web/project/PolyCode/polycode-frontend | \
cd ~esteban/polycode/polycode-frontend |  \
git pull --rebase | \

# deploy with docker compose file
sudo su - | \
cd ~esteban/polycode | \
docker compose --env-file ../config/.env.prod up -d --build | \

# back to esteban user
exit | \

# close ssh connection
exit 