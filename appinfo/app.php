<?php
/**
 * ownCloud - Richdocuments App
 *
 * @author Frank Karlitschek
 * @copyright 2013-2014 Frank Karlitschek karlitschek@kde.org
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU AFFERO GENERAL PUBLIC LICENSE
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU AFFERO GENERAL PUBLIC LICENSE for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with this library.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Richdocuments\AppInfo;

use OC\Security\CSP\ContentSecurityPolicy;
use OCA\Richdocuments\PermissionManager;

$currentUser = \OC::$server->getUserSession()->getUser();
if($currentUser !== null) {
	/** @var PermissionManager $permissionManager */
	$permissionManager = \OC::$server->query(PermissionManager::class);
	if(!$permissionManager->isEnabledForUser($currentUser)) {
		return;
	}
}

$eventDispatcher = \OC::$server->getEventDispatcher();
$eventDispatcher->addListener(
	'OCA\Files::loadAdditionalScripts',
	function() {
		\OCP\Util::addScript('richdocuments', 'viewer/viewer');
		\OCP\Util::addStyle('richdocuments', 'viewer/odfviewer');
		\OCP\Util::addStyle('richdocuments', 'templatePicker');
	}
);
$eventDispatcher->addListener(
	'OCA\Files_Sharing::loadAdditionalScripts',
	function() {
		\OCP\Util::addScript('richdocuments', 'viewer/viewer');
		\OCP\Util::addStyle('richdocuments', 'viewer/odfviewer');
		\OCP\Util::addStyle('richdocuments', 'templatePicker');
	}
);

if (class_exists('\OC\Files\Type\TemplateManager')) {
	$manager = \OC_Helper::getFileTemplateManager();

	$manager->registerTemplate('application/vnd.openxmlformats-officedocument.wordprocessingml.document', dirname(__DIR__) . '/assets/docxtemplate.docx');
	$manager->registerTemplate('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', dirname(__DIR__) . '/assets/xlsxtemplate.xlsx');
	$manager->registerTemplate('application/vnd.openxmlformats-officedocument.presentationml.presentation', dirname(__DIR__) . '/assets/pptxtemplate.pptx');
}

// Whitelist the wopi URL for iframes, required for Firefox
$wopiUrl = \OC::$server->getConfig()->getAppValue('richdocuments', 'wopi_url');
if ($wopiUrl !== '') {
	$manager = \OC::$server->getContentSecurityPolicyManager();
	$policy = new ContentSecurityPolicy();
	$policy->addAllowedFrameDomain($wopiUrl);
	$manager->addDefaultPolicy($policy);
}

$app = new Application();
$app->registerProvider();
