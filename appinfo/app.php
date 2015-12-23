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

use OCA\Richdocuments\Filter\Office;
use OCA\Richdocuments\Config;

$app = new Application();
$c = $app->getContainer();

\OCP\App::registerAdmin('richdocuments', 'admin');
\OCP\App::registerPersonal('richdocuments', 'personal');

$navigationEntry = function () use ($c) {
	return [
		'id' => 'richdocuments_index',
		'order' => 2,
		'href' => $c->query('ServerContainer')->getURLGenerator()->linkToRoute('richdocuments.document.index'),
		'icon' => $c->query('ServerContainer')->getURLGenerator()->imagePath('richdocuments', 'documents.svg'),
		'name' => $c->query('L10N')->t('Collabora Online Development Edition')
	];
};
$c->getServer()->getNavigationManager()->add($navigationEntry);

//Script for registering file actions
$request = \OC::$server->getRequest();
if (isset($request->server['REQUEST_URI'])) {
	$url = $request->server['REQUEST_URI'];

	if (preg_match('%index.php/apps/files(/.*)?%', $url)) {
		\OCP\Util::addScript('richdocuments', 'viewer/viewer');
	}
}

if ($c->query('AppConfig')->isConverterEnabled()){
	$odtFilter = new Office(
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

	$odpFilter = new Office(
		[
			'read' =>
				[
					'target' => 'application/vnd.oasis.opendocument.presentation',
					'format' => 'odp',
					'extension' => 'odp'
				],
			'write' =>
				[
					'target' => 'application/vnd.oasis.opendocument.presentation',
					'format' => 'dop',
					'extension' => 'odp'
				]
		]
	);

	$odsFilter = new Office(
		[
			'read' =>
				[
					'target' => 'application/vnd.oasis.opendocument.spreadsheet',
					'format' => 'ods',
					'extension' => 'ods'
				],
			'write' =>
				[
					'target' => 'application/vnd.oasis.opendocument.spreadsheet',
					'format' => 'ods',
					'extension' => 'ods'
				]
		]
	);

	$odgFilter = new Office(
		[
			'read' =>
				[
					'target' => 'application/vnd.oasis.opendocument.graphics',
					'format' => 'odg',
					'extension' => 'odg'
				],
			'write' =>
				[
					'target' => 'application/vnd.oasis.opendocument.graphics',
					'format' => 'odg',
					'extension' => 'odg'
				]
		]
	);

	$docFilter = new Office(
		[
			'read' =>
				[
					'target' => 'application/msword',
					'format' => 'doc',
					'extension' => 'doc'
				],
			'write' =>
				[
					'target' => 'application/msword',
					'format' => 'doc',
					'extension' => 'doc'
				]
		]
	);

	$lwpFilter = new Office(
		[
			'read' =>
				[
					'target' => 'application/vnd.lotus-wordpro',
					'format' => 'lwp',
					'extension' => 'lwp'
				],
			'write' =>
				[
					'target' => 'application/vnd.lotus-wordpro',
					'format' => 'lwp',
					'extension' => 'lwp'
				]
		]
	);

	$svgFilter = new Office(
		[
			'read' =>
				[
					'target' => 'image/svg+xml',
					'format' => 'svg',
					'extension' => 'svg'
				],
			'write' =>
				[
					'target' => 'image/svg+xml',
					'format' => 'svg',
					'extension' => 'svg'
				]
		]
	);

	$potFilter = new Office(
		[
			'read' =>
				[
					'target' => 'application/vnd.ms-powerpoint',
					'format' => 'pot',
					'extension' => 'pot'
				],
			'write' =>
				[
					'target' => 'application/vnd.ms-powerpoint',
					'format' => 'pot',
					'extension' => 'pot'
				]
		]
	);

	$xlaFilter = new Office(
		[
			'read' =>
				[
					'target' => 'application/vnd.ms-excel',
					'format' => 'xla',
					'extension' => 'xla'
				],
			'write' =>
				[
					'target' => 'application/vnd.ms-excel',
					'format' => 'xla',
					'extension' => 'xla'
				]
		]
	);

	$xlaFilter = new Office(
		[
			'read' =>
				[
					'target' => 'application/vnd.ms-excel',
					'format' => 'xla',
					'extension' => 'xla'
				],
			'write' =>
				[
					'target' => 'application/vnd.ms-excel',
					'format' => 'xla',
					'extension' => 'xla'
				]
		]
	);

	$xlsxFilter = new Office(
		[
			'read' =>
				[
					'target' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
					'format' => 'xlsx',
					'extension' => 'xlsx'
				],
			'write' =>
				[
					'target' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
					'format' => 'xlsx',
					'extension' => 'xlsx'
				]
		]
	);

	$vsdFilter = new Office(
		[
			'read' =>
				[
					'target' => 'application/vnd.visio',
					'format' => 'vsd',
					'extension' => 'vsd'
				],
			'write' =>
				[
					'target' => 'application/vnd.visio',
					'format' => 'vsd',
					'extension' => 'vsd'
				]
		]
	);

	$wpdFilter = new Office(
		[
			'read' =>
				[
					'target' => 'application/vnd.wordperfect',
					'format' => 'wpd',
					'extension' => 'wpd'
				],
			'write' =>
				[
					'target' => 'application/vnd.wordperfect',
					'format' => 'wpd',
					'extension' => 'wpd'
				]
		]
	);

	$wpdFilter = new Office(
		[
			'read' =>
				[
					'target' => 'application/vnd.wordperfect',
					'format' => 'wpd',
					'extension' => 'wpd'
				],
			'write' =>
				[
					'target' => 'application/vnd.wordperfect',
					'format' => 'wpd',
					'extension' => 'wpd'
				]
		]
	);
}

//Listen to delete file signal
\OCP\Util::connectHook('OC_Filesystem', 'delete', "OCA\Richdocuments\Storage", "onDelete");
