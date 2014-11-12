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

class Op extends \OCA\Documents\Db {

	const DB_TABLE = '`*PREFIX*documents_op`';
	
	protected $tableName = '`*PREFIX*documents_op`';
	
	protected $insertStatement = 'INSERT INTO `*PREFIX*documents_op` (`es_id`, `optype`, `member`, `opspec`) VALUES (?, ?, ?, ?)';

	public static function addOpsArray($esId, $memberId, $ops){
		$lastSeq = "";
		$opObj = new Op();
		foreach ($ops as $op) {
			$opObj->setData(array(
				$esId,
				$op['optype'],
				$memberId,
				json_encode($op)
			));
			$opObj->insert();
			$lastSeq = $opObj->getLastInsertId();
		}
		return $lastSeq;
	}
	
	/**
	 * @returns "" when there are no Ops, or the seq of the last Op
	 */
	public function getHeadSeq($esId){
		$query = \OCP\DB::prepare('
			SELECT `seq`
			FROM ' . $this->tableName . '
			WHERE `es_id`=?
			ORDER BY `seq` DESC
			', 1);
		$result = $query->execute(array(
				$esId
			))
			->fetchOne()	
		;
		return !$result ? "" : $result;
	}
	
	public function getOpsAfterJson($esId, $seq){
		$ops = $this->getOpsAfter($esId, $seq);
		if (!is_array($ops)){
			$ops = array();
		}
		$ops =  array_map(
				function($x){
					$decoded = json_decode($x['opspec'], true);
					$decoded['memberid'] = strval($decoded['memberid']);
					return $decoded;
				}, 
				$ops
		);
		return $ops;
	}
	
	public function getOpsAfter($esId, $seq){
		if ($seq == ""){
			$seq = -1;
		}
		$query = \OCP\DB::prepare('
			SELECT `opspec`
			FROM ' . self::DB_TABLE . '
			WHERE `es_id`=?
				AND `seq`>?
			ORDER BY `seq` ASC
			');
		$result = $query->execute(array($esId, $seq));
		return $result->fetchAll();
	}
	
	public function addMember($esId, $memberId, $fullName, $color, $imageUrl){
		$op = array(
			'optype' => 'AddMember',
			'memberid' => (string) $memberId,
			'timestamp' => (string) time(),
			'setProperties' => array(
				'fullName' => $fullName,
				'color' => $color,
				'imageUrl' => $imageUrl
			)
		);
		$this->insertOp($esId, $memberId, $op);
	}
	
	public function removeCursor($esId, $memberId){
		$op = array(
			'optype' => 'RemoveCursor',
			'memberid' => (string) $memberId,
			'reason' => 'server-idle',
			'timestamp' => (string) time()
		);
		if ($this->hasOp($esId, $memberId, 'AddCursor') && !$this->hasLastOp($esId, $memberId, 'RemoveCursor')){
			$this->insertOp($esId, $memberId, $op);
		}
	}
	
	public function removeMember($esId, $memberId){
		$op = array(
			'optype' => 'RemoveMember',
			'memberid' => (string) $memberId,
			'timestamp' => (string) time()
		);
		if ($this->hasOp($esId, $memberId, 'AddMember') && !$this->hasLastOp($esId, $memberId, 'RemoveMember')){
			$this->insertOp($esId, $memberId, $op);
		}
	}
	
	public function updateMember($esId, $memberId, $fullName, $color, $imageUrl){
		//TODO: Follow the spec https://github.com/kogmbh/WebODF/blob/master/webodf/lib/ops/OpUpdateMember.js#L95
		$op = array(
			'optype' => 'UpdateMember',
			'memberid' => (string) $memberId,
			'timestamp' => (string) time(),
			'fullName' => $fullName,
			'color' => $color,
			'imageUrl' => $imageUrl
		);
		$this->insertOp($esId, $memberId, $op);
	}
	
	public function changeNick($esId, $memberId, $fullName){
		$op = array(
			'optype' => 'UpdateMember',
			'memberid' => (string) $memberId,
			'timestamp' => (string) time(),
			'setProperties' => array(
				'fullName' => $fullName,
			)
		);
		$this->insertOp($esId, $memberId, $op);
	}
	
	protected function insertOp($esId, $memberId, $op){
		$op = new Op(array(
			$esId,
			$op['optype'],
			$memberId,
			json_encode($op)
		));
		$op->insert();
	}
	
	protected function hasLastOp($esId, $memberId, $opType){
		$query = \OCP\DB::prepare('
			SELECT `opspec`
			FROM ' . self::DB_TABLE . '
			WHERE `es_id`=?
				AND `member`=?
			ORDER BY `seq` DESC
			', 
			2,0
		);
		
		$result = $query->execute(array($esId, $memberId));
		$ops = $result->fetchAll();
		foreach ($ops as $op){
			$decoded = json_decode($op['opspec'], true);
			if ($decoded['optype']==$opType){
				return true;
			}
		}
		return false;
	}
	
	protected function hasOp($esId, $memberId, $opType){
		$ops = $this->execute(
			'SELECT * FROM ' . $this->tableName
			. ' WHERE `es_id`=? AND	`optype`=? AND `member`=?',
			array($esId, $opType, $memberId)
		);
		$result = $ops->fetchAll();
		return is_array($result) && count($result)>0;
	}
	
}
