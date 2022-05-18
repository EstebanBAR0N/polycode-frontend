#!/bin/bash

# init ssh connection
ssh -tt -o StrictHostKeyChecking=no esteban@162.38.112.131 "

# update polycode-frontend repo
cd ~esteban/polycode/polycode-frontend && 
git pull --rebase && 

# deploy with docker compose file
cd ~esteban/polycode &&
docker compose --env-file ./config/.env.prod up -d --build && 

# close ssh connection
exit 
"


# ssh -tt -o StrictHostKeyChecking=no esteban@162.38.112.131 << EOF

# # update polycode-frontend repo
# cd ~esteban/polycode/polycode-frontend
# git pull --rebase

# # deploy with docker compose file
# sudo su -
# cd ~esteban/polycode
# docker compose --env-file ./config/.env.prod up -d --build

# # back to esteban user
# exit

# # close ssh connection
# exit 

# EOF