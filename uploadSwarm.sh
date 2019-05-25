#!/bin/bash
#
################################################
#                                              #
#  Made with love in hackathon Madrid by :     #
#                                              #
#  @wimel85(wiπΞl)->@cosmaut:matrix.org        #
#  @DerFredy -> @4llfr33d0m:matrix.org         #
#                                              #
################################################
# Script para meter los datos (IP+ID)
#
#curl -X POST \
#  http://swarm.protocol-bt.ml/bzz:/ \
#  -H 'Cache-Control: no-cache' \
#  -H 'Content-Type: application/json' \
#  -H 'Postman-Token: a08ee56b-ce27-7bf3-f386-49004acbe659' \
#  -d '"[{\"key\":\"DATO-IP\",\"value\":\"DATO-ID\"}]"'
# Variables
#-H 'Postman-Token: a08ee56b-ce27-7bf3-f386-49004acbe659' \

echo "What IP would you like to add?"
read -r dataip

echo "What ID would you like to add"
read -r dataid

hash=`curl -s -X POST \
  http://swarm.dappnode/bzz:/ \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: a08ee56b-ce27-7bf3-f386-49004acbe659' \
  -d '"[{\"key\":\"'${dataip}'\",\"value\":\"'${dataid}'\"}]"'`

echo "Your hash is ${hash}"
