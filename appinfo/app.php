<?php

/**
 * ownCloud - Documents App
 *
 * @author Frank Karlitschek
 * @copyright 2011 Frank Karlitschek karlitschek@kde.org
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
 * You should have received a copy of the GNU Lesser General Public 
 * License along with this library.  If not, see <http://www.gnu.org/licenses/>.
 * 
 */

OCP\App::register(array('order' => 70, 'id' => 'documents', 'name' => 'Documents'));
//OCP\App::registerAdmin('documents', 'settings');
OCP\App::registerPersonal('documents', 'personal');

$l10n = \OCP\Util::getL10N('documents');

OCP\App::addNavigationEntry(array(
	'id' => 'documents_index', 
	'order' => 2,
	'href' => OCP\Util::linkTo('documents', 'index.php'), 
	'icon' => OCP\Util::imagePath('documents', 'documents.svg'),
	'name' => $l10n->t('Documents'))
);

OC::$CLASSPATH['OCA\Documents\Controller'] = 'documents/ajax/controller.php';
OC::$CLASSPATH['OCA\Documents\DocumentController'] = 'documents/ajax/documentController.php';
OC::$CLASSPATH['OCA\Documents\SessionController'] = 'documents/ajax/sessionController.php';
OC::$CLASSPATH['OCA\Documents\UserController'] = 'documents/ajax/userController.php';
OC::$CLASSPATH['OCA\Documents\Download_Simple'] = 'documents/lib/download/simple.php';
OC::$CLASSPATH['OCA\Documents\Download_Range'] = 'documents/lib/download/range.php';
OC::$CLASSPATH['OCA\Documents\Db_Session'] = 'documents/lib/db/session.php';
OC::$CLASSPATH['OCA\Documents\Db_Member'] = 'documents/lib/db/member.php';
OC::$CLASSPATH['OCA\Documents\Db_Op'] = 'documents/lib/db/op.php';

//Script for registering file actions
OCP\Util::addScript('documents', 'viewer/viewer');

//Listen to delete file signal
OCP\Util::connectHook('OC_Filesystem', 'delete', "OCA\Documents\Storage", "onDelete");
