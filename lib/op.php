<?php

namespace OCA\Office;

class Op {

	public static function add($op){
		$query = \OCP\DB::prepare('INSERT INTO `*PREFIX*office_op`  (`es_id`, `member`, `opspec`) VALUES (?, ?, ?) ');
		$query->execute(array(
		$result = $op['es_id'],
			$op['member'],
			$op['opspec'],
		));
		if ($result){
			return \OCP\DB::insertid(`*PREFIX*office_op`);
		}
		return 0;
	}
	
	public static function getHeadSeq($esId){
		$query = \OCP\DB::prepare('SELECT `seq` FROM `*PREFIX*office_op`  WHERE `es_id`=? ORDER BY `seq` DESC LIMIT 1');
		$result = $query->execute(array(
				$esId
			))
			->fetchOne()	
		;
		return $result;
	}
	
	public static function getOpsAfter($esId, $seq){
		$query = \OCP\DB::prepare('SELECT `seq` FROM `*PREFIX*office_op`  WHERE `es_id`=? AND `seq`>? ORDER BY `seq` ASC');
		$result = $query->execute(array(
				$esId, $seq
			))
			->fetchAll()	
		;
		return $result;
	}

}
