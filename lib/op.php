<?php

namespace OCA\Office;

class Op {

	public static function add($esId, $memberId, $opspec){
		$query = \OCP\DB::prepare('INSERT INTO `*PREFIX*office_op`  (`es_id`, `member`, `opspec`) VALUES (?, ?, ?) ');
		$query->execute(array(
			$esId,
			$memberId,
			$opspec,
		));
		// throw something - if query fails - thats fatal

		return \OCP\DB::insertid(`*PREFIX*office_op`);
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
		$query = \OCP\DB::prepare('SELECT `seq` FROM `*PREFIX*office_op`  WHERE `es_id`=? ORDER BY `seq` DESC LIMIT 1');
		$result = $query->execute(array(
				$esId
			))
			->fetchOne()	
		;
		return !$result ? "" : $result;
	}
	
	public static function getOpsAfterJson($esId, $seq){
		return array_map(
				json_decode, 
				self::getOpsAfter($esId, $seq)
		);
	}
	
	public static function getOpsAfter($esId, $seq){
		if ($seq == ""){
			$seq = -1;
		}
		$oplist = array();
		$query = \OCP\DB::prepare('SELECT `opspec` FROM `*PREFIX*office_op`  WHERE `es_id`=? AND `seq`>? ORDER BY `seq` ASC');
		$result = $query->execute(array($esId, $seq));
		return $result->fetchAll();
	}

}
