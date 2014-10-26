<?php
/**
 * ownCloud - Documents App
 *
 * @author Victor Dubiniuk
 * @copyright 2013-2014 Victor Dubiniuk victor.dubiniuk@gmail.com
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later.
 */

namespace OCA\Documents;

$application = new \OCA\Documents\AppInfo\Application();
$application->registerRoutes($this, array(
	'routes' => array(
		//users
		array('name' => 'user#getAvatar', 'url' => 'ajax/user/avatar', 'verb' => 'GET'),
		array('name' => 'user#rename', 'url' => 'ajax/user/rename', 'verb' => 'POST'),
		array('name' => 'user#disconnect', 'url' => 'ajax/user/disconnect/{memberId}', 'verb' => 'POST'),
		array('name' => 'user#disconnectGuest', 'url' => 'ajax/user/disconnectGuest/{memberId}', 'verb' => 'POST'),
		//session
		array('name' => 'session#joinAsUser', 'url' => 'ajax/session/joinasuser/{fileId}', 'verb' => 'POST'),
		array('name' => 'session#joinAsGuest', 'url' => 'ajax/session/joinasguest/{token}', 'verb' => 'POST'),
		array('name' => 'session#save', 'url' => 'ajax/session/save', 'verb' => 'POST'),
		//documents
		array('name' => 'document#create', 'url' => 'ajax/documents/create', 'verb' => 'POST'),
		array('name' => 'document#serve', 'url' => 'ajax/genesis/{esId}', 'verb' => array('GET', 'HEAD')),
		array('name' => 'document#rename', 'url' => 'ajax/documents/rename/{fileId}', 'verb' => 'POST'),
		array('name' => 'document#listAll', 'url' => 'ajax/documents/list', 'verb' => 'GET'),
		//settings
		array('name' => 'settings#savePersonal', 'url' => 'ajax/personal.php', 'verb' => 'POST'),
		array('name' => 'settings#setUnstable', 'url' => 'ajax/config/unstable', 'verb' => 'POST'),
		array('name' => 'settings#setConverter', 'url' => 'ajax/admin.php', 'verb' => 'POST'),
	)
));


/** @var $this \OC\Route\Router */
$this->create('documents_ajax_download', 'ajax/download.php')
	->actionInclude('documents/ajax/download.php');

$this->create('documents_ajax_mimes', 'ajax/mimes.php')
	->actionInclude('documents/ajax/mimes.php');

$this->create('documents_ajax_otpoll', 'ajax/otpoll.php')
	->actionInclude('documents/ajax/otpoll.php');

/**
 * Document routes
 */

$this->create('documents_index', '')
	->get()
	->actionInclude('documents/index.php');

$this->create('documents_otpoll', 'ajax/otpoll.php')
	->post()
	->actionInclude('documents/ajax/otpoll.php')
;
