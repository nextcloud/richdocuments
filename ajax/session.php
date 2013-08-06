<?php

namespace OCA\Office;

// Check if we are a user
\OCP\User::checkLoggedIn();

$genesis = @$_POST['genesis'];
if ($genesis){
	$session = Session::getSessionByUrl($genesis);
	if (!$session){
		$session = Session::addSession($genesis);
	}
	\OCP\JSON::success($session);
	exit();
}
\OCP\JSON::error();