<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments\Service;

use OCA\Richdocuments\AppInfo\Application;
use OCA\Richdocuments\Service\LanguageService;
use OCP\IL10N;
use OCP\L10N\IFactory;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

class LanguageServiceTest extends TestCase {
	private IFactory&MockObject $l10nFactory;
	private IL10N&MockObject $l10n;
	private LanguageService $service;

	protected function setUp(): void {
		parent::setUp();

		$this->l10nFactory = $this->createMock(IFactory::class);
		$this->l10n = $this->createMock(IL10N::class);
		$this->l10nFactory->method('get')
			->with(Application::APPNAME)
			->willReturn($this->l10n);

		$this->service = new LanguageService($this->l10nFactory);
	}

	public static function languageProvider(): array {
		return [
			'plain pass-through' => ['en', 'en_US', 'en'],
			'German formal is treated as plain German' => ['de_DE', 'de_DE', 'de'],
			'es-419 is mapped to es-MX for COOL' => ['es_419', 'es_419', 'es-MX'],
			'Australian English' => ['en_GB', 'en_AU', 'en-AU'],
			'British English without Australian locale stays en-GB' => ['en_GB', 'en_GB', 'en-GB'],
			'Swiss German locale' => ['de', 'de_CH', 'de-CH'],
			'Swiss German (gsw locale)' => ['de', 'gsw', 'de-CH'],
			'Swiss German (gsw_CH locale)' => ['de', 'gsw_CH', 'de-CH'],
			'Swiss French locale' => ['fr', 'fr_CH', 'fr-CH'],
			'Swiss Italian locale' => ['it', 'it_CH', 'it-CH'],
			'German without Swiss locale stays de' => ['de', 'de_DE', 'de'],
		];
	}

	/**
	 * @dataProvider languageProvider
	 */
	public function testGetBCP47LanguageTag(string $languageCode, string $localeCode, string $expected): void {
		$this->l10n->method('getLanguageCode')->willReturn($languageCode);
		$this->l10n->method('getLocaleCode')->willReturn($localeCode);

		$this->assertSame($expected, $this->service->getBCP47LanguageTag());
	}
}
