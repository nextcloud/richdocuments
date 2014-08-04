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

namespace OCA\Documents\Db;

/**
 *  Session management
 * 
 * @method string getEsId()
 * @method int getFileId()
 * @method string getGenesisUrl()
 * @method string getOwner()
 * @method string getGenesisHash()
 * 
 */
class Session extends \OCA\Documents\Db {

	/**
	 * DB table
	 */
	const DB_TABLE = '`*PREFIX*documents_session`';
	protected $tableName  = '`*PREFIX*documents_session`';

	protected $insertStatement  = 'INSERT INTO `*PREFIX*documents_session` (`es_id`, `genesis_url`, `genesis_hash`, `owner`, `file_id`)
			VALUES (?, ?, ?, ?, ?)';
	
	protected $loadStatement = 'SELECT * FROM `*PREFIX*documents_session` WHERE `es_id`= ?';

	/**
	 * Start a editing session or return an existing one
	 * @param string $uid of the user starting a session
	 * @param \OCA\Documents\File $file - file object
	 * @return array
	 * @throws \Exception
	 */
	public static function start($uid, $file){
		// Create a directory to store genesis
		$genesis = new \OCA\Documents\Genesis($file);
		
		list($ownerView, $path) = $file->getOwnerViewAndPath();
		$oldSession = new Session();
		$oldSession->loadBy('file_id', $file->getFileId());
		
		//If there is no existing session we need to start a new one
		if (!$oldSession->hasData()){
			$newSession = new Session(array(
				$genesis->getPath(),
				$genesis->getHash(),
				$file->getOwner(),
				$file->getFileId()
			));
			
			if (!$newSession->insert()){
				throw new \Exception('Failed to add session into database');
			}
		}
		
		$sessionData = $oldSession
					->loadBy('file_id', $file->getFileId())
					->getData()
		;
		
		$memberColor = \OCA\Documents\Helper::getMemberColor($uid);
		$member = new \OCA\Documents\Db\Member(array(
			$sessionData['es_id'], 
			$uid,
			$memberColor,
			time(),
			intval($file->isPublicShare()),
			$file->getToken()
		));
		
		if ($member->insert()){
			// Do we have OC_Avatar in out disposal?
			if (!class_exists('\OC_Avatar') || \OC_Config::getValue('enable_avatars', true) !== true){
				$imageUrl = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw==';
			} else {
				$imageUrl = $uid;
			}

			$displayName = $file->isPublicShare() ? $uid . ' ' . \OCA\Documents\Db\Member::getGuestPostfix() : \OCP\User::getDisplayName($uid);
			
			$sessionData['member_id'] = (string) $member->getLastInsertId();
			$op = new \OCA\Documents\Db\Op();
			$op->addMember(
					$sessionData['es_id'],
					$sessionData['member_id'],
					$displayName,
					$memberColor,
					$imageUrl
			);
		} else {
			throw new \Exception('Failed to add member into database');
		}
		
		$sessionData['title'] = basename($path);
		$sessionData['permissions'] = $ownerView->getFilePermissions($path);
		
		return $sessionData;
	}
	
	public static function cleanUp($esId){
		$session = new Session();
		$session->deleteBy('es_id', $esId);
		
		$member = new \OCA\Documents\Db\Member();
		$member->deleteBy('es_id', $esId);
		
		$op= new \OCA\Documents\Db\Op();
		$op->deleteBy('es_id', $esId);
	}
	
	public function insert(){
		$esId = $this->getUniqueSessionId();
		array_unshift($this->data, $esId);
		return parent::insert($this->data);
	}
	
	public function updateGenesisHash($esId, $genesisHash){
		return $this->execute(
			'UPDATE `*PREFIX*documents_session` SET `genesis_hash`=? WHERE `es_id`=?',
			array(
				$genesisHash, $esId
			)
		);
	}

	public function getInfo($esId){
		$result = $this->execute('
			SELECT `s`.*, COUNT(`m`.`member_id`) AS `users`
			FROM ' . $this->tableName . ' AS `s`
			LEFT JOIN `*PREFIX*documents_member` AS `m` ON `s`.`es_id`=`m`.`es_id`
				AND `m`.`status`=' . Db\Member::MEMBER_STATUS_ACTIVE . '
				AND `m`.`uid` != ?
			WHERE `s`.`es_id` = ?
			GROUP BY `m`.`es_id`
			',
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

	public function getInfoByFileId($fileIds){
		if (!is_array($fileIds)){
			return array();
		}

		$stmt = $this->buildInQuery('file_id', $fileIds);

		$result = $this->execute('
			SELECT `s`.*, COUNT(`m`.`member_id`) AS `users`
			FROM ' . $this->tableName . ' AS `s`
			LEFT JOIN `*PREFIX*documents_member` AS `m` ON `s`.`es_id`=`m`.`es_id`
				AND `m`.`status`=' . Db\Member::MEMBER_STATUS_ACTIVE . '
			WHERE `s`.`file_id` ' . $stmt .'
			GROUP BY `m`.`es_id`',
			$fileIds
		);

		$info = $result->fetchAll();
		if (!is_array($info)){
			$info = array();
		}
		return $info;
	}

	protected function getUniqueSessionId(){
		$testSession = new Session();
		do{
			$id = \OC_Util::generateRandomBytes(30);
		} while ($testSession->load($id)->hasData());

		return $id;
	}
}
