#!/usr/bin/env bash

OC_PATH=../../../
OCC=${OC_PATH}occ
SCENARIO_TO_RUN=$1
HIDE_OC_LOGS=$2
APP_NAME=richdocuments

PORT_SERVERA=8080
PORT_SERVERB=8081
PORT_COOL=9980

INSTALLED=$($OCC status | grep installed: | cut -d " " -f 5)

if [ "$INSTALLED" == "true" ]; then
    $OCC app:enable $APP_NAME
else
    if [ "$SCENARIO_TO_RUN" != "setup_features/setup.feature" ]; then
        echo "Nextcloud instance needs to be installed" >&2
        exit 1
    fi
fi

composer install
composer dump-autoload

if curl --fail http://localhost:$PORT_COOL/hosting/capabilities; then
	echo "Collabora server already running at port $PORT_COOL"
else
	if ! docker info >/dev/null 2>&1; then
		echo "Docker does not seem to be running, so start the docker daemon or run a collabora server manually"
		exit 1
	fi
	COOL_CONTAINER=$(docker run -t -d -p 9980:9980 -e "domain=localhost" -e "extra_params=--o:ssl.enable=false" collabora/code)
fi;




PHP_CLI_SERVER_WORKERS=10 php -S localhost:$PORT_SERVERA -t $OC_PATH &
PHPPIDA=$!
PHP_CLI_SERVER_WORKERS=10 php -S localhost:$PORT_SERVERB -t $OC_PATH &
PHPPIDB=$!


$OCC config:app:set richdocuments wopi_url --value="http://localhost:9980"
$OCC config:app:set richdocuments public_wopi_url --value="http://localhost:9980"
$OCC richdocuments:activate-config
$OCC config:system:set allow_local_remote_servers --value true --type bool
$OCC config:system:set gs.trustedHosts 0 --value="localhost:$PORT_SERVERA"
$OCC config:system:set gs.trustedHosts 1 --value="localhost:$PORT_SERVERB"


vendor/bin/behat $SCENARIO_TO_RUN
RESULT=$?

kill $PHPPIDA
kill $PHPPIDB

[[ -v COOL_CONTAINER ]] && docker stop $container_id

echo "runsh: Exit code: $RESULT"
exit $RESULT
