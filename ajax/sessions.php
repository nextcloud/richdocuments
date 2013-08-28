<?php

namespace OCA\Documents;
// Init owncloud

\OCP\User::checkLoggedIn();
\OCP\JSON::checkAppEnabled('documents');

$sessions = Session::getAll();
if (!is_array($sessions)){
	$sessions = array();
}
\OCP\JSON::success(array('sessions' => $sessions));
