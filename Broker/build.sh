#!/bin/bash

echo
echo "+======================"
echo "| START: Broker"
echo "+======================"
echo

source .env
echo "Using args ${REALMAPPID} and ${APIKEY}"

docker build -t graboskyc/mongodbar_broker:latest .
docker stop mongodbar_broker
docker rm mongodbar_broker
docker run -t -i -d -p 1883:1883 --name mongodbar_broker -e "REALMAPPID=${REALMAPPID}" -e "APIKEY=${APIKEY}" --restart unless-stopped graboskyc/mongodbar_broker:latest

echo
echo "+======================"
echo "| END: Broker"
echo "+======================"
echo