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

// Check if we are a user
\OCP\JSON::checkLoggedIn();

$genesis = @$_POST['genesis'];

$uid = \OCP\User::getUser();
$officeView = View::initOfficeView($uid);
if (!$officeView->file_exists($genesis)){
	$genesisPath = View::storeDocument($uid, $genesis);
} else {
	$genesisPath = $genesis;
}

if ($genesisPath){
	$session = Session::getSessionByPath($genesisPath);
	if (!$session){
		$hash = View::getHashByGenesis($uid, $genesisPath);
		$session = Session::addSession($genesisPath, $hash);
	}
	\OCP\JSON::success($session);
	exit();
}
\OCP\JSON::error();