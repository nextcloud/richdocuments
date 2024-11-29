#!/bin/bash
# This script allows to run wopi-validator-core in a docker container
# on a Nextcloud instance with the richdocuments app enabled
# It is required to have a working WOPI server configured to generate a token
#
# For running locally as the docker container needs to be able to reach the Nextcloud instance
# NEXTCLOUD_URL=http://nextcloud.local DOCKER_ARGS="--network nextcloud_default" HOST_IP=192.168.21.1 ./tests/wopi-test.sh

# current timestamp as filename
FILENAME=$(date +%s)

NEXTCLOUD_URL=${NEXTCLOUD_URL:-http://nextcloud.local}
USERNAME=${USERNAME:-admin}
PASSWORD=${PASSWORD:-admin}
HOST_IP=${HOST_IP:-172.17.0.1}
DOCKER_ARGS=${DOCKER_ARGS:-}

curl $NEXTCLOUD_URL/status.php --max-time 5 --retry 5 --retry-delay 0 --retry-max-time 30 --retry-connrefused

curl -X PUT -u $USERNAME:$PASSWORD $NEXTCLOUD_URL/remote.php/webdav/$FILENAME.odt -s

PROPFIND_RESULT=$(curl -X PROPFIND -u $USERNAME:$PASSWORD $NEXTCLOUD_URL/remote.php/webdav/$FILENAME.odt --data '<?xml version="1.0"?><d:propfind xmlns:d="DAV:" xmlns:nc="http://nextcloud.org/ns" xmlns:oc="http://owncloud.org/ns" xmlns:ocs="http://open-collaboration-services.org/ns"><d:prop><oc:fileid /></d:prop></d:propfind>' -s)
FILE_ID=$(echo $PROPFIND_RESULT | grep -ohE '<oc:fileid>(.*)</oc:fileid>' | cut -d'>' -f 2 | cut -d'<' -f 1)

COOKIEJAR=/tmp/cookie-jar
rm -f $COOKIEJAR
CSRF_TOKEN=$(curl $NEXTCLOUD_URL/index.php/login --cookie-jar $COOKIEJAR -s | grep requesttoken | grep -ohE 'data-requesttoken="(.*)"' | cut -d'"' -f 2)

echo "File id: $FILE_ID"
echo "CSRF token: $CSRF_TOKEN"

WOPI_TOKEN=$(curl -u $USERNAME:$PASSWORD --cookie-jar $COOKIEJAR $NEXTCLOUD_URL/index.php/apps/richdocuments/token?fileId=$FILE_ID -X POST -H "requesttoken: $CSRF_TOKEN" -s | jq -r .token)

# Nextcloud needed a valid mimetype before ut the wopi test can only be ran with a .wopitest file
curl -X MOVE -u $USERNAME:$PASSWORD $NEXTCLOUD_URL/remote.php/webdav/$FILENAME.odt -H "Destination: $NEXTCLOUD_URL/remote.php/webdav/$FILENAME.wopitest"

WOPI_URL="$NEXTCLOUD_URL/index.php/apps/richdocuments/wopi/files/$FILE_ID"

echo "WOPI URL: $WOPI_URL"
echo "WOPI token generated: $WOPI_TOKEN"

docker run $DOCKER_ARGS --add-host "nextcloud.local:${HOST_IP}" --rm tylerbutler/wopi-validator -- -w $WOPI_URL -t $WOPI_TOKEN -l 0 "$@"
