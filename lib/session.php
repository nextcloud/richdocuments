<?php

namespace OCA\Office;

class Session {
	public static function getSession($id){
		$query = \OCP\DB::prepare('SELECT * FROM `*PREFIX*office_session` WHERE `es_id`= ?');
		$result = $query->execute(array($id));
		return $result->fetchRow();
	}
	
	public static function getSessionByUrl($url){
		$query = \OCP\DB::prepare('SELECT * FROM `*PREFIX*office_session` WHERE `genesis_url`= ?');
		$result = $query->execute(array($url));
		return $result->fetchRow();
	}
	
	public static function addSession($genesis){
		$query = \OCP\DB::prepare('INSERT INTO `*PREFIX*office_session`  (`es_id`, `genesis_url`, `genesis_hash`, `owner`) VALUES (?, ?, ?, ?) ');
		
		$data = array(
			self::getSessionId(),
			$genesis,
			self::getHash($genesis),
			\OCP\User::getUser()
		);
		$result = $query->execute($data);
		
		if ($result){
			return $data;
		}
		return false;
	}
	
	public static function setMockSession(){
		//self::addSession('/welcome.odt');
	}
	protected static function getSessionId(){
		return  (string) time();
	}
	
	protected static function getHash($genesis){
		return '0xdeadbeef';
	}
}
