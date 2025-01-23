<?php
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\WOPI;

use InvalidArgumentException;

/*
* SettingsUrl is used to handle setting type, category and filename.
*/

class SettingsUrl {
	private string $type;
	private string $category;
	private string $fileName;
	private string $rawUrl;

	public function __construct(string $url) {
		$this->rawUrl = $url;
		$this->parseUrl($url);
	}

	/**
	 * Factory method to create a SettingsUrl instance based on individual parameters.
	 */
	public static function fromComponents(string $type, string $category, string $fileName): self {
		$rawUrl = "settings/$type/$category/$fileName";
		return new self($rawUrl);
	}

	/**
	 * Parses the settings URL and extracts type, category, and filename.
	 *
	 * @param string $url The settings URL to parse.
	 * @throws InvalidArgumentException If the URL is invalid or incorrectly formatted.
	 */
	private function parseUrl(string $url): void {
		$decodedUrl = urldecode($url);
		
		$parsedUrl = parse_url($decodedUrl);
		if (!isset($parsedUrl['path'])) {
			throw new InvalidArgumentException('Invalid URL: Path not found.');
		}

		$path = $parsedUrl['path'];

		$settingsIndex = strpos($path, '/settings/');
		if ($settingsIndex === false) {
			throw new InvalidArgumentException("Invalid settings URL format: '/settings/' segment missing.");
		}

		$relevantPath = substr($path, $settingsIndex + strlen('/settings/'));

		$pathParts = explode('/', $relevantPath);

		if (count($pathParts) < 3) {
			throw new InvalidArgumentException("Invalid settings URL format: Expected 'type/category/fileName'.");
		}

		$this->type = $pathParts[0];
		$this->category = $pathParts[1];
		$this->fileName = implode('/', array_slice($pathParts, 2));
	}

	/**
	 * Get the setting type from the URL.
	 *
	 * @return string
	 */
	public function getType(): string {
		return $this->type;
	}

	/**
	 * Get the setting category from the URL.
	 *
	 * @return string
	 */
	public function getCategory(): string {
		return $this->category;
	}

	/**
	 * Get the original filename from the URL.
	 *
	 * @return string
	 */
	public function getFileName(): string {
		return $this->fileName;
	}

	/**
	 * Get the raw URL.
	 *
	 * @return string
	 */
	public function getRawUrl(): string {
		return $this->rawUrl;
	}
}
