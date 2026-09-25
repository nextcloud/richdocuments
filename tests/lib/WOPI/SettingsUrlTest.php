<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments\WOPI;

use InvalidArgumentException;
use OCA\Richdocuments\WOPI\SettingsType;
use OCA\Richdocuments\WOPI\SettingsUrl;
use PHPUnit\Framework\TestCase;

class SettingsUrlTest extends TestCase {
	/**
	 * Type and category are single path segments, which is why validating the type is enough to
	 * keep a request from naming another user's settings directory.
	 */
	public function testTypeAndCategoryAreSingleSegments(): void {
		$settingsUrl = new SettingsUrl('/settings/userconfig/victim/wordbook/x.dic');

		$this->assertSame('userconfig', $settingsUrl->getType());
		$this->assertSame('victim', $settingsUrl->getCategory());
		$this->assertSame('wordbook/x.dic', $settingsUrl->getFileName());
	}

	public function testGetSettingsType(): void {
		$this->assertSame(
			SettingsType::SystemConfig,
			(new SettingsUrl('/settings/systemconfig/wordbook/x.dic'))->getSettingsType(),
		);
		$this->assertSame(
			SettingsType::UserConfig,
			(new SettingsUrl('/settings/userconfig/wordbook/x.dic'))->getSettingsType(),
		);
	}

	/**
	 * Anything that is not a known type must not be mistaken for one, including a case variant of
	 * systemconfig, which would otherwise skip the admin check.
	 */
	public function testGetSettingsTypeIsNullForUnknownTypes(): void {
		$this->assertNull((new SettingsUrl('/settings/SystemConfig/wordbook/x.dic'))->getSettingsType());
		$this->assertNull((new SettingsUrl('/settings/fonts/overview/x.png'))->getSettingsType());
	}

	public function testRejectsPathWithoutSettingsSegment(): void {
		$this->expectException(InvalidArgumentException::class);

		new SettingsUrl('/not-a-settings-path');
	}

	public function testRejectsIncompletePath(): void {
		$this->expectException(InvalidArgumentException::class);

		new SettingsUrl('/settings/userconfig/wordbook');
	}
}
