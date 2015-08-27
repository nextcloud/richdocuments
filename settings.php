<?php

/**
 * ownCloud - Documents App
 *
 * @author Victor Dubiniuk
 * @copyright 2013 Victor Dubiniuk victor.dubiniuk@gmail.com
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later.
 */

namespace OCA\Documents;

use \OCA\Documents\AppInfo\Application;

$app = new Application();
$response = $app->getContainer()->query('\OCA\Documents\Controller\SettingsController')->settingsIndex();
return $response->render();
