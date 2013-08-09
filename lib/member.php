<?php

/**
 * ownCloud - Office App
 *
 * @author Victor Dubiniuk
 * @copyright 2013 Victor Dubiniuk victor.dubiniuk@gmail.com
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later.
 */

namespace OCA\Office;

class Member {

	const DEFAULT_ACTIVITY_THRESHOLD = 600; // 10 Minutes

	public static function add($esId, $displayname, $color){
		$query = \OCP\DB::prepare('INSERT INTO `*PREFIX*office_member`  (`es_id`, `displayname`, `color`, `lastactivity`) VALUES (?, ?, ?, ?) ');
		$query->execute(array(
			$esId,
			$displayname,
			$color,
			time()
		));

		return \OCP\DB::insertid(`*PREFIX*office_member`);
	}

	public static function getMember($id){
		$query = \OCP\DB::prepare('SELECT * FROM `*PREFIX*office_member` WHERE `member`= ?');
		$result = $query->execute(array($id));
		return $result->fetchRow();
	}

	public static function getMembersAsArray($ids){
		$memberCount = count($ids);
		if (!$memberCount || !$is_array($ids)){
			return array();
		}
		
		$placeholders = array_fill(0, $memberCount, '?');
		$stmt = implode(', ', $placeholders);
		$query = \OCP\DB::prepare('SELECT * FROM `*PREFIX*office_member` WHERE `member`IN (' . $stmt . ')');
		$result = $query->execute(array($ids));
		return $result->fetchAll();
	}

	public static function getMembersByEsId($esId, $lastActivity = null){
		if (is_null($lastActivity)){
			$activeSince = time() - self::ACTIVITY_THRESHOLD;
		} else {
			$activeSince = $lastActivity;
		}

		$query = \OCP\DB::prepare('SELECT * FROM `*PREFIX*office_member` WHERE `es_id`= ? and lastactivity > ?');
		$result = $query->execute(array($esId, $activeSince));
		return $result->fetchAll();
	}

}

