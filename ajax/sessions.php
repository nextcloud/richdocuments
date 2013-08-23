<?php

namespace OCA\Office;
// Init owncloud

\OCP\User::checkLoggedIn();
\OCP\JSON::checkAppEnabled('office');

$sessions = Session::getAll();
if (!is_array($sessions)){
	$sessions = array();
}
\OCP\JSON::success(array('sessions' => $sessions));
