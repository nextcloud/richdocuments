<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Service;

use OCA\Richdocuments\AppInfo\Application;
use OCP\L10N\IFactory;

class LanguageService {
	private const LOCALE_OVERRIDES = [
		'de' => [
			'de_CH' => 'de-CH',
			'gsw' => 'de-CH',
			'gsw_CH' => 'de-CH',
		],
		'fr' => [
			'fr_CH' => 'fr-CH',
		],
		'it' => [
			'it_CH' => 'it-CH',
		],
	];

	public function __construct(
		private IFactory $l10nFactory,
	) {
	}

	/**
	 * Converts the current user's Nextcloud language/locale settings into the
	 * BCP 47 language tag Collabora Online expects.
	 */
	public function getBCP47LanguageTag(): string {
		$l10n = $this->l10nFactory->get(Application::APPNAME);

		// getLanguageCode()/getLocaleCode() mirror @nextcloud/l10n's getLanguage()/getLocale()
		$language = str_replace('_', '-', $l10n->getLanguageCode());
		$locale = $l10n->getLocaleCode();

		$language = match ($language) {
			'de-DE' => 'de', // German formal should just be treated as 'de'
			'es-419' => 'es-MX', // not a valid locale string in COOL
			default => $language,
		};

		if ($language === 'en-GB' && $locale === 'en_AU') {
			$language = 'en-AU';
		}

		return self::LOCALE_OVERRIDES[$language][$locale] ?? $language;
	}
}
