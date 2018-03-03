<?php
/**
 * ownCloud - Richdocuments App
 *
 * @author Ashod Nakashian
 * @copyright 2016 Ashod Nakashian ashod.nakashian@collabora.co.uk
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later.
 */

namespace OCA\Richdocuments\Db;

use \OCA\Richdocuments\Download;
use \OCA\Richdocuments\DownloadResponse;

class Wopi extends \OCA\Richdocuments\Db{

	const DB_TABLE = '`*PREFIX*richdocuments_wopi`';

	// Tokens expire after this many seconds (not defined by WOPI specs).
	const TOKEN_LIFETIME_SECONDS = 1800;

	protected $tableName  = '`*PREFIX*richdocuments_wopi`';

	protected $insertStatement  = 'INSERT INTO `*PREFIX*richdocuments_wopi` (`fileid`, `owner_uid`, `editor_uid`, `guest_displayname`, `version`, `canwrite`, `server_host`, `token`, `expiry`)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

	protected $loadStatement = 'SELECT * FROM `*PREFIX*richdocuments_wopi` WHERE `token`= ?';

	public function generateFileToken($fileId, $owner, $editor, $guest_name, $version, $updatable, $serverHost) {
		$token = \OC::$server->getSecureRandom()->getMediumStrengthGenerator()->generate(32,
					\OCP\Security\ISecureRandom::CHAR_LOWER . \OCP\Security\ISecureRandom::CHAR_UPPER .
					\OCP\Security\ISecureRandom::CHAR_DIGITS);

		$wopi = new \OCA\Richdocuments\Db\Wopi([
			$fileId,
			$owner,
			$editor,
			$guest_name,
			$version,
			$updatable,
			$serverHost,
			$token,
			time() + self::TOKEN_LIFETIME_SECONDS
		]);

		if (!$wopi->insert()) {
			throw new \Exception('Failed to add wopi token into database');
		}

		return $token;
	}

	/*
	 * Given a token, validates it and
	 * constructs and validates the path.
	 * Returns the path, if valid, else false.
	 */
	public function getPathForToken($fileId, $token){

		$wopi = new Wopi();
		$row = $wopi->loadBy('token', $token)->getData();
		\OC::$server->getLogger()->debug('Loaded WOPI Token record: {row}.', [ 'row' => $row ]);
		if (count($row) === 0)
		{
			// Invalid token.
			http_response_code(401);
			return false;
		}

		//TODO: validate.
		if ($row['expiry'] > time()){
			// Expired token!
			//http_response_code(404);
			//$wopi->deleteBy('id', $row['id']);
			//return false;
		}

		return array(
			'owner' => $row['owner_uid'],
			'editor' => $row['editor_uid'],
			'guest_displayname' => $row['guest_displayname'],
			'canwrite' => $row['canwrite'],
			'server_host' => $row['server_host']
		);
	}
}
