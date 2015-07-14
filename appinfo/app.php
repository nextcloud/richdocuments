<?php

/**
 * ownCloud - Documents App
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

namespace OCA\Documents\AppInfo;

use OCA\Documents\Filter\Office;
use OCA\Documents\Config;

$app = new Application();
$c = $app->getContainer();

\OCP\App::registerAdmin('documents', 'admin');
\OCP\App::registerPersonal('documents', 'personal');

$navigationEntry = function () use ($c) {
	return [
		'id' => 'documents_index',
		'order' => 2,
		'href' => \OCP\Util::linkTo('documents/', 'index.php'),
		'icon' => \OCP\Util::imagePath('documents', 'documents.svg'),
		'name' => $c->query('L10N')->t('Documents')
	];
};
$c->getServer()->getNavigationManager()->add($navigationEntry);

//Script for registering file actions
$request = \OC::$server->getRequest();
if (isset($request->server['REQUEST_URI'])) {
	$url = $request->server['REQUEST_URI'];

	if (preg_match('%index.php/apps/files(/.*)?%', $url)) {
		\OCP\Util::addScript('documents', 'viewer/viewer');
	}
}

if (Config::getConverter() !== 'off'){
	$docFilter = new Office(
		[
			'read' =>
				[
					'target' => 'application/vnd.oasis.opendocument.text',
					'format' => 'odt:writer8',
					'extension' => 'odt'
				],
			'write' => 
				[
					'target' => 'application/msword',
					'format' => 'doc',
					'extension' => 'doc'
				]
		]
	);

	$docxFilter = new Office(
		[
			'read' =>
				[
					'target' => 'application/vnd.oasis.opendocument.text',
					'format' => 'odt:writer8',
					'extension' => 'odt'
				],
			'write' =>
				[
					'target' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
					'format' => 'docx',
					'extension' => 'docx'
				]
		]
	);
}

//Listen to delete file signal
\OCP\Util::connectHook('OC_Filesystem', 'delete', "OCA\Documents\Storage", "onDelete");
