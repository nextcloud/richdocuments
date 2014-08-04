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

\OCP\JSON::checkAppEnabled('documents');

\OCP\Util::addStyle( 'documents', 'style' );

if (\OC_Appconfig::getValue('core', 'shareapi_allow_links', 'yes') !== 'yes') {
	header('HTTP/1.0 404 Not Found');
	$tmpl = new OCP\Template('', '404', 'guest');
	$tmpl->printPage();
	exit();
}

if (isset($_GET['t'])) {
	$token = $_GET['t'];
	$tmpl = new \OCP\Template('documents', 'public', 'guest');
	try {
		$file = File::getByShareToken($token);
		if ($file->isPasswordProtected() && !$file->checkPassword(@$_POST['password'])){
			if (isset($_POST['password'])){
				$tmpl->assign('wrongpw', true);
			}
			$tmpl->assign('hasPassword', true);
		} else {
			\OCP\Util::addStyle( 'documents', '3rdparty/webodf/dojo-app');
			\OCP\Util::addStyle( 'documents', '3rdparty/webodf/editor' );
			\OCP\Util::addScript('documents', 'documents');
			if ($file->getFileId()){
				$session = new Db\Session();
				$session->loadBy('file_id', $file->getFileId());
				
				if ($session->getEsId()){
					$member = new Db\Member();
					$members = $member->getCollectionBy('es_id', $session->getEsId());
				} else {
					$members = 0;
				}
				$tmpl->assign('total', count($members)+1);
			} else {
				$tmpl->assign('total', 1);
			}
			$tmpl->assign('document', $token);
		}
	} catch (\Exception $e){
		$tmpl->assign('notFound', true);
	}
	$tmpl->printPage();
}
