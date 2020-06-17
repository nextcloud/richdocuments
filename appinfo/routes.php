<?php
/**
 * @copyright Copyright (c) 2013-2014 Victor Dubiniuk <victor.dubiniuk@gmail.com>
 *
 * @author Victor Dubiniuk <victor.dubiniuk@gmail.com>
 * @author Roeland Jago Douma <roeland@famdouma.nl>
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Richdocuments\AppInfo;

return [
	'routes' => [
		//documents
		['name' => 'document#index', 'url' => 'index', 'verb' => 'GET'],
		['name' => 'document#remote', 'url' => 'remote', 'verb' => 'GET'],
		['name' => 'document#open', 'url' => 'open', 'verb' => 'GET'],

		['name' => 'document#createFromTemplate', 'url' => 'indexTemplate', 'verb' => 'GET'],
		['name' => 'document#publicPage', 'url' => '/public', 'verb' => 'GET'],
		['name' => 'document#create', 'url' => 'ajax/documents/create', 'verb' => 'POST'],

		// external api access
		['name' => 'document#extAppGetData', 'url' => '/ajax/extapp/data/{fileId}', 'verb' => 'POST'],

		// WOPI access
		['name' => 'wopi#checkFileInfo', 'url' => 'wopi/files/{fileId}', 'verb' => 'GET'],
		['name' => 'wopi#getFile', 'url' => 'wopi/files/{fileId}/contents', 'verb' => 'GET'],
		['name' => 'wopi#putFile', 'url' => 'wopi/files/{fileId}/contents', 'verb' => 'POST'],
		['name' => 'wopi#putRelativeFile', 'url' => 'wopi/files/{fileId}', 'verb' => 'POST'],
		['name' => 'wopi#getTemplate', 'url' => 'wopi/template/{fileId}', 'verb' => 'GET'],

		//settings
		['name' => 'settings#setPersonalSettings', 'url' => 'ajax/personal.php', 'verb' => 'POST'],
		['name' => 'settings#setSettings', 'url' => 'ajax/admin.php', 'verb' => 'POST'],
		['name' => 'settings#getSettings', 'url' => 'ajax/settings.php', 'verb' => 'GET'],
		['name' => 'settings#updateWatermarkSettings', 'url' => 'settings/watermark', 'verb' => 'POST'],
		['name' => 'settings#updateUIDefaults', 'url' => 'settings/uidefaults', 'verb' => 'POST'],
		['name' => 'settings#checkSettings', 'url' => 'settings/check', 'verb' => 'GET'],
		['name' => 'settings#demoServers', 'url' => 'settings/demo', 'verb' => 'GET'],

		//Mobile access
		['name' => 'directView#show', 'url' => '/direct/{token}', 'verb' => 'GET'],

		//assets
		['name' => 'assets#create', 'url' => 'assets', 'verb' => 'POST'],
		['name' => 'assets#get', 'url' => 'assets/{token}', 'verb' => 'GET'],

		// templates
		['name' => 'templates#getPreview', 'url' => '/template/preview/{fileId}', 'verb' => 'GET'],
		['name' => 'templates#add', 'url' => '/template', 'verb' => 'POST'],
		['name' => 'templates#delete', 'url' => '/template/{fileId}', 'verb' => 'DELETE'],
	],
	'ocs' => [
		['name' => 'OCS#create', 'url' => '/api/v1/document', 'verb' => 'POST'],
		['name' => 'OCS#getTemplates', 'url' => '/api/v1/templates/{type}', 'verb' => 'GET'],
		['name' => 'OCS#createFromTemplate', 'url' => '/api/v1/templates/new', 'verb' => 'POST'],

		['name' => 'Federation#index', 'url' => '/api/v1/federation', 'verb' => 'GET'],
		['name' => 'Federation#remoteWopiToken', 'url' => '/api/v1/federation', 'verb' => 'POST'],
		['name' => 'Federation#remoteDirectToken', 'url' => '/api/v1/federation/direct', 'verb' => 'POST'],

	],
];
