<?php
/**
 * SPDX-FileCopyrightText: 2016 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\AppInfo;

return [
	'routes' => [
		// Page rendering of documents
		['name' => 'document#index', 'url' => 'index', 'verb' => 'GET'],
		['name' => 'document#remote', 'url' => 'remote', 'verb' => 'GET'],
		['name' => 'document#remotePost', 'url' => 'remote', 'verb' => 'POST'],
		['name' => 'document#createFromTemplate', 'url' => 'indexTemplate', 'verb' => 'GET'],
		['name' => 'document#publicPage', 'url' => '/public', 'verb' => 'GET'],
		['name' => 'document#token', 'url' => '/token', 'verb' => 'POST'],
		['name' => 'document#heartbeat', 'url' => '/heartbeat', 'verb' => 'GET'],

		['name' => 'document#editOnline', 'url' => 'editonline', 'verb' => 'GET'],
		['name' => 'document#editOnlineTarget', 'url' => 'editonline/{fileId}/{target}', 'verb' => 'GET'],

		// external api access
		['name' => 'document#extAppGetData', 'url' => '/ajax/extapp/data/{fileId}', 'verb' => 'POST'],

		// Settings
		['name' => 'settings#setPersonalSettings', 'url' => 'ajax/personal.php', 'verb' => 'POST'],
		['name' => 'settings#setSettings', 'url' => 'ajax/admin.php', 'verb' => 'POST'],
		['name' => 'settings#getSettings', 'url' => 'ajax/settings.php', 'verb' => 'GET'],
		['name' => 'settings#updateWatermarkSettings', 'url' => 'settings/watermark', 'verb' => 'POST'],
		['name' => 'settings#checkSettings', 'url' => 'settings/check', 'verb' => 'GET'],
		['name' => 'settings#demoServers', 'url' => 'settings/demo', 'verb' => 'GET'],
		['name' => 'settings#getFontNames', 'url' => 'settings/fonts', 'verb' => 'GET'],
		['name' => 'settings#getJsonFontList', 'url' => 'settings/fonts.json', 'verb' => 'GET'],
		['name' => 'settings#getFontFile', 'url' => 'settings/fonts/{name}', 'verb' => 'GET'],
		['name' => 'settings#getFontFileOverview', 'url' => 'settings/fonts/{name}/overview', 'verb' => 'GET'],
		['name' => 'settings#deleteFontFile', 'url' => 'settings/fonts/{name}', 'verb' => 'DELETE'],
		['name' => 'settings#uploadFontFile', 'url' => 'settings/fonts', 'verb' => 'POST'],
		[
			'name' => 'settings#getSettingsFile',
			'url' => 'settings/{type}/{token}/{category}/{name}',
			'verb' => 'GET',
			'requirements' => [
				'type' => '[a-zA-Z0-9_\-]+',
				'category' => '[a-zA-Z0-9_\-]+',
				'name' => '.+',
			],
		],
		['name' => 'settings#generateIframeToken', 'url' => 'settings/generateToken/{type}', 'verb' => 'GET'],

		// Direct Editing: Webview
		['name' => 'directView#show', 'url' => '/direct/{token}', 'verb' => 'GET'],

		// Direct Editing: Assets
		['name' => 'assets#create', 'url' => 'assets', 'verb' => 'POST'],
		['name' => 'assets#createFromTask', 'url' => 'assets/tasks', 'verb' => 'POST'],
		['name' => 'assets#get', 'url' => 'assets/{token}', 'verb' => 'GET'],

		// templates
		['name' => 'templates#getPreview', 'url' => '/template/preview/{fileId}', 'verb' => 'GET'],
		['name' => 'templates#add', 'url' => '/template', 'verb' => 'POST'],
		['name' => 'templates#delete', 'url' => '/template/{fileId}', 'verb' => 'DELETE'],
	],
	'ocs' => [
		// Public pages: new file creation
		['name' => 'documentAPI#create', 'url' => '/api/v1/file', 'verb' => 'POST'],
		['name' => 'documentAPI#openLocal', 'url' => '/api/v1/local', 'verb' => 'POST'],

		// Client API endpoints
		['name' => 'OCS#createDirect', 'url' => '/api/v1/document', 'verb' => 'POST'],
		['name' => 'OCS#createPublic', 'url' => '/api/v1/share', 'verb' => 'POST'],
		['name' => 'OCS#createPublicFromInitiator', 'url' => '/api/v1/direct/share/initiator', 'verb' => 'POST'],
		['name' => 'OCS#createFromTemplate', 'url' => '/api/v1/templates/new', 'verb' => 'POST'],
		['name' => 'OCS#getTemplates', 'url' => '/api/v1/templates/{type}', 'verb' => 'GET'],

		['name' => 'OCS#updateGuestName', 'url' => '/api/v1/wopi/guestname', 'verb' => 'POST'],

		['name' => 'Federation#index', 'url' => '/api/v1/federation', 'verb' => 'GET'],
		['name' => 'Federation#remoteWopiToken', 'url' => '/api/v1/federation', 'verb' => 'POST'],
		['name' => 'Federation#initiatorUser', 'url' => '/api/v1/federation/user', 'verb' => 'POST'],

		['name' => 'Target#getTargets', 'url' => '/api/v1/targets', 'verb' => 'GET'],
		['name' => 'Target#getPreview', 'url' => '/api/v1/targets/preview', 'verb' => 'GET'],

		['name' => 'TemplateField#extractFields', 'url' => '/api/v1/template/fields/extract/{fileId}', 'verb' => 'GET'],
		['name' => 'TemplateField#fillFields', 'url' => '/api/v1/template/fields/fill/{fileId}', 'verb' => 'POST'],

		['name' => 'Mention#mention', 'url' => '/api/v1/mention/{fileId}', 'verb' => 'POST'],
	],
];
