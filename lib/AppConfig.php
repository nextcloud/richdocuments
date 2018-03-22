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

use \OCP\IConfig;

class AppConfig{
	private $appName = 'richdocuments';
	private $defaults = [
		'wopi_url' => 'https://localhost:9980'
	];

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
		return $this->config->getAppValue($this->appName, $key, $defaultValue);
	}

	/**
	 * Set a value by key
	 * @param string $key
	 * @param string $value
	 * @return string
	 */
	public function setAppValue($key, $value) {
		return $this->config->setAppValue($this->appName, $key, $value);
	}

	/**
	 * Get a value by key for a user
	 * @param string $userId
	 * @param string $key
	 * @return string
	 */
	public function getUserValue($userId, $key) {
		$defaultValue = null;
		if (array_key_exists($key, $this->defaults)){
			$defaultValue = $this->defaults[$key];
		}
		return $this->config->getUserValue($userId, $this->appName, $key, $defaultValue);
	}

	/**
	 * Set a value by key for a user
	 * @param string $userId
	 * @param string $key
	 * @param string $value
	 * @return string
	 */
	public function setUserValue($userId, $key, $value) {
		return $this->config->setAppValue($userId, $this->appName, $key, $value);
	}
 }
