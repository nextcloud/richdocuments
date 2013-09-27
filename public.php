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

if (isset($_GET['t'])) {
	$token = $_GET['t'];
	$linkItem = \OCP\Share::getShareByToken($token);
	if (is_array($linkItem) && isset($linkItem['uid_owner'])) {
		// seems to be a valid share
		$type = $linkItem['item_type'];
		$fileSource = $linkItem['file_source'];
		$shareOwner = $linkItem['uid_owner'];
		$path = null;
		$rootLinkItem = \OCP\Share::resolveReShare($linkItem);
		$fileOwner = $rootLinkItem['uid_owner'];
	}
}

$tmpl = new \OCP\Template('documents', 'public', 'guest');
if (isset($fileOwner)) {
	\OCP\Util::addStyle( 'documents', '3rdparty/webodf/dojo-app');
	\OCP\Util::addStyle( 'documents', '3rdparty/webodf/editor' );
	\OCP\Util::addScript('documents', 'documents');
	$tmpl->assign('document', $token);
} else {
	$tmpl->assign('notFound', true);
}

$tmpl->printPage();
