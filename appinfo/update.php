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

$config = \OC::$server->getConfig();
$dbConnection = \OC::$server->getDatabaseConnection();
$installedVersion = $config->getAppValue('documents', 'installed_version');

$cleanup = $dbConnection->prepare('DELETE FROM `*PREFIX*documents_member` WHERE `last_activity`=0 or `last_activity` is NULL');
$cleanup->execute();

if (version_compare($installedVersion, '0.7', '<=')) {
	$config->setAppValue('documents', 'unstable', 'false');
	$session = new \OCA\Documents\Db\Session();
	
	$query = $dbConnection->prepare('UPDATE `*PREFIX*documents_session` SET `genesis_url`=? WHERE `es_id`=?');

	foreach ($session->getCollection() as $sessionData){
		$sessionData['genesis_url'] = \OCA\Documents\Genesis::DOCUMENTS_DIRNAME . $sessionData['genesis_url'];
		$query->execute(array(
			$sessionData['genesis_url'],
			$sessionData['es_id']
		));
		
	}
}
if (version_compare($installedVersion, '0.8', '<')) {
	$query = $dbConnection->prepare('UPDATE `*PREFIX*documents_member` SET `is_guest`=1 WHERE `uid` LIKE \'%(guest)\' ');
	$query->execute(array());
}

if (version_compare($installedVersion, '0.9', '<')) {
	$query = $dbConnection->prepare('UPDATE `*PREFIX*documents_op` SET `optype`=? WHERE `seq`=?');
	$ops = new \OCA\Documents\Db\Op();
	foreach ($ops->getCollection() as $opData){
		$opSpec = json_decode($opData['opspec'], true);
		$query->execute(
			array(
				$opSpec['optype'],
				$opData['seq']
			)
		); 
	}
}