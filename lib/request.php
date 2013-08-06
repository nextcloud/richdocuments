<?php

namespace OCA\Office;

class Request {
	protected $data = array();
	
	public function __construct(){
		$this->data = json_decode(file_get_contents('php://input'), true);
	}
	public function getParam($name){
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
	