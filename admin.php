<?php

namespace OCA\Richdocuments;

use \OCA\Richdocuments\AppInfo\Application;

$app = new Application();
$response = $app->getContainer()->query('\OCA\Richdocuments\Controller\SettingsController')->adminIndex();
return $response->render();

