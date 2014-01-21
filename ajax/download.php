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

$download = new Download(\OCP\User::getUser(), '/files' . @$_GET['path']);
$download->sendResponse();
