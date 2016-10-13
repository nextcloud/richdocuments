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

use OCA\Richdocuments\Config;

$app = new Application();
$c = $app->getContainer();

\OCP\App::registerAdmin('richdocuments', 'admin');

$navigationEntry = function () use ($c) {
	return [
		'id' => 'richdocuments_index',
		'order' => 2,
		'href' => $c->query('ServerContainer')->getURLGenerator()->linkToRoute('richdocuments.document.index'),
		'icon' => $c->query('ServerContainer')->getURLGenerator()->imagePath('richdocuments', 'app.svg'),
		'name' => $c->query('L10N')->t('Office')
	];
};
$c->getServer()->getNavigationManager()->add($navigationEntry);

//Script for registering file actions
$eventDispatcher = \OC::$server->getEventDispatcher();
$eventDispatcher->addListener(
	'OCA\Files::loadAdditionalScripts',
	function() {
		\OCP\Util::addScript('richdocuments', 'viewer/viewer');
		\OCP\Util::addStyle('richdocuments', 'viewer/odfviewer');
	}
);

if (class_exists('\OC\Files\Type\TemplateManager')) {
    $manager = \OC_Helper::getFileTemplateManager();

    $manager->registerTemplate('application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'apps/richdocuments/assets/docxtemplate.docx');
    $manager->registerTemplate('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'apps/richdocuments/assets/xlsxtemplate.xlsx');
    $manager->registerTemplate('application/vnd.openxmlformats-officedocument.presentationml.presentation', 'apps/richdocuments/assets/pptxtemplate.pptx');
}

//Listen to delete file signal
\OCP\Util::connectHook('OC_Filesystem', 'delete', "OCA\Richdocuments\Storage", "onDelete");
