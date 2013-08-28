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

class Session {
	
	public static function add($genesis, $hash, $fileId){
		$query = \OCP\DB::prepare('
			INSERT INTO `*PREFIX*documents_session` (`es_id`, `genesis_url`, `genesis_hash`, `owner`, `file_id`)
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
		$query = \OCP\DB::prepare('SELECT * FROM `*PREFIX*documents_session`');
		$result = $query->execute();
		return $result->fetchAll();
	}
	
	public static function getSession($id){
		$query = \OCP\DB::prepare('SELECT * FROM `*PREFIX*documents_session` WHERE `es_id`= ?');
		$result = $query->execute(array($id));
		return $result->fetchRow();
	}
	
	public static function getInfo($esId){

		$query = \OCP\DB::prepare('
			SELECT `s`.*, COUNT(`m`.`member_id`) AS `users`
			FROM `*PREFIX*documents_session` AS `s`
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
		$query = \OCP\DB::prepare('SELECT * FROM `*PREFIX*documents_session` WHERE `file_id`= ?');
		$result = $query->execute(array($fileId));
		return $result->fetchRow();
	}
	
	public static function getInfoByFileid($fileIds){
		$fileIdCount = count($fileIds);
		if (!$fileIdCount || !is_array($fileIds)){
			return array();
		}
		
		$placeholders = array_fill(0, $fileIdCount, '?');
		$stmt = implode(', ', $placeholders);
		$query = \OCP\DB::prepare('
			SELECT `s`.*, COUNT(`m`.`member_id`) AS `users`
			FROM `*PREFIX*documents_session` AS `s`
			LEFT JOIN `*PREFIX*documents_member` AS `m` ON `s`.`es_id`=`m`.`es_id`
				AND `m`.`status`='. Member::MEMBER_STATUS_ACTIVE .'
				AND `m`.`uid` != ?
			WHERE `s`.`file_id` IN (' . $stmt .')
			GROUP BY `m`.`es_id`
			');
		$result = $query->execute(
			array_merge(array(\OCP\User::getUser()), $fileIds)
		);
		
		$info = $result->fetchAll();
		if (!is_array($info)){
			$info = array();
		}
		return $info;
	}

	protected static function getUniqueSessionId(){
		do {
			$id = \OC_Util::generate_random_bytes(30);
		} while (self::getSession($id));
		
		return $id;
	}
	
}
