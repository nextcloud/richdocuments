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

class Invite {
	const STATUS_SENT = 0;
	const STATUS_DECLINED = 1;
	const STATUS_ACCEPTED = 2;
	
	public static function add($esId, $userId){
		$query = \OCP\DB::prepare('INSERT INTO `*PREFIX*office_invite`  (`es_id`, `uid`, `status`, `sent_on`) VALUES (?, ?, ?, ?) ');
		$query->execute(array(
			$esId,
			$userId,
			self::STATUS_SENT,
			time()
		));

		return \OCP\DB::insertid(`*PREFIX*office_invite`);
	}
	
	public static function accept($esId){
		$query = \OCP\DB::prepare('UPDATE `*PREFIX*office_invite`  SET `status`=? WHERE `es_id`=? AND `uid`=?');
		$query->execute(array(
			self::STATUS_ACCEPTED,
			$esId,
			\OCP\User::getUser()
		));
	}

	public static function decline($esId){
		$query = \OCP\DB::prepare('UPDATE `*PREFIX*office_invite`  SET `status`=? WHERE `es_id`=? AND `uid`=?');
		$query->execute(array(
			self::STATUS_DECLINED,
			$esId,
			\OCP\User::getUser()
		));
	}

	
	public static function getAllInvites(){
		$query = \OCP\DB::prepare('SELECT * FROM `*PREFIX*office_invite` WHERE `uid`= ?');
		$result = $query->execute(array(\OCP\User::getUser()));
		return $result->fetchAll();
	}
	
	public static function getSenderStatusesAsArray(){
		$l10n = \OCP\Util::getL10N('office');
		
		return array(
			self::STATUS_SENT => $l10n->t('Sent'),
			self::STATUS_DECLINED => $l10n->t('Declined'),
			self::STATUS_ACCEPTED => $l10n->t('Accepted')
		);
	}
	
	public static function getRecipientStatusesAsArray(){
		$l10n = \OCP\Util::getL10N('office');
		
		return array(
			self::STATUS_SENT => $l10n->t('Incoming'),
			self::STATUS_DECLINED => $l10n->t('Declined'),
			self::STATUS_ACCEPTED => $l10n->t('Accepted')
		);
	}
}