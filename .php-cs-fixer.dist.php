<?php

declare(strict_types=1);
/*
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
require_once './vendor/autoload.php';

use Nextcloud\CodingStandard\Config;

$config = new Config();
$config
	->getFinder()
//	->ignoreVCSIgnored(true)
	->notPath('build')
	->notPath('composer')
	->notPath('l10n')
	->notPath('src')
	->notPath('node_modules')
	->notPath('vendor')
	->in(__DIR__);
return $config;
