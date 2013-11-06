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

/**
 *  Session management 
 */
class Db_Session extends \OCA\Documents\Db {

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
	public static function start($uid, File $file){
		list($ownerView, $path) = $file->getOwnerViewAndPath();
		
		// Create a directory to store genesis
		$docView = $ownerView->initDocumentsView();
		
		$oldSession = new Db_Session();
		$oldSession->loadBy('file_id', $file->getFileId());
		
		//If there is no existing session we need to start a new one
		if (!$oldSession->hasData()){

			//TODO: check if genesis document is a valid odt
			$genesisPath = $ownerView->storeDocument(
							$file->getOwner(), 
							$path
			);
			
			if (!$genesisPath){
				throw new \Exception('Unable to copy document. Check permissions and make sure you have enought free space.');
			}

			$hash = $ownerView->getHashByGenesis($file->getOwner(), $genesisPath);
			
			$newSession = new Db_Session(array(
				$genesisPath, $hash, $file->getOwner(), $file->getFileId()
			));
			
			if (!$newSession->insert()){
				throw new \Exception('Failed to add session into database');
			}
		}
		
		$session = $oldSession
					->loadBy('file_id', $file->getFileId())
					->getData()
				;
		
		$member = new Db_Member(array(
			$session['es_id'], 
			$uid, 
			Helper::getRandomColor(),
			time()
		));
		if ($member->insert()){
			$session['member_id'] = (string) $member->getLastInsertId();
		} else {
			throw new \Exception('Failed to add member into database');
		}
		
		$session['permissions'] = $ownerView->getFilePermissions($path);
		
		return $session;
	}
	
	public static function cleanUp($esId){
		$session = new Db_Session();
		$session->deleteBy('es_id', $esId);
		
		$member = new Db_Member();
		$member->deleteBy('es_id', $esId);
		
		$op= new Db_Op();
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
				$esId, $genesisHash
			)
		);
	}

	public function getInfo($esId){
		$result = $this->execute('
			SELECT `s`.*, COUNT(`m`.`member_id`) AS `users`
			FROM ' . $this->tableName . ' AS `s`
			LEFT JOIN `*PREFIX*documents_member` AS `m` ON `s`.`es_id`=`m`.`es_id`
				AND `m`.`status`=' . Db_Member::MEMBER_STATUS_ACTIVE . '
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
				AND `m`.`status`=' . Db_Member::MEMBER_STATUS_ACTIVE . '
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
		$testSession = new Db_Session();
		do{
			// this prevents branching for stable5 for now:
			// OC_Util::generate_random_bytes was camelCased
			if (method_exists('\OC_Util', 'generate_random_bytes')){
				$id = \OC_Util::generate_random_bytes(30);
			} else {
				$id = \OC_Util::generateRandomBytes(30);
			}
		}while ($testSession->load($id)->hasData());

		return $id;
	}
}
