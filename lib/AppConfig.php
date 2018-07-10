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
		'wopi_url' => 'https://localhost:9980'
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
	 * Set a value by key
	 * @param string $key
	 * @param string $value
	 * @return void
	 */
	public function setAppValue($key, $value) {
		$this->config->setAppValue(Application::APPNAME, $key, $value);
	}
 }
