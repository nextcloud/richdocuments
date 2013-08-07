<?php

namespace OCA\Office;

class Op {

	public static function add($esId, $op){
		$query = \OCP\DB::prepare('INSERT INTO `*PREFIX*office_op`  (`es_id`, `member`, `opspec`) VALUES (?, ?, ?) ');
		$query->execute(array(
			$esId,
			$op['member'],
			$op['opspec'],
		));
		// throw something - if query fails - thats fatal

		return \OCP\DB::insertid(`*PREFIX*office_op`);
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
		return is_null($result) ? "" : $result;
	}
	
	public static function getOpsAfter($esId, $seq){
		if ($seq == "") $seq = -1;
		$oplist = [];
		$query = \OCP\DB::prepare('SELECT `opspec` FROM `*PREFIX*office_op`  WHERE `es_id`=? AND `seq`>? ORDER BY `seq` ASC');
		$result = $query->execute(array($esId, $seq));
		while( $row = $result->fetchRow() ) {
			$oplist[] = json_decode($row['opspec']);
		}
		return $oplist;
	}

}
