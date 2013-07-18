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

// Check if we are a user
OCP\User::checkLoggedIn();

$filename = "/welcome.odt";

if(!\OC\Files\Filesystem::file_exists($filename)) {
	header("HTTP/1.0 404 Not Found");
	$tmpl = new OCP\Template( '', '404', 'guest' );
	$tmpl->assign('file', $filename);
	$tmpl->printPage();
	exit;
}

$ftype=\OC\Files\Filesystem::getMimeType( $filename );

header('Content-Type:'.$ftype);
if ( preg_match( "/MSIE/", $_SERVER["HTTP_USER_AGENT"] ) ) {
	header( 'Content-Disposition: attachment; filename="' . rawurlencode( basename($filename) ) . '"' );
} else {
	header( 'Content-Disposition: attachment; filename*=UTF-8\'\'' . rawurlencode( basename($filename) )
										 . '; filename="' . rawurlencode( basename($filename) ) . '"' );
}
OCP\Response::disableCaching();
header('Content-Length: '.\OC\Files\Filesystem::filesize($filename));

OC_Util::obEnd();
\OC\Files\Filesystem::readfile( $filename );
