<?php

namespace OCA\Office;

class Session {
	public static function getSession($id){
		$query = \OCP\DB::prepare('SELECT * FROM `*PREFIX*office_session` WHERE `es_id`= ?');
		$result = $query->execute(array($id));
		return $result->fetchRow();
	}
	
	public function setMockSession(){
		$query = \OCP\DB::prepare('INSERT INTO `*PREFIX*office_session`  (`es_id`, `genesis_url`, `genesis_hash`, `owner`) VALUES (?, ?, ?, ?) ');
		$result = $query->execute(array(
			'dev0',
			'/welcome.odt',
			'0xdeadbeef',
			\OCP\User::getUser()
		));
	}
}
