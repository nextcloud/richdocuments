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

	 public static function read($content, $mimetype){
		$data = array(
			'mimetype' => $mimetype,
			'content' => $content
		);
		
		\OCP\Util::emitHook('\OCA\Documents\Filter', 'read', $data);
		return $data;
	 }
	 
	 public static function write($content, $mimetype){
		$data = array(
			'mimetype' => $mimetype,
			'content' => $content
		);
		
		\OCP\Util::emitHook('\OCA\Documents\Filter', 'write', $data);
		return $data;
	 }
	 
 }
 