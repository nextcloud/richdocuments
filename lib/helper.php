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
	
	public static function getRandomColor(){
		$str = dechex(floor(rand(0, 16777215)));
		$str = str_pad($str, 6, "0", STR_PAD_LEFT);
		return '#' . $str;
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