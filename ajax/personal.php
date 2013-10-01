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

\OCP\JSON::callCheck();
\OCP\JSON::checkLoggedIn();

$savePath = isset($_POST['savePath']) ? $_POST['savePath'] : null;
if (!is_null($savePath)){
	if (\OC\Files\Filesystem::file_exists($savePath) ===false ){
		if(!\OC\Files\Filesystem::mkdir($savePath)){
			\OCP\JSON::error(
				array(
					'data' => array('message'=>'')
				)
			);
		}
	}
	\OCP\Config::setUserValue(\OCP\User::getUser(), 'documents', 'save_path', $savePath);
	\OCP\JSON::success(
		array(
			'data' => array('message'=>'')
			)
	);
	exit();
}

exit();