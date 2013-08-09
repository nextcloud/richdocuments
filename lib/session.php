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
	
	public static function getSessionByOwnerAndGenesis($uid, $url){
		$query = \OCP\DB::prepare('SELECT * FROM `*PREFIX*office_session` WHERE `genesis_url`= ? AND `owner`= ? ');
		$result = $query->execute(array($url, $uid));
		return $result->fetchRow();
	}
	
	public static function addSession($genesis, $hash, $documentPath){
		$query = \OCP\DB::prepare('INSERT INTO `*PREFIX*office_session`  (`es_id`, `genesis_url`, `genesis_hash`, `owner`, `document_path`) VALUES (?, ?, ?, ?, ?) ');
		
		$data = array(
			'es_id' => self::getUniqueSessionId(),
			'genesis_url' => $genesis,
			'genesis_hash' => $hash,
			'owner' => \OCP\User::getUser(),
			'document_path' => $documentPath
		);
		$result = $query->execute(array_values($data));
		
		if ($result){
			return $data;
		}
		return false;
	}
	
	protected static function getUniqueSessionId(){
		do {
			$id = \OC_Util::generate_random_bytes(30);
		} while (self::getSession($id));
		
		return $id;
	}
	
}
