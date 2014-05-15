<?php

/**
 * ownCloud - Documents App
 *
 * @author Victor Dubiniuk
 * @copyright 2013 Victor Dubiniuk victor.dubiniuk@gmail.com
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later.
 */

namespace OCA\Documents;

\OCP\JSON::checkLoggedIn();

$path = Helper::getArrayValueByKey($_GET, 'path');
if (!empty($path)){
	$fullPath = '/files' . $path;
	$download = new Download(\OCP\User::getUser(), $fullPath);
	$download->sendResponse();
}
exit();