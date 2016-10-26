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

/**
 * @method string generateFileToken()
 * @method string getPathForToken()
 */

class Wopi extends \OCA\Richdocuments\Db{

	const DB_TABLE = '`*PREFIX*richdocuments_wopi`';

	// Tokens expire after this many seconds (not defined by WOPI specs).
	const TOKEN_LIFETIME_SECONDS = 1800;

	protected $tableName  = '`*PREFIX*richdocuments_wopi`';

	protected $insertStatement  = 'INSERT INTO `*PREFIX*richdocuments_wopi` (`owner_uid`, `editor_uid`, `fileid`, `version`, `path`, `canwrite`, `server_host`, `token`, `expiry`)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

	protected $loadStatement = 'SELECT * FROM `*PREFIX*richdocuments_wopi` WHERE `token`= ?';

	/*
	 * Given a fileId and version, generates a token
	 * and stores in the database.
	 * version is 0 if current version of fileId is requested, otherwise
	 * its the version number as stored by files_version app
	 * Returns the token.
	 */
	public function generateFileToken($fileId, $version, $updatable, $serverHost){

		// Get the FS view of the current user.
		$view = \OC\Files\Filesystem::getView();

		// Get the virtual path (if the file is shared).
		$path = $view->getPath($fileId);

		if (!$view->is_file($path)) {
			throw new \Exception('Invalid fileId.');
		}

		// Figure out the real owner, if not us.
		$owner = $view->getOwner($path);

 		// Create a view into the owner's FS.
		$view = new \OC\Files\View('/' . $owner . '/files');
		// Find the real path.
		$path = $view->getPath($fileId);
		if (!$view->is_file($path)) {
			throw new \Exception('Invalid fileId.');
		}

		$editor = \OC::$server->getUserSession()->getUser()->getUID();

		$token = \OC::$server->getSecureRandom()->getMediumStrengthGenerator()->generate(32,
					\OCP\Security\ISecureRandom::CHAR_LOWER . \OCP\Security\ISecureRandom::CHAR_UPPER .
					\OCP\Security\ISecureRandom::CHAR_DIGITS);

		\OC::$server->getLogger()->debug('Issuing token for {editor} file {fileId}, version {version} owned by {owner}, path {path}: {token}',
		[ 'owner' => $owner, 'editor' => $editor, 'fileId' => $fileId, 'version' => $version, 'path' => $path, 'token' => $token ]);

		$wopi = new \OCA\Richdocuments\Db\Wopi([
			$owner,
			$editor,
			$fileId,
			$version,
			$path,
			$updatable,
			$serverHost,
			$token,
			time() + self::TOKEN_LIFETIME_SECONDS
		]);

		if (!$wopi->insert()){
			throw new \Exception('Failed to add wopi token into database');
		}

		return $token;
	}

	/*
	 * Given a token, validates it and
	 * constructs and validates the path.
	 * Returns the path, if valid, else false.
	 */
	public function getPathForToken($fileId, $version, $token){

		$wopi = new Wopi();
		$row = $wopi->loadBy('token', $token)->getData();
		\OC::$server->getLogger()->debug('Loaded WOPI Token record: {row}.', [ 'row' => $row ]);
		if (count($row) == 0)
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
		if ($row['fileid'] != $fileId || $row['version'] != $version){
			// File unknown / user unauthorized (for the requested file).
			http_response_code(404);
			return false;
		}

		return array(
			'owner' => $row['owner_uid'],
			'editor' => $row['editor_uid'],
			'path' => $row['path'],
			'canwrite' => $row['canwrite'],
			'server_host' => $row['server_host']
		);
	}
}
