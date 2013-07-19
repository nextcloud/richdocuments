<?php

// TODO:
// * this thing needs to support HEAD and GET requests.
//
// * the url shall look like: http://whatever/owncloud/index.php/apps/office/ajax/genesis.php/1234
// 1234 is the session id here; a database table maps that to a file in storage
//
// * GET requests have to support ranges
// curl --user admin:admin -r 500-1000 -i http://whatever/owncloud/index.php/apps/office/ajax/genesis.php/1234
//
// hardcoding the served file with /welcome.odt for now is enough to unblock development
// (that saves all db work for now)

namespace OCA\Office;

// Check if we are a user
\OCP\User::checkLoggedIn();

$session = Session::getSession($_SERVER['QUERY_STRING']);
$filename = isset($session['genesis_url']) ? $session['genesis_url'] : '';

$download = new Download($filename);
$download->sendResponse();