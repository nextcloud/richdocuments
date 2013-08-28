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

$this->create('documents_genesis', 'ajax/genesis/{es_id}')
	->post()
	->action('\OCA\Documents\Controller', 'serve')
;
$this->create('documents_genesis', 'ajax/genesis/{es_id}')
	->get()
	->action('\OCA\Documents\Controller', 'serve')
;

$this->create('documents_session_start', 'ajax/session/start')
	->get()
	->action('\OCA\Documents\Controller', 'startSession')
;
$this->create('documents_session_start', 'ajax/session/start')
	->post()
	->action('\OCA\Documents\Controller', 'startSession')
;

$this->create('documents_session_list', 'ajax/session/list')
	->get()
	->action('\OCA\Documents\Controller', 'listSessions')
;
$this->create('documents_session_list', 'ajax/session/list')
	->post()
	->action('\OCA\Documents\Controller', 'listSessions')
;

$this->create('documents_session_info', 'ajax/session/info')
	->post()
	->action('\OCA\Documents\Controller', 'sessionInfo')
;

$this->create('documents_session_listhtml', 'ajax/session/listHtml')
	->get()
	->action('\OCA\Documents\Controller', 'listSessionsHtml')
;
$this->create('documents_session_listhtml', 'ajax/session/listHtml')
	->post()
	->action('\OCA\Documents\Controller', 'listSessionsHtml')
;

$this->create('documents_session_join', 'ajax/session/join/{es_id}')
	->get()
	->action('\OCA\Documents\Controller', 'joinSession')
;
$this->create('documents_session_join', 'ajax/session/join/{es_id}')
	->post()
	->action('\OCA\Documents\Controller', 'joinSession')
;

$this->create('documents_session_save', 'ajax/session/save')
	->post()
	->action('\OCA\Documents\Controller', 'save')
;


$this->create('documents_user_avatar', 'ajax/user/avatar')
	->get()
	->action('\OCA\Documents\UserController', 'sendAvatar')
;

$this->create('documents_user_invite', 'ajax/user/invite')
	->post()
	->action('\OCA\Documents\UserController', 'invite')
;

$this->create('documents_user_search', 'ajax/user/search')
	->get()
	->action('\OCA\Documents\UserController', 'search')
;
