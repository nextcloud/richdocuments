<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

use Nextcloud\Rector\Set\NextcloudSets;
use Rector\Config\RectorConfig;

use Rector\Php81\Rector\Property\ReadOnlyPropertyRector;

return RectorConfig::configure()
	->withImportNames(true)
	->withPaths([
		__DIR__ . '/appinfo',
		__DIR__ . '/lib',
		__DIR__ . '/tests/lib',
	])
	->withPhpSets(php80: true)
	->withTypeCoverageLevel(0)
	->withSets([
		// NextcloudSets::NEXTCLOUD_30,
	])
	->withSkip([
		// ReadOnlyPropertyRector::class,
	])
;
