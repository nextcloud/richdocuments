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

class Db {
	/**
	 * Build placeholders for the query with variable input data 
	 * @param Array $array data
	 * @return String string of '?' placeholders matching the number of elements in array
	 */
	public function buildPlaceholders($array){
		$count = count($array);
		$placeholders = array_fill(0, $count, '?');
		$stmt = implode(', ', $placeholders);
		return $stmt;
	}
}