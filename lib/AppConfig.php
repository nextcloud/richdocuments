<?php
/**
 * ownCloud - Richdocuments App
 *
 * @author Victor Dubiniuk
 * @copyright 2015 Victor Dubiniuk victor.dubiniuk@gmail.com
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later.
 */

namespace OCA\Richdocuments;

use OCA\Richdocuments\AppInfo\Application;
use \OCP\IConfig;

class AppConfig{
	private $defaults = [
		'wopi_url' => 'https://localhost:9980',
		'watermark_text' => '{userId}',
		'watermark_allGroupsList' => [],
		'watermark_allTagsList' => [],
		'watermark_linkTagsList' => [],

	];

	const APP_SETTING_TYPES = [
			'watermark_allGroupsList' => 'array',
			'watermark_allTagsList' => 'array',
			'watermark_linkTagsList' => 'array'
		];

	/** @var IConfig */
	private $config;

	public function __construct(IConfig $config) {
		$this->config = $config;
	}

	/**
	 * Get a value by key
	 * @param string $key
	 * @return string
	 */
	public function getAppValue($key) {
		$defaultValue = null;
		if (array_key_exists($key, $this->defaults)){
			$defaultValue = $this->defaults[$key];
		}
		return $this->config->getAppValue(Application::APPNAME, $key, $defaultValue);
	}

	/**
	 * @param $key
	 * @return array
	 */
	public function getAppValueArray($key) {
		$value = $this->config->getAppValue(Application::APPNAME, $key, []);
		if (self::APP_SETTING_TYPES[$key] === 'array') {
			$value = $value !== '' ? explode(',', $value) : [];
		}
		return $value;
	}

	/**
	 * Set a value by key
	 * @param string $key
	 * @param string $value
	 * @return void
	 */
	public function setAppValue($key, $value) {
		$this->config->setAppValue(Application::APPNAME, $key, $value);
	}

	/**
	 * Get all app settings
	 * @return array
	 */
	public function getAppSettings() {
		$result = [];
		$keys = $this->config->getAppKeys('richdocuments');
		foreach ($keys as $key) {
			$value = $this->getAppValueArray($key);
			$value = $value === 'yes' ? true : $value;
			$result[$key] = $value === 'no' ? false : $value;
		}
		return $result;
	}

 }
