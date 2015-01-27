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

 class Filter {
	protected static $filters = array();
	 
	public static function add($mimetype, $class){
		 self::$filters[$mimetype] = $class;
	}

	public static function read($content, $mimetype){
		$data = array(
			'mimetype' => $mimetype,
			'content' => $content
		);

		if (isset(self::$filters[$mimetype])){
			$data = call_user_func(
					array(
						self::$filters[$mimetype],
						'read'
					),
					$data
			);
		}
		
		return $data;
	}
	 
	public static function write($content, $mimetype){
		$data = array(
			'mimetype' => $mimetype,
			'content' => $content
		);
		
		if (isset(self::$filters[$mimetype])){
			$data = call_user_func(
					array(
						self::$filters[$mimetype],
						'write'
					),
					$data
			);
		}
		
		return $data;
	}
	 
	public static function getAll(){
		 return array_keys(self::$filters);
	}
	 
	/**
	 * Checks if mimetype is supported by the app
	 * @param string $mimetype - checked mimetype
	 * @return bool
	 */
	public static function isSupportedMimetype($mimetype){
		return in_array($mimetype, Storage::getSupportedMimetypes());
	} 
}

 