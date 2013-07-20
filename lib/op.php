<?php

namespace OCA\Office;

class Op {

	public function add($op){
		$query = \OCP\DB::prepare('INSERT INTO `*PREFIX*office_op`  (`es_id`, `seq`, `member`, `opspec`) VALUES (?, ?, ?, ?) ');
		$result = $query->execute(array(
			$op['es_id'],
			$op['seq'],
			$op['member'],
			$op['opspec'],
		));
	}

}
