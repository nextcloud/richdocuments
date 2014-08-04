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

OCP\App::register(array('order' => 70, 'id' => 'documents', 'name' => 'Documents'));
//OCP\App::registerAdmin('documents', 'settings');
\OCP\App::registerAdmin('documents', 'admin');
OCP\App::registerPersonal('documents', 'personal');

OCP\App::addNavigationEntry(array(
	'id' => 'documents_index', 
	'order' => 2,
	'href' => OCP\Util::linkTo('documents', 'index.php'), 
	'icon' => OCP\Util::imagePath('documents', 'documents.svg'),
	'name' => OCA\Documents\Config::getL10n()->t('Documents'))
);

OC::$CLASSPATH['OCA\Documents\Controller'] = 'documents/ajax/controller.php';
OC::$CLASSPATH['OCA\Documents\DocumentController'] = 'documents/ajax/documentController.php';
OC::$CLASSPATH['OCA\Documents\SessionController'] = 'documents/ajax/sessionController.php';
OC::$CLASSPATH['OCA\Documents\UserController'] = 'documents/ajax/userController.php';

//Script for registering file actions
OCP\Util::addScript('documents', 'viewer/viewer');

$docFilter = new OCA\Documents\Filter\Office(
			array(
				'read' => 
					array (
						'target' => 'application/vnd.oasis.opendocument.text',
						'format' => 'odt:writer8',
						'extension' => 'odt'
					),
				'write' => 
					array (
						'target' => 'application/msword',
						'format' => 'doc',
						'extension' => 'doc'
					)
			)
);

$docxFilter = new OCA\Documents\Filter\Office(
		array (
				'read' => 
					array (
						'target' => 'application/vnd.oasis.opendocument.text',
						'format' => 'odt:writer8',
						'extension' => 'odt'
					),
				'write' => 
					array (
						'target' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
						'format' => 'docx',
						'extension' => 'docx'
					)
			)
);

//Listen to delete file signal
OCP\Util::connectHook('OC_Filesystem', 'delete', "OCA\Documents\Storage", "onDelete");
