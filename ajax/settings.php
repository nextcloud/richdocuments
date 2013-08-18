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

\OCP\JSON::callCheck();

$unstable = isset($_POST['unstable']) ? $_POST['unstable'] : null;
if (!is_null($unstable)){
	\OCP\JSON::checkAdminUser();
	\OCP\Config::setAppValue('office', 'unstable', $unstable);
	\OCP\JSON::success();
	exit();
}

if (isset($_GET['unstable'])){
	\OCP\JSON::success(array(
			'value' => \OCP\Config::getAppValue('office', 'unstable', 'false')
	));
}
exit();