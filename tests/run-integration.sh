#!/usr/bin/env bash
#
# SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
# SPDX-License-Identifier: AGPL-3.0-or-later
set -e

OC_PATH=../../../
OCC=${OC_PATH}occ
SCENARIO_TO_RUN=$1
HIDE_OC_LOGS=$2
APP_NAME=richdocuments

PORT_SERVERA=8080
PORT_SERVERB=8081
PORT_COOL=9980

# Backend mode for the Collabora integration:
# - external: use a standalone CODE/Collabora container (default)
# - embedded: use richdocumentscode proxy.php flow
CODE_PROVIDER=${CODE_PROVIDER:-external}

# Default WOPI endpoint for the external Collabora container.
# For the embedded richdocumentscode path, the workflow should set:
#   WOPI_URL=http://localhost/apps/richdocumentscode/proxy.php?req=
WOPI_URL=${WOPI_URL:-http://localhost:$PORT_COOL}

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

if [ "$CODE_PROVIDER" = "embedded" ]; then
	echo "Using embedded Collabora (richdocumentscode) via $WOPI_URL"
	sleep 10
else
	if curl --fail "$WOPI_URL/hosting/capabilities"; then
		echo "Collabora server already running at port $PORT_COOL"
	else
		if ! docker info >/dev/null 2>&1; then
			echo "Docker does not seem to be running, so start the docker daemon or run a collabora server manually"
			exit 1
		fi
		COOL_CONTAINER=$(docker run -t -d -p 9980:9980 -e "domain=localhost" -e "extra_params=--o:ssl.enable=false" collabora/code)
	fi
fi

curl --fail "$WOPI_URL/hosting/capabilities"

PHP_CLI_SERVER_WORKERS=10 php -S localhost:$PORT_SERVERA -t $OC_PATH &
PHPPIDA=$!
PHP_CLI_SERVER_WORKERS=10 php -S localhost:$PORT_SERVERB -t $OC_PATH &
PHPPIDB=$!

$OCC richdocuments:setup --wopi_url="$WOPI_URL"

$OCC config:system:set allow_local_remote_servers --value true --type bool
$OCC config:system:set gs.trustedHosts 0 --value="localhost:$PORT_SERVERA"
$OCC config:system:set gs.trustedHosts 1 --value="localhost:$PORT_SERVERB"

vendor/bin/behat --colors $SCENARIO_TO_RUN
RESULT=$?

kill $PHPPIDA
kill $PHPPIDB

[[ -v COOL_CONTAINER ]] && docker stop "$COOL_CONTAINER"

echo "runsh: Exit code: $RESULT"
exit $RESULT
