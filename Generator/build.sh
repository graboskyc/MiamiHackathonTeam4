#!/bin/bash

echo
echo "+======================"
echo "| START: Producer"
echo "+======================"
echo

source .env
echo "Using args ${BROKER} and ${TOPIC}"

docker build -t graboskyc/mongodbar_producer:latest .

echo "PRODUCER 1"
docker stop mongodbar_producer1
docker rm mongodbar_producer1
docker run -t -i -d --name mongodbar_producer1 -e "BROKER=${BROKER}" -e "DEVICEID=${DEV1_ID}"  -e "TOPIC=${TOPIC}" -e "SIZE=${DEV1_SIZE}" -e "NAME=${DEV1_NAME}" --restart unless-stopped graboskyc/mongodbar_producer:latest

echo "PRODUCER 2"
docker stop mongodbar_producer2
docker rm mongodbar_producer2
docker run -t -i -d --name mongodbar_producer2 -e "BROKER=${BROKER}" -e "DEVICEID=${DEV2_ID}"  -e "TOPIC=${TOPIC}" -e "SIZE=${DEV2_SIZE}" -e "NAME=${DEV2_NAME}" --restart unless-stopped graboskyc/mongodbar_producer:latest

echo "PRODUCER 1"
docker stop mongodbar_producer3
docker rm mongodbar_producer3
docker run -t -i -d --name mongodbar_producer3 -e "BROKER=${BROKER}" -e "DEVICEID=${DEV3_ID}"  -e "TOPIC=${TOPIC}" -e "SIZE=${DEV3_SIZE}" -e "NAME=${DEV3_NAME}" --restart unless-stopped graboskyc/mongodbar_producer:latest


echo
echo "+======================"
echo "| END: Producer"
echo "+======================"
echo