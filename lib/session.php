<?php
/**
 * ownCloud - Office App
 *
 * @author Victor Dubiniuk
 * @copyright 2013 Victor Dubiniuk victor.dubiniuk@gmail.com
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later.
 */

namespace OCA\Office;

class Session {
	
	public static function getAllSessions(){
		$query = \OCP\DB::prepare('SELECT * FROM `*PREFIX*office_session`');
		$result = $query->execute();
		return $result->fetchAll();
	}
	
	public static function getSession($id){
		$query = \OCP\DB::prepare('SELECT * FROM `*PREFIX*office_session` WHERE `es_id`= ?');
		$result = $query->execute(array($id));
		return $result->fetchRow();
	}
	
	public static function getSessionByPath($url){
		$query = \OCP\DB::prepare('SELECT * FROM `*PREFIX*office_session` WHERE `genesis_url`= ?');
		$result = $query->execute(array($url));
		return $result->fetchRow();
	}
	
	public static function addSession($genesis, $hash){
		$query = \OCP\DB::prepare('INSERT INTO `*PREFIX*office_session`  (`es_id`, `genesis_url`, `genesis_hash`, `owner`) VALUES (?, ?, ?, ?) ');
		
		$data = array(
			self::getSessionId(),
			$genesis,
			$hash,
			\OCP\User::getUser()
		);
		$result = $query->execute($data);
		
		if ($result){
			return $data;
		}
		return false;
	}
	
	protected static function getSessionId(){
		return  (string) time();
	}
	
}
