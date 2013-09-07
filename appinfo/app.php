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

//OCP\Util::addStyle( 'documents', 'style');

OCP\App::register(array('order' => 70, 'id' => 'documents', 'name' => 'Documents'));
OCP\App::registerAdmin('documents', 'settings');

OCP\App::addNavigationEntry(array(
	'id' => 'documents_index', 
	'order' => 80, 
	'href' => OCP\Util::linkTo('documents', 'index.php'), 
	'icon' => OCP\Util::imagePath('documents', 'documents.png'), 
	'name' => 'Documents')
);

OC::$CLASSPATH['OCA\Documents\Controller'] = 'documents/ajax/controller.php';
OC::$CLASSPATH['OCA\Documents\DocumentController'] = 'documents/ajax/documentController.php';
OC::$CLASSPATH['OCA\Documents\SessionController'] = 'documents/ajax/sessionController.php';
OC::$CLASSPATH['OCA\Documents\UserController'] = 'documents/ajax/userController.php';
OC::$CLASSPATH['OCA\Documents\Download_Simple'] = 'documents/lib/download/simple.php';
OC::$CLASSPATH['OCA\Documents\Download_Range'] = 'documents/lib/download/range.php';


//TODO: stable5 only
OC::$CLASSPATH['OCA\Documents\Download'] = 'documents/lib/download.php';
OC::$CLASSPATH['OCA\Documents\Helper'] = 'documents/lib/helper.php';
OC::$CLASSPATH['OCA\Documents\Invite'] = 'documents/lib/invite.php';
OC::$CLASSPATH['OCA\Documents\Member'] = 'documents/lib/member.php';
OC::$CLASSPATH['OCA\Documents\Op'] = 'documents/lib/op.php';
OC::$CLASSPATH['OCA\Documents\Request'] = 'documents/lib/request.php';
OC::$CLASSPATH['OCA\Documents\Session'] = 'documents/lib/session.php';
OC::$CLASSPATH['OCA\Documents\Storage'] = 'documents/lib/storage.php';
OC::$CLASSPATH['OCA\Documents\View'] = 'documents/lib/view.php';
