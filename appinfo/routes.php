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

/** @var $this \OC\Route\Router */

$this->create('documents_ajax_admin', 'ajax/admin.php')
	->actionInclude('documents/ajax/admin.php');

$this->create('documents_ajax_download', 'ajax/download.php')
	->actionInclude('documents/ajax/admin.php');

$this->create('documents_ajax_mimes', 'ajax/mimes.php')
	->actionInclude('documents/ajax/mimes.php');

$this->create('documents_ajax_otpoll', 'ajax/otpoll.php')
	->actionInclude('documents/ajax/otpoll.php');

$this->create('documents_ajax_personal', 'ajax/personal.php')
	->actionInclude('documents/ajax/personal.php');

$this->create('documents_ajax_settings', 'ajax/settings.php')
	->actionInclude('documents/ajax/settings.php');

/**
 * Document routes
 */

$this->create('documents_index', '')
	->get()
	->actionInclude('documents/index.php');
 
$this->create('documents_documents_create', 'ajax/documents/create')
	->post()
	->action('\OCA\Documents\DocumentController', 'create')
;
$this->create('documents_genesis', 'ajax/genesis/{es_id}')
	->post()
	->action('\OCA\Documents\DocumentController', 'serve')
;
$this->create('documents_rename', 'ajax/documents/rename/{file_id}')
	->post()
	->action('\OCA\Documents\DocumentController', 'rename')
;
$this->create('documents_genesis', 'ajax/genesis/{es_id}')
	->get()
	->action('\OCA\Documents\DocumentController', 'serve')
;

$this->create('documents_documents_list', 'ajax/documents/list')
	->get()
	->action('\OCA\Documents\DocumentController', 'listAll')
;

/**
 * Session routes
 */
$this->create('documents_session_joinasuser', 'ajax/session/joinasuser/{file_id}')
	->get()
	->action('\OCA\Documents\SessionController', 'joinAsUser')
;
$this->create('documents_session_joinasuser', 'ajax/session/joinasuser/{file_id}')
	->post()
	->action('\OCA\Documents\SessionController', 'joinAsUser')
;
$this->create('documents_session_joinasguest', 'ajax/session/joinasguest/{token}')
	->get()
	->action('\OCA\Documents\SessionController', 'joinAsGuest')
;
$this->create('documents_session_joinasguest', 'ajax/session/joinasguest/{token}')
	->post()
	->action('\OCA\Documents\SessionController', 'joinAsGuest')
;

$this->create('documents_session_save', 'ajax/session/save')
	->post()
	->action('\OCA\Documents\SessionController', 'save')
;

$this->create('documents_otpoll', 'ajax/otpoll.php')
	->post()
	->actionInclude('documents/ajax/otpoll.php')
;

/**
 * User routes
 */
$this->create('documents_user_avatar', 'ajax/user/avatar')
	->get()
	->action('\OCA\Documents\UserController', 'sendAvatar')
;

$this->create('documents_user_rename', 'ajax/user/rename/{member_id}')
	->post()
	->action('\OCA\Documents\UserController', 'rename')
;

$this->create('documents_user_disconnect', 'ajax/user/disconnect/{member_id}')
	->post()
	->action('\OCA\Documents\UserController', 'disconnectUser')
;

$this->create('documents_user_disconnectGuest', 'ajax/user/disconnectGuest/{member_id}')
	->post()
	->action('\OCA\Documents\UserController', 'disconnectGuest')
;
