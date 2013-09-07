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

class Op {

	const DB_TABLE = '`*PREFIX*documents_op`';
	
	public static function add($esId, $memberId, $opspec){
		$query = \OCP\DB::prepare('
			INSERT INTO ' . self::DB_TABLE . ' (`es_id`, `member`, `opspec`)
			VALUES (?, ?, ?)
			');
		$query->execute(array(
			$esId,
			$memberId,
			$opspec,
		));

		return \OCP\DB::insertid(self::DB_TABLE);
	}
	
	public static function addOpsArray($esId, $memberId, $ops){
		$lastSeq = "";
		foreach ($ops as $op) {
			$lastSeq = self::add($esId, $memberId, json_encode($op));
		}
		return $lastSeq;
	}


	/**
	 * @returns "" when there are no Ops, or the seq of the last Op
	 */
	public static function getHeadSeq($esId){
		$query = \OCP\DB::prepare('
			SELECT `seq`
			FROM ' . self::DB_TABLE . '
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
	
	public static function getOpsAfterJson($esId, $seq){
		$ops = self::getOpsAfter($esId, $seq);
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
	
	public static function getOpsAfter($esId, $seq){
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
	
	public static function deleteBySessionId($esId){
		$query = \OCP\DB::prepare('DELETE FROM ' . self::DB_TABLE . ' WHERE `es_id` = ?');
		$query->execute(array($esId));
	}

	public static function removeCursor($esId, $memberId){
		return self::add(
				$esId, 
				0,
				'{"optype":"RemoveCursor","memberid":"'. $memberId .'","reason":"server-idle","timestamp":'. time() .'}'
		);
	}

}
