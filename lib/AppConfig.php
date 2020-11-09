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

class AppConfig {

	private $defaults = [
		'wopi_url' => '',
		'timeout' => 15,
		'watermark_text' => '{userId}',
		'watermark_allGroupsList' => [],
		'watermark_allTagsList' => [],
		'watermark_linkTagsList' => [],

	];

	const WATERMARK_APP_NAMESPACE = 'files';

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

	public function getAppNamespace($key) {
		if (strpos($key, 'watermark_') === 0) {
			return self::WATERMARK_APP_NAMESPACE;
		}
		return Application::APPNAME;
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
		return $this->config->getAppValue($this->getAppNamespace($key), $key, $defaultValue);
	}

	/**
	 * @param $key
	 * @return array
	 */
	public function getAppValueArray($key) {
		$value = $this->config->getAppValue($this->getAppNamespace($key), $key, []);
		if (array_key_exists($key, self::APP_SETTING_TYPES) && self::APP_SETTING_TYPES[$key] === 'array') {
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
		$this->config->setAppValue($this->getAppNamespace($key), $key, $value);
	}

	/**
	 * Get all app settings
	 * @return array
	 */
	public function getAppSettings() {
		$result = [];
		$keys = $this->config->getAppKeys(Application::APPNAME);
		foreach ($keys as $key) {
			$value = $this->getAppValueArray($key);
			$value = $value === 'yes' ? true : $value;
			$result[$key] = $value === 'no' ? false : $value;
		}

		$keys = $this->config->getAppKeys(self::WATERMARK_APP_NAMESPACE);
		foreach ($keys as $key) {
			if (strpos($key, 'watermark_') === 0) {
				$value = $this->getAppValueArray($key);
				$value = $value === 'yes' ? true : $value;
				$result[$key] = $value === 'no' ? false : $value;
			}
		}
		return $result;
	}

 }
