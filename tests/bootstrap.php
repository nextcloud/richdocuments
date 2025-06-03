<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2018 Nextcloud GmbH and Nextcloud contributors
 * SPDX-FileCopyrightText: 2014-2015 ownCloud, Inc.
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

use OCP\App\IAppManager;
use OCP\Server;

if (!defined('PHPUNIT_RUN')) {
	define('PHPUNIT_RUN', 1);
}

require_once __DIR__ . '/../../../tests/autoload.php';

Server::get(IAppManager::class)->loadApp('richdocuments');

if (!class_exists(\PHPUnit\Framework\TestCase::class)) {
	require_once('PHPUnit/Autoload.php');
}
