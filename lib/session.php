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

class Session extends Db {

	const DB_TABLE = '`*PREFIX*documents_session`';

	public static function start($uid, File $file){
		list($ownerView, $path) = $file->getOwnerViewAndPath();
		$session = Session::getSessionByFileId( $file->getFileId() );

		//If there is no existing session we need to start a new one
		if (!$session || empty($session)){

			$genesisPath = $ownerView->storeDocument($ownerView, $path);

			if (!$genesisPath){
				throw new \Exception('Unable to copy document. Check permissions and make sure you have enought free space.');
			}

			$hash = $ownerView->getHashByGenesis($genesisPath);
			$session = Session::add(
				$genesisPath, $hash, $file->getOwner(), $file->getFileId()
			);
		}

		$session['permissions'] = $ownerView->getFilePermissions($path);
		$session['member_id'] = (string) Member::add($session['es_id'], $uid, Helper::getRandomColor());
		
		return $session;
	}

	public static function add($genesis, $hash, $owner, $fileId){
		$query = \OCP\DB::prepare('
			INSERT INTO ' . self::DB_TABLE . ' (`es_id`, `genesis_url`, `genesis_hash`, `owner`, `file_id`)
			VALUES (?, ?, ?, ?, ?)
			');

		$data = array(
			'es_id' => self::getUniqueSessionId(),
			'genesis_url' => $genesis,
			'genesis_hash' => $hash,
			'owner' => $owner,
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
				AND `m`.`status`=' . Member::MEMBER_STATUS_ACTIVE . '
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
		if (count($sessions) > 1){
			Helper::errorLog('documents', 'more than one session found for file id ' . $fileId);
		}

		if (count($sessions)){
			return $sessions[0];
		}

		return null;
	}

	public static function getSessionsByFileIds($fileIds){
		if (!is_array($fileIds)){
			$fileIds = array($fileIds);
		}

		$stmt = self::buildPlaceholders($fileIds);
		$query = \OCP\DB::prepare('SELECT * FROM ' . self::DB_TABLE . ' WHERE `file_id` IN (' . $stmt . ')');
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
				AND `m`.`status`=' . Member::MEMBER_STATUS_ACTIVE . '
			WHERE `s`.`file_id` IN (' . $stmt . ')
			GROUP BY `m`.`es_id`
			');
		$result = $query->execute($fileIds);

		$info = $result->fetchAll();
		if (!is_array($info)){
			$info = array();
		}
		return $info;
	}

	public static function cleanUp($esId){
		self::delete($esId);
		Member::deleteBySessionId($esId);
		Op::deleteBySessionId($esId);
	}

	public static function delete($esId){
		$query = \OCP\DB::prepare('DELETE FROM ' . self::DB_TABLE . ' WHERE `es_id` = ?');
		$query->execute(array($esId));
	}

	protected static function getUniqueSessionId(){
		do{
			// this prevents branching for stable5 for now:
			// OC_Util::generate_random_bytes was camelCased
			if (method_exists('\OC_Util', 'generate_random_bytes')){
				$id = \OC_Util::generate_random_bytes(30);
			} else {
				$id = \OC_Util::generateRandomBytes(30);
			}
		}while (self::getSession($id));

		return $id;
	}

}
