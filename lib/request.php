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

class Request {
	protected $data = array();
	
	protected $rawRequest = '';
	
	public function __construct(){
		$this->rawRequest = file_get_contents('php://input');
		$this->data = json_decode($this->rawRequest, true);
	}
	
	public function getRawRequest(){
		return $this->rawRequest;
	}

	public function getParam($name){
		if (empty($name)){
			return $this->data;
		}
		
		$path = explode('/', $name);
		
		reset($path);
		$index = current($path);
		$param = $this->data;
		do {
			if (!array_key_exists($index, $param)){
				return null;
			}
			$param = $param[$index];
		} while (($index = next($path)) !== false);

		return $param;
	}
}
	