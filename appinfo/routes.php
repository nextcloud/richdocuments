<?php
/**
 * ownCloud - Richdocuments App
 *
 * @author Victor Dubiniuk
 * @copyright 2013-2014 Victor Dubiniuk victor.dubiniuk@gmail.com
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later.
 */

namespace OCA\Richdocuments;

$application = new \OCA\Richdocuments\AppInfo\Application();
$application->registerRoutes($this, [
	'routes' => [
		//users
		['name' => 'user#rename', 'url' => 'ajax/user/rename', 'verb' => 'POST'],
		['name' => 'user#disconnectUser', 'url' => 'ajax/user/disconnect', 'verb' => 'POST'],
		['name' => 'user#disconnectGuest', 'url' => 'ajax/user/disconnectGuest', 'verb' => 'POST'],
		//session
		['name' => 'session#join', 'url' => 'session/user/join/{fileId}', 'verb' => 'POST'],
		['name' => 'session#poll', 'url' => 'session/user/poll', 'verb' => 'POST'],
		['name' => 'session#save', 'url' => 'session/user/save', 'verb' => 'POST'],
		['name' => 'session#joinAsGuest', 'url' => 'session/guest/join/{token}', 'verb' => 'POST'],
		['name' => 'session#pollAsGuest', 'url' => 'session/guest/poll/{token}', 'verb' => 'POST'],
		['name' => 'session#saveAsGuest', 'url' => 'session/guest/save/{token}', 'verb' => 'POST'],
		//documents
		['name' => 'document#index', 'url' => 'index', 'verb' => 'GET'],
		['name' => 'document#create', 'url' => 'ajax/documents/create', 'verb' => 'POST'],
		['name' => 'document#serve', 'url' => 'ajax/genesis/{esId}', 'verb' => 'GET'],
		['name' => 'document#rename', 'url' => 'ajax/documents/rename/{fileId}', 'verb' => 'POST'],
		['name' => 'document#get', 'url' => 'ajax/documents/get/{fileId}', 'verb' => 'GET'],
		['name' => 'document#listAll', 'url' => 'ajax/documents/list', 'verb' => 'GET'],
		['name' => 'document#download', 'url' => 'ajax/download.php', 'verb' => 'GET'],
		//documents - for WOPI access
		['name' => 'document#wopiGetToken', 'url' => 'wopi/token/{fileId}', 'verb' => 'GET'],
		['name' => 'document#wopiCheckFileInfo', 'url' => 'wopi/files/{fileId}', 'verb' => 'GET'],
		['name' => 'document#wopiGetFile', 'url' => 'wopi/files/{fileId}/contents', 'verb' => 'GET'],
		['name' => 'document#wopiPutFile', 'url' => 'wopi/files/{fileId}/contents', 'verb' => 'POST'],
		//settings
		['name' => 'settings#setSettings', 'url' => 'ajax/admin.php', 'verb' => 'POST'],
		['name' => 'settings#getSupportedMimes', 'url' => 'ajax/mimes.php', 'verb' => 'GET'],
		['name' => 'settings#getSettings', 'url' => 'ajax/settings.php', 'verb' => 'GET'],
	]
]);
