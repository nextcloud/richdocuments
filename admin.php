<?php

namespace OCA\Documents;

use \OCA\Documents\AppInfo\Application;

$app = new Application();
$response = $app->getContainer()->query('\OCA\Documents\Controller\SettingsController')->adminIndex();
return $response->render();

