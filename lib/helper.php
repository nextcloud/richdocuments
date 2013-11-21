<?php
/**
 * ownCloud - Documents App
 *
 * @author Victor Dubiniuk
 * @copyright 2013 Victor Dubiniuk victor.dubiniuk@gmail.com
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later.
 */

namespace OCA\Documents;

class Helper{
	
	const APP_ID = 'documents';
	
	public static function getNewFileName($view, $path, $prepend = ' '){
		$fileNum = 1;
		
		while ($view->file_exists($path)){
			$fileNum += 1;
			$path = preg_replace('/(\.odt|' . $prepend . '\(\d+\)\.odt)$/', $prepend . '(' .$fileNum . ').odt', $path);
		};
		
		return $path;
	}
	
	public static function isVersionsEnabled(){
		return \OCP\App::isEnabled('files_versions');
	}
	
	public static function getRandomColor(){
		$str = dechex(floor(rand(0, 16777215)));
		return '#' . str_pad($str, 6, "0", STR_PAD_LEFT);
	}
	
	public static  function debugLog($message){
		self::log($message, \OCP\Util::DEBUG);
	}

	public static  function warnLog($message){
		self::log($message, \OCP\Util::WARN);
	}

	public static  function errorLog($message){
		self::log($message, \OCP\Util::ERROR);
	}
	
	public static function log($message, $level){
		\OCP\Util::writeLog(self::APP_ID, $message, $level);
	}
}