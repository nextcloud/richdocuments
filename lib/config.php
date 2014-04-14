<?php

/**
 * ownCloud - Documents App
 *
 * @author Victor Dubiniuk
 * @copyright 2014 Victor Dubiniuk victor.dubiniuk@gmail.com
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later.
 */

namespace OCA\Documents;

class Config {
	const APP_NAME = 'documents';
	
	public static function getL10n(){
		return \OCP\Util::getL10N(self::APP_NAME);
	}
	
	public static function getConverter(){
		return self::getAppValue('converter', 'local');
	}
	
	public static function setConverter($value){
		return self::setAppValue('converter', $value);
	}
	
	public static function getConverterUrl(){
		return self::getAppValue('converter_url', 'http://localhost:16080');
	}
	
	public static function setConverterUrl($value){
		return self::setAppValue('converter_url', $value);
	}

	protected static function getAppValue($key, $default){
		return \OCP\Config::getAppValue(self::APP_NAME, $key, $default);
	}
	
	protected static function setAppValue($key, $value){
		return \OCP\Config::setAppValue(self::APP_NAME, $key, $value);
	}
	
}