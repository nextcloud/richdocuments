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

class Db_Op extends Db {

	const DB_TABLE = '`*PREFIX*documents_op`';
	
	protected $tableName = '`*PREFIX*documents_op`';
	
	protected $insertStatement = 'INSERT INTO `*PREFIX*documents_op` (`es_id`, `member`, `opspec`) VALUES (?, ?, ?)';

	public static function addOpsArray($esId, $memberId, $ops){
		$lastSeq = "";
		$opObj = new Db_Op();
		foreach ($ops as $op) {
			$opObj->setData(array(
				$esId, 
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
		$op = '{"optype":"AddMember","memberid":"'. $memberId .'","timestamp":"'. time() .'", "setProperties":{"fullName":"'. $fullName .'","color":"'. $color .'","imageUrl":"'. $imageUrl .'"}}';
		$this->insertOp($esId, $memberId, $op);
	}
	
	public function removeCursor($esId, $memberId){
		if ($this->hasOp($esId, $memberId, 'AddCursor') && !$this->hasLastOp($esId, $memberId, 'RemoveCursor')){
			$op = '{"optype":"RemoveCursor","memberid":"'. $memberId .'","reason":"server-idle","timestamp":'. time() .'}';
			$this->insertOp($esId, $memberId, $op);
		}
	}
	
	public function removeMember($esId, $memberId){
		if ($this->hasOp($esId, $memberId, 'AddMember') && !$this->hasLastOp($esId, $memberId, 'RemoveMember')){
			$op ='{"optype":"RemoveMember","memberid":"'. $memberId .'","timestamp":'. time() .'}';
			$this->insertOp($esId, $memberId, $op);
		}
	}
	
	public function updateMember($esId, $memberId, $fullName, $color, $imageUrl){
		//TODO: Follow the spec https://github.com/kogmbh/WebODF/blob/master/webodf/lib/ops/OpUpdateMember.js#L95
		$op = '{"optype":"UpdateMember","memberid":"'. $memberId .'","fullName":"'. $fullName .'","color":"'. $color .'","imageUrl":"'. $imageUrl .'","timestamp":'. time() .'}'
		;
		$this->insertOp($esId, $memberId, $op);
	}
	
	public function changeNick($esId, $memberId, $fullName){
		$op = '{"optype":"UpdateMember","memberid":"'. $memberId .'", "setProperties":{"fullName":"'. $fullName .'"},"timestamp":'. time() .'}'
		;
		$this->insertOp($esId, $memberId, $op);
	}
	
	protected function insertOp($esId, $memberId, $op){
		$op = new Db_Op(array(
			$esId, 
			$memberId,
			$op
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
			'SELECT * FROM ' . $this->tableName . ' WHERE `es_id`=? AND `opspec` LIKE \'%"' . $opType . '","memberid":"' . $memberId .'"%\'',
			array($esId)
		);
		$result = $ops->fetchAll();
		return is_array($result) && count($result)>0;
	}
	
}
