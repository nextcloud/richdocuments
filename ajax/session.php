<?php

namespace OCA\Office;

// Check if we are a user
\OCP\User::checkLoggedIn();

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
		$session = Session::addSession($genesisPath);
	}
	\OCP\JSON::success($session);
	exit();
}
\OCP\JSON::error();