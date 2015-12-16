<?php

/**
 * ownCloud - Richdocuments App
 *
 * @author Victor Dubiniuk
 * @copyright 2013 Victor Dubiniuk victor.dubiniuk@gmail.com
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later.
 */

namespace OCA\Richdocuments;

use \OCA\Richdocuments\AppInfo\Application;

$app = new Application();
$response = $app->getContainer()->query('\OCA\Richdocuments\Controller\SettingsController')->settingsIndex();
return $response->render();
