<?php

/**
 * SPDX-FileCopyrightText: 2016 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\WOPI;

use Exception;
use OCA\Richdocuments\Service\DiscoveryService;
use OCP\Files\File;
use OCP\IL10N;
use OCP\IRequest;
use Psr\Log\LoggerInterface;
use SimpleXMLElement;

class Parser {

	public const ACTION_EDIT = 'edit';
	public const ACTION_VIEW = 'view';
	public const ACTION_EDITNEW = 'editnew';

	// https://wopi.readthedocs.io/en/latest/faq/languages.html
	public const SUPPORTED_LANGUAGES = [
		'af-ZA',
		'am-ET',
		'ar-SA',
		'as-IN',
		'az-Latn-AZ',
		'be-BY',
		'bg-BG',
		'bn-BD',
		'bn-IN',
		'bs-Latn-BA',
		'ca-ES',
		'ca-ES-valencia',
		'chr-Cher-US',
		'cs-CZ',
		'cy-GB',
		'da-DK',
		'de-DE',
		'el-GR',
		'en-gb',
		'en-US',
		'es-ES',
		'es-mx',
		'et-EE',
		'eu-ES',
		'fa-IR',
		'fi-FI',
		'fil-PH',
		'fr-ca',
		'fr-FR',
		'ga-IE',
		'gd-GB',
		'gl-ES',
		'gu-IN',
		'ha-Latn-NG',
		'he-IL',
		'hi-IN',
		'hr-HR',
		'hu-HU',
		'hy-AM',
		'id-ID',
		'is-IS',
		'it-IT',
		'ja-JP',
		'ka-GE',
		'kk-KZ',
		'km-KH',
		'kn-IN',
		'kok-IN',
		'ko-KR',
		'ky-KG',
		'lb-LU',
		'lo-la',
		'lt-LT',
		'lv-LV',
		'mi-NZ',
		'mk-MK',
		'ml-IN',
		'mn-MN',
		'mr-IN',
		'ms-MY',
		'mt-MT',
		'nb-NO',
		'ne-NP',
		'nl-NL',
		'nn-NO',
		'or-IN',
		'pa-IN',
		'pl-PL',
		'prs-AF',
		'pt-BR',
		'pt-PT',
		'quz-PE',
		'ro-Ro',
		'ru-Ru',
		'sd-Arab-PK',
		'si-LK',
		'sk-SK',
		'sl-SI',
		'sq-AL',
		'sr-Cyrl-BA',
		'sr-Cyrl-RS',
		'sr-Latn-RS',
		'sv-SE',
		'sw-KE',
		'ta-IN',
		'te-IN',
		'th-TH',
		'tk-TM',
		'tr-TR',
		'tt-RU',
		'ug-CN',
		'uk-UA',
		'ur-PK',
		'uz-Latn-UZ',
		'vi-VN',
		'zh-CN',
		'zh-TW'
	];

	private ?SimpleXMLElement $parsed = null;

	public function __construct(
		private DiscoveryService $discoveryService,
		private LoggerInterface $logger,
		private IL10N $l10n,
		private IRequest $request,
	) {
	}

	/**
	 * @throws Exception
	 */
	public function getUrlSrcValue(string $appName): string {
		$result = $this->getUrlSrc($appName)['urlsrc'];

		// Fix for potentially escaped urls that are misconfigured on the Collabora docker image
		// https://github.com/nextcloud/richdocuments/issues/3262
		$result = str_replace('\.', '.', $result);

		return (string)$result;
	}

	/**
	 * @throws Exception
	 */
	private function getUrlSrc(string $mimetype): array {
		$result = $this->getParsed()->xpath(sprintf('/wopi-discovery/net-zone/app[@name=\'%s\']/action', $mimetype));
		if ($result && count($result) > 0) {
			return [
				'urlsrc' => (string)$result[0]['urlsrc'],
				'action' => (string)$result[0]['name'],
			];
		}

		if ($this->getUrlSrcByExtension('internal-http', 'docx', 'edit')) {
			return [
				'urlsrc' => (string)$this->getUrlSrcByExtension('external-http', 'docx', 'edit'),
				'action' => 'edit',
			];
		}

		$this->logger->error('Didn\'t find urlsrc for mimetype {mimetype} in this WOPI discovery response', ['mimetype' => $mimetype]);
		throw new Exception('Could not find urlsrc for ' . $mimetype . ' in WOPI discovery response');
	}

	/**
	 * @return SimpleXMLElement|bool
	 * @throws \Exception
	 */
	public function getParsed() {
		if (!empty($this->parsed)) {
			return $this->parsed;
		}
		$discovery = $this->discoveryService->get();
		$discoveryParsed = simplexml_load_string($discovery);
		if ($discoveryParsed === false) {
			throw new Exception('Discovery response is not valid XML');
		}
		$this->parsed = $discoveryParsed;
		return $discoveryParsed;
	}

	public function getUrlSrcForFile(File $file, bool $edit = true): string {
		$protocol = $this->request->getServerProtocol();
		$fallbackProtocol = $protocol === 'https' ? 'http' : 'https';

		$netZones = [
			'external-' . $protocol,
			'internal-' . $protocol,
			'external-' . $fallbackProtocol,
			'internal-' . $fallbackProtocol,
		];

		$actions = [
			$edit && $file->getSize() === 0 ? self::ACTION_EDITNEW : null,
			$edit ? self::ACTION_EDIT : null,
			self::ACTION_VIEW,
		];
		$actions = array_filter($actions);

		foreach ($netZones as $netZone) {
			foreach ($actions as $action) {
				$result = $this->getUrlSrcByExtension($netZone, $file->getExtension(), $action);
				if ($result) {
					return $this->replaceUrlSrcParams($result);
				}
			}
		}

		foreach ($netZones as $netZone) {
			$result = $this->getUrlSrcByMimetype($netZone, $file->getMimeType());
			if ($result) {
				return $this->replaceUrlSrcParams($result);
			}
		}

		throw new \Exception('Could not find urlsrc in WOPI');
	}

	public function getUrlSrcByExtension(string $netZoneName, string $actionExt, $actionName): ?string {
		$result = $this->getParsed()->xpath(sprintf(
			'/wopi-discovery/net-zone[@name=\'%s\']/app/action[@ext=\'%s\' and @name=\'%s\']',
			$netZoneName, $actionExt, $actionName
		));

		if (!$result) {
			return null;
		}

		return (string)current($result)->attributes()['urlsrc'];
	}

	private function getUrlSrcByMimetype(string $netZoneName, string $mimetype): ?string {
		$result = $this->getParsed()->xpath(sprintf(
			'/wopi-discovery/net-zone[@name=\'%s\']/app[@name=\'%s\']/action',
			$netZoneName, $mimetype
		));

		if (!$result) {
			return null;
		}

		return (string)current($result)->attributes()['urlsrc'];
	}

	private function replaceUrlSrcParams(string $urlSrc): string {
		if (strpos($urlSrc, 'UI_LLCC') === false) {
			return $urlSrc;
		}

		$urlSrc = preg_replace('/<ui=UI_LLCC&>/', 'ui=' . $this->getLanguageCode() . '&', $urlSrc);
		return preg_replace('/<.+>/', '', $urlSrc);
	}

	private function getLanguageCode(): string {
		$languageCode = $this->l10n->getLanguageCode();
		$localeCode = $this->l10n->getLocaleCode();
		$splitLocale = explode('_', $localeCode);
		if (count($splitLocale) > 1) {
			$localeCode = $splitLocale[1];
		}

		$languageMatches = array_filter(self::SUPPORTED_LANGUAGES, function ($language) use ($languageCode, $localeCode) {
			return stripos($language, $languageCode) === 0;
		});

		// Unique match on the language
		if (count($languageMatches) === 1) {
			return array_shift($languageMatches);
		}
		$localeMatches = array_filter($languageMatches, function ($language) use ($languageCode, $localeCode) {
			return stripos($language, $languageCode . '-' . $localeCode) === 0;
		});

		// Matches with language and locale with region
		if (count($localeMatches) >= 1) {
			return array_shift($localeMatches);
		}

		// Fallback to first language match if multiple found and no fitting region is available
		if (count($languageMatches) > 1) {
			return array_shift($languageMatches);
		}

		return 'en-US';
	}
}
