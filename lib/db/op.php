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
		$opObj = new Op();
		foreach ($ops as $op) {
			if (!$opObj->canInsertOp($esId, $memberId, $op)){
				continue;
			}
			$opObj->setData(array(
				$esId,
				$op['optype'],
				$memberId,
				json_encode($op)
			));
			$opObj->insert();
		}

		return $opObj->getHeadSeq($esId);
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
	
	public function addMember($esId, $memberId, $fullName, $userId, $color, $imageUrl){
		$op = array(
			'optype' => 'AddMember',
			'memberid' => (string) $memberId,
			'timestamp' => $this->getMillisecondsAsString(),
			'setProperties' => array(
				'fullName' => $fullName,
				'color' => $color,
				'imageUrl' => $imageUrl,
				'uid' => $userId,
			)
		);
		$this->insertOp($esId, $memberId, $op);
	}
	
	public function removeCursor($esId, $memberId){
		$op = array(
			'optype' => 'RemoveCursor',
			'memberid' => (string) $memberId,
			'reason' => 'server-idle',
			'timestamp' => $this->getMillisecondsAsString()
		);
		$this->insertOp($esId, $memberId, $op);
	}
	
	public function removeMember($esId, $memberId){
		$op = array(
			'optype' => 'RemoveMember',
			'memberid' => (string) $memberId,
			'timestamp' => $this->getMillisecondsAsString()
		);
		$this->insertOp($esId, $memberId, $op);
	}
	
	//TODO: Implement https://github.com/kogmbh/WebODF/blob/master/webodf/lib/ops/OpUpdateMember.js#L95
	public function changeNick($esId, $memberId, $fullName){
		$op = array(
			'optype' => 'UpdateMember',
			'memberid' => (string) $memberId,
			'timestamp' => $this->getMillisecondsAsString(),
			'setProperties' => array(
				'fullName' => $fullName,
			)
		);
		$this->insertOp($esId, $memberId, $op);
	}
	
	protected function insertOp($esId, $memberId, $op){
		if ($this->canInsertOp($esId, $memberId, $op)){
			$op = new Op(array(
				$esId,
				$op['optype'],
				$memberId,
				json_encode($op)
			));
			$op->insert();
		}
	}
	
	protected function canInsertOp($esId, $memberId, $op){
		$cursorOps = array('AddCursor', 'RemoveCursor');
		$memberOps = array('AddMember', 'RemoveMember');
		$result = true;
		
		switch ($op['optype']){
			case 'AddCursor':
				$ops = $this->getFilteredMemberOps($esId, $memberId, $cursorOps);
				$result = !count($ops) || $ops[0]['optype'] === 'RemoveCursor';
				break;
			case 'RemoveCursor':
				$ops = $this->getFilteredMemberOps($esId, $memberId, $cursorOps);
				$result = count($ops) && $ops[0]['optype'] === 'AddCursor';
				break;
			case 'AddMember':
				$ops = $this->getFilteredMemberOps($esId, $memberId, $memberOps);
				$result = !count($ops) || $ops[0]['optype'] === 'RemoveMember';
				break;
			case 'RemoveMember':
				$ops = $this->getFilteredMemberOps($esId, $memberId, $memberOps);
				$result = count($ops) && $ops[0]['optype'] === 'AddMember';
				break;
		}
		return $result;
	}

	protected function getFilteredMemberOps($esId, $memberId, $targetOps){
		$stmt = $this->buildInQuery('optype', $targetOps);
		$result = $this->execute('
			SELECT `optype` FROM ' . $this->tableName . '
			WHERE es_id=? AND member=? AND ' . $stmt . 'ORDER BY `seq` DESC',
			array_merge(array($esId, $memberId), $targetOps)
		);
		$ops = $result->fetchAll();
		if (!is_array($ops)){
			$ops = array();
		}
		return $ops;
	}
	
	protected function getMillisecondsAsString(){
		$microtime = microtime();
		list($usec, $sec) = explode(" ", $microtime);
		$milliseconds = $sec.substr($usec, 2, 3);
		return $milliseconds;
	}
}
