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

class Session extends Db{
	const DB_TABLE = '`*PREFIX*documents_session`';
	
	public static function add($genesis, $hash, $fileId){
		$query = \OCP\DB::prepare('
			INSERT INTO ' . self::DB_TABLE . ' (`es_id`, `genesis_url`, `genesis_hash`, `owner`, `file_id`)
			VALUES (?, ?, ?, ?, ?)
			');
		
		$data = array(
			'es_id' => self::getUniqueSessionId(),
			'genesis_url' => $genesis,
			'genesis_hash' => $hash,
			'owner' => \OCP\User::getUser(),
			'file_id' => $fileId
		);
		$result = $query->execute(array_values($data));
		
		if ($result){
			return $data;
		}
		
		return false;
	}
	
	public static function getAll(){
		$query = \OCP\DB::prepare('SELECT * FROM ' . self::DB_TABLE);
		$result = $query->execute();
		return $result->fetchAll();
	}
	
	public static function getSession($id){
		$query = \OCP\DB::prepare('SELECT * FROM ' . self::DB_TABLE . ' WHERE `es_id`= ?');
		$result = $query->execute(array($id));
		return $result->fetchRow();
	}
	
	public static function getInfo($esId){

		$query = \OCP\DB::prepare('
			SELECT `s`.*, COUNT(`m`.`member_id`) AS `users`
			FROM ' . self::DB_TABLE . ' AS `s`
			LEFT JOIN `*PREFIX*documents_member` AS `m` ON `s`.`es_id`=`m`.`es_id`
				AND `m`.`status`='. Member::MEMBER_STATUS_ACTIVE .'
				AND `m`.`uid` != ?
			WHERE `s`.`es_id` = ?
			GROUP BY `m`.`es_id`
			');
		$result = $query->execute(
			array(
				\OCP\User::getUser(), 
				$esId
				)
		);
		
		$info = $result->fetchRow();
		if (!is_array($info)){
			$info = array();
		}
		return $info;
	}

	public static function getSessionByFileId($fileId){
		$sessions = self::getSessionsByFileIds(array($fileId));
		if (count($sessions) > 1) {
			Helper::errorLog('documents','more than one session found for file id ' . $fileId);
		}
		
		if (count($sessions)) {
			return $sessions[0];
		}
		
		return null;
	}
	
	public static function getSessionsByFileIds($fileIds){
		if (!is_array($fileIds)){
			$fileIds = array($fileIds);
		}
		
		$stmt = self::buildPlaceholders($fileIds);
		$query = \OCP\DB::prepare('SELECT * FROM ' . self::DB_TABLE . ' WHERE `file_id` IN (' . $stmt .')');
		$result = $query->execute($fileIds);
		$sessions = $result->fetchAll();
		if (!is_array($sessions)){
			$sessions = array();
		}
		return $sessions;
	}
	
	public static function getInfoByFileid($fileIds){
		if (!is_array($fileIds)){
			return array();
		}
		
		$stmt = self::buildPlaceholders($fileIds);
		if (!$stmt){
			return array();
		}
		
		$query = \OCP\DB::prepare('
			SELECT `s`.*, COUNT(`m`.`member_id`) AS `users`
			FROM ' . self::DB_TABLE . ' AS `s`
			LEFT JOIN `*PREFIX*documents_member` AS `m` ON `s`.`es_id`=`m`.`es_id`
				AND `m`.`status`='. Member::MEMBER_STATUS_ACTIVE .'
			WHERE `s`.`file_id` IN (' . $stmt .')
			GROUP BY `m`.`es_id`
			');
		$result = $query->execute($fileIds);
		
		$info = $result->fetchAll();
		if (!is_array($info)){
			$info = array();
		}
		return $info;
	}
	
	public static function deleteByFileid($fileId){
		$query = \OCP\DB::prepare('DELETE FROM ' . self::DB_TABLE . ' WHERE `file_id` = ?');
		$query->execute(array($fileId));
	}

	protected static function getUniqueSessionId(){
		do {
			$id = \OC_Util::generate_random_bytes(30);
		} while (self::getSession($id));
		
		return $id;
	}
	
}
