<?php
/**
 * ownCloud - Richdocuments App
 *
 * @author Victor Dubiniuk
 * @copyright 2014 Victor Dubiniuk victor.dubiniuk@gmail.com
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later.
 */

namespace OCA\Richdocuments\Controller;

use \OCP\AppFramework\Controller;
use \OCP\IRequest;
use \OCP\IConfig;
use \OCP\IL10N;
use \OCP\AppFramework\Http\ContentSecurityPolicy;
use \OCP\AppFramework\Http\JSONResponse;
use \OCP\AppFramework\Http\TemplateResponse;

use \OCA\Richdocuments\AppConfig;
use \OCA\Richdocuments\Db;
use \OCA\Richdocuments\Helper;
use \OCA\Richdocuments\Storage;
use \OCA\Richdocuments\Download;
use \OCA\Richdocuments\DownloadResponse;
use \OCA\Richdocuments\File;
use \OCA\Richdocuments\Genesis;
use \OC\Files\View;
use \OCP\ICacheFactory;
use \OCP\ILogger;

class ResponseException extends \Exception {
	private $hint;

	public function __construct($description, $hint = '') {
		parent::__construct($description);
		$this->hint = $hint;
	}

	public function getHint() {
		return $this->hint;
	}
}

class DocumentController extends Controller {

	private $uid;
	private $l10n;
	private $settings;
	private $appConfig;
	private $cache;
	private $logger;
	const ODT_TEMPLATE_PATH = '/assets/odttemplate.odt';

	public function __construct($appName, IRequest $request, IConfig $settings, AppConfig $appConfig, IL10N $l10n, $uid, ICacheFactory $cache, ILogger $logger){
		parent::__construct($appName, $request);
		$this->uid = $uid;
		$this->l10n = $l10n;
		$this->settings = $settings;
		$this->appConfig = $appConfig;
		$this->cache = $cache->create($appName);
		$this->logger = $logger;
	}

	/**
	 * @param \SimpleXMLElement $discovery
	 * @param string $mimetype
	 */
	private function getWopiSrcUrl($discovery_parsed, $mimetype) {
		if(is_null($discovery_parsed) || $discovery_parsed == false) {
			return null;
		}

		$result = $discovery_parsed->xpath(sprintf('/wopi-discovery/net-zone/app[@name=\'%s\']/action', $mimetype));
		if ($result && count($result) > 0) {
			return array(
				'urlsrc' => (string)$result[0]['urlsrc'],
				'action' => (string)$result[0]['name']
			);
		}

		return null;
	}

	/**
	 * Log the user with given $userid.
	 * This function should only be used from public controller methods where no
	 * existing session exists, for example, when loolwsd is directly calling a
	 * public method with its own access token. After validating the access
	 * token, and retrieving the correct user with help of access token, it can
	 * be set as current user with help of this method.
	 *
	 * @param string $userid
	 */
	private function loginUser($userid) {
		\OC_Util::tearDownFS();

		$users = \OC::$server->getUserManager()->search($userid, 1, 0);
		if (count($users) > 0) {
			$user = array_shift($users);
			if (strcasecmp($user->getUID(), $userid) === 0) {
				// clear the existing sessions, if any
				\OC::$server->getSession()->close();

				// initialize a dummy memory session
				$session = new \OC\Session\Memory('');
				// wrap it
				$cryptoWrapper = \OC::$server->getSessionCryptoWrapper();
				$session = $cryptoWrapper->wrapSession($session);
				// set our session
				\OC::$server->setSession($session);

				\OC::$server->getUserSession()->setUser($user);
			}
		}

		\OC_Util::setupFS();
	}

	/**
	 * Log out the current user
	 * This is helpful when we are artifically logged in as someone
	 */
	private function logoutUser() {
		\OC_Util::tearDownFS();

		\OC::$server->getSession()->close();
	}

	private function responseError($message, $hint = ''){
		$errors = array('errors' => array(array('error' => $message, 'hint' => $hint)));
		$response = new TemplateResponse('', 'error', $errors, 'error');
		return $response;
	}

    /**
     * Return the original wopi url or test wopi url
     */
	private function getWopiUrl($tester) {
		$wopiurl = '';
		if ($tester) {
			$wopiurl = $this->appConfig->getAppValue('test_wopi_url');
		} else {
			$wopiurl = $this->appConfig->getAppValue('wopi_url');
		}

		return $wopiurl;
	}

	/**
     * Return true if the currently logged in user is a tester.
     * This depends on whether current user is the member of one of the groups
     * mentioned in settings (test_server_groups)
     */
     private function isTester() {
		 $tester = false;

         $user = \OC::$server->getUserSession()->getUser()->getUID();
         $testgroups = array_filter(explode('|', $this->appConfig->getAppValue('test_server_groups')));
         \OC::$server->getLogger()->debug('Testgroups are {testgroups}', [
             'app' => $this->appName,
             'testgroups' => $testgroups
         ]);
         foreach ($testgroups as $testgroup) {
             $test = \OC::$server->getGroupManager()->get($testgroup);
             if (sizeof($test->searchUsers($user)) > 0) {
                 \OC::$server->getLogger()->debug('User {user} found in {group}', [
                     'app' => $this->appName,
                     'user' => $user,
                     'group' => $testgroup
                 ]);

				 $tester = true;
				 break;
             }
         }

         return $tester;
     }

	/** Return the content of discovery.xml - either from cache, or download it.
	 */
	private function getDiscovery(){
		\OC::$server->getLogger()->debug('getDiscovery(): Getting discovery.xml from the cache.');

		$tester = $this->isTester();
		$wopiRemote = $this->getWopiUrl($tester);
		$discoveryKey = 'discovery.xml';
		if ($tester) {
			$discoveryKey = 'discovery.xml_test';
		}
		// Provides access to information about the capabilities of a WOPI client
		// and the mechanisms for invoking those abilities through URIs.
		$wopiDiscovery = $wopiRemote . '/hosting/discovery';

		// Read the memcached value (if the memcache is installed)
		$discovery = $this->cache->get($discoveryKey);

		if (is_null($discovery)) {
			$contact_admin = $this->l10n->t('Please contact the "%s" administrator.', array($wopiRemote));

			try {
				$wopiClient = \OC::$server->getHTTPClientService()->newClient();
				$discovery = $wopiClient->get($wopiDiscovery)->getBody();
			}
			catch (\Exception $e) {
				$error_message = $e->getMessage();
				if (preg_match('/^cURL error ([0-9]*):/', $error_message, $matches)) {
					$admin_check = $this->l10n->t('Please ask your administrator to check the Collabora Online server setting. The exact error message was: ') . $error_message;

					$curl_error = $matches[1];
					switch ($curl_error) {
					case '1':
						throw new ResponseException($this->l10n->t('Collabora Online: The protocol specified in "%s" is not allowed.', array($wopiRemote)), $admin_check);
					case '3':
						throw new ResponseException($this->l10n->t('Collabora Online: Malformed URL "%s".', array($wopiRemote)), $admin_check);
					case '6':
						throw new ResponseException($this->l10n->t('Collabora Online: Cannot resolve the host "%s".', array($wopiRemote)), $admin_check);
					case '7':
						throw new ResponseException($this->l10n->t('Collabora Online: Cannot connect to the host "%s".', array($wopiRemote)), $admin_check);
					case '60':
						throw new ResponseException($this->l10n->t('Collabora Online: SSL certificate is not installed.'), $this->l10n->t('Please ask your administrator to add ca-chain.cert.pem to the ca-bundle.crt, for example "cat /etc/loolwsd/ca-chain.cert.pem >> <server-installation>/resources/config/ca-bundle.crt" . The exact error message was: ') . $error_message);
					}
				}
				throw new ResponseException($this->l10n->t('Collabora Online unknown error: ') . $error_message, $contact_admin);
			}

			if (!$discovery) {
				throw new ResponseException($this->l10n->t('Collabora Online: Unable to read discovery.xml from "%s".', array($wopiRemote)), $contact_admin);
			}

			\OC::$server->getLogger()->debug('Storing the discovery.xml under key ' . $discoveryKey . ' to the cache.');
			$this->cache->set($discoveryKey, $discovery, 3600);
		}

		return $discovery;
	}

	/** Prepare document(s) structure
	 */
	private function prepareDocuments($rawDocuments){
		$discovery_parsed = null;
		try {
			$discovery = $this->getDiscovery();

			$loadEntities = libxml_disable_entity_loader(true);
			$discovery_parsed = simplexml_load_string($discovery);
			libxml_disable_entity_loader($loadEntities);

			if ($discovery_parsed === false) {
				$this->cache->remove('discovery.xml');
				$wopiRemote = $this->getWopiUrl($this->isTester());

				return array(
					'status' => 'error',
					'message' => $this->l10n->t('Collabora Online: discovery.xml from "%s" is not a well-formed XML string.', array($wopiRemote)),
					'hint' => $this->l10n->t('Please contact the "%s" administrator.', array($wopiRemote))
				);
			}
		}
		catch (ResponseException $e) {
			return array(
				'status' => 'error',
				'message' => $e->getMessage(),
				'hint' => $e->getHint()
			);
		}

		$fileIds = array();
		$documents = array();
		$lolang = strtolower(str_replace('_', '-', $this->settings->getUserValue($this->uid, 'core', 'lang', 'en')));
		foreach ($rawDocuments as $key=>$document) {
			if (is_object($document)){
				$documents[] = $document->getData();
			} else {
				$documents[$key] = $document;
			}
			$documents[$key]['icon'] = preg_replace('/\.png$/', '.svg', \OCP\Template::mimetype_icon($document['mimetype']));
			$documents[$key]['hasPreview'] = \OC::$server->getPreviewManager()->isMimeSupported($document['mimetype']);
			$ret = $this->getWopiSrcUrl($discovery_parsed, $document['mimetype']);
			$documents[$key]['urlsrc'] = $ret['urlsrc'];
			$documents[$key]['action'] = $ret['action'];
			$documents[$key]['lolang'] = $lolang;
			$fileIds[] = $document['fileid'];
		}

		usort($documents, function($a, $b){
			return @$b['mtime']-@$a['mtime'];
		});

		$session = new Db\Session();
		$sessions = $session->getCollectionBy('file_id', $fileIds);

		$members = array();
		$member = new Db\Member();
		foreach ($sessions as $session) {
			$members[$session['es_id']] = $member->getActiveCollection($session['es_id']);
		}

		return array(
			'status' => 'success', 'documents' => $documents,'sessions' => $sessions,'members' => $members
		);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 */
	public function index(){
		$wopiRemote = $this->getWopiUrl($this->isTester());
		if (($parts = parse_url($wopiRemote)) && isset($parts['scheme']) && isset($parts['host'])) {
			$webSocketProtocol = "ws://";
			if ($parts['scheme'] == "https") {
				$webSocketProtocol = "wss://";
			}
			$webSocket = sprintf(
				"%s%s%s",
				$webSocketProtocol,
				$parts['host'],
				isset($parts['port']) ? ":" . $parts['port'] : "");
		}
		else {
			return $this->responseError($this->l10n->t('Collabora Online: Invalid URL "%s".', array($wopiRemote)), $this->l10n->t('Please ask your administrator to check the Collabora Online server setting.'));
		}

		$user = \OC::$server->getUserSession()->getUser();
		$usergroups = array_filter(\OC::$server->getGroupManager()->getUserGroupIds($user));
		$usergroups = join('|', $usergroups);
		\OC::$server->getLogger()->debug('User is in groups: {groups}', [ 'app' => $this->appName, 'groups' => $usergroups ]);

		\OC::$server->getNavigationManager()->setActiveEntry( 'richdocuments_index' );
		$maxUploadFilesize = \OCP\Util::maxUploadFilesize("/");
		$response = new TemplateResponse('richdocuments', 'documents', [
			'enable_previews' =>		$this->settings->getSystemValue('enable_previews', true),
			'uploadMaxFilesize' =>		$maxUploadFilesize,
			'uploadMaxHumanFilesize' =>	\OCP\Util::humanFileSize($maxUploadFilesize),
			'allowShareWithLink' =>		$this->settings->getAppValue('core', 'shareapi_allow_links', 'yes'),
			'wopi_url' =>			$webSocket,
			'doc_format' =>			$this->appConfig->getAppValue('doc_format')
		]);

		$policy = new ContentSecurityPolicy();
		$policy->addAllowedScriptDomain('\'self\' http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js http://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.12/jquery.mousewheel.min.js \'unsafe-eval\' ' . $wopiRemote);
		/* frame-src is deprecated on Firefox, but Safari wants it! */
		$policy->addAllowedFrameDomain('\'self\' http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js http://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.12/jquery.mousewheel.min.js \'unsafe-eval\' ' . $wopiRemote);
		$policy->addAllowedChildSrcDomain('\'self\' http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js http://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.12/jquery.mousewheel.min.js \'unsafe-eval\' ' . $wopiRemote);
		$policy->addAllowedConnectDomain($webSocket);
		$policy->addAllowedImageDomain('*');
		$policy->allowInlineScript(true);
		$policy->addAllowedFontDomain('data:');
		$response->setContentSecurityPolicy($policy);

		return $response;
	}

	/**
	 * @NoAdminRequired
	 */
	public function create(){
		$mimetype = $this->request->post['mimetype'];
		$filename = $this->request->post['filename'];
		$dir = $this->request->post['dir'];

		$view = new View('/' . $this->uid . '/files');
		if (!$dir){
			$dir = '/';
		}

		$basename = $this->l10n->t('New Document.odt');
		switch ($mimetype) {
			case 'application/vnd.oasis.opendocument.spreadsheet':
				$basename = $this->l10n->t('New Spreadsheet.ods');
				break;
			case 'application/vnd.oasis.opendocument.presentation':
				$basename = $this->l10n->t('New Presentation.odp');
				break;
			case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
				$basename = $this->l10n->t('New Document.docx');
				break;
			case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
				$basename = $this->l10n->t('New Spreadsheet.xlsx');
				break;
			case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
				$basename = $this->l10n->t('New Presentation.pptx');
				break;
			default:
				// to be safe
				$mimetype = 'application/vnd.oasis.opendocument.text';
				break;
		}

		if (!$filename){
			$path = Helper::getNewFileName($view, $dir . '/' . $basename);
		} else {
			$path = $dir . '/' . $filename;
		}

		$content = '';
		if (class_exists('\OC\Files\Type\TemplateManager')){
			$manager = \OC_Helper::getFileTemplateManager();
			$content = $manager->getTemplate($mimetype);
		}

		if (!$content){
			$content = file_get_contents(dirname(__DIR__) . self::ODT_TEMPLATE_PATH);
		}

		$discovery_parsed = null;
		try {
			$discovery = $this->getDiscovery();

			$loadEntities = libxml_disable_entity_loader(true);
			$discovery_parsed = simplexml_load_string($discovery);
			libxml_disable_entity_loader($loadEntities);

			if ($discovery_parsed === false) {
				$this->cache->remove('discovery.xml');
				$wopiRemote = $this->getWopiUrl($this->isTester());

				return array(
					'status' => 'error',
					'message' => $this->l10n->t('Collabora Online: discovery.xml from "%s" is not a well-formed XML string.', array($wopiRemote)),
					'hint' => $this->l10n->t('Please contact the "%s" administrator.', array($wopiRemote))
				);
			}
		}
		catch (ResponseException $e) {
			return array(
				'status' => 'error',
				'message' => $e->getMessage(),
				'hint' => $e->getHint()
			);
		}

		if ($content && $view->file_put_contents($path, $content)){
			$info = $view->getFileInfo($path);
			$ret = $this->getWopiSrcUrl($discovery_parsed, $mimetype);
			$response =  array(
				'status' => 'success',
				'fileid' => $info['fileid'],
				'urlsrc' => $ret['urlsrc'],
				'action' => $ret['action'],
				'lolang' => $this->settings->getUserValue($this->uid, 'core', 'lang', 'en'),
				'data' => \OCA\Files\Helper::formatFileInfo($info)
			);
		} else {
			$response =  array(
				'status' => 'error',
				'message' => (string) $this->l10n->t('Can\'t create document')
			);
		}
		return $response;
	}

	/**
	 * @NoAdminRequired
	 * Generates and returns an access token for a given fileId.
	 * Only for authenticated users!
	 */
	public function wopiGetToken($fileId){
		$arr = explode('_', $fileId, 2);
		$version = '0';
		if (count($arr) == 2) {
			$fileId = $arr[0];
			$version = $arr[1];
		}

		\OC::$server->getLogger()->debug('Generating WOPI Token for file {fileId}, version {version}.', [ 'app' => $this->appName, 'fileId' => $fileId, 'version' => $version ]);

		$view = \OC\Files\Filesystem::getView();
		$path = $view->getPath($fileId);
		$updatable = (bool)$view->isUpdatable($path);

		// Check if the editor (user who is accessing) is in editable group
		// UserCanWrite only if
		// 1. No edit groups are set or
		// 2. if they are set, it is in one of the edit groups
		$editorUid = \OC::$server->getUserSession()->getUser()->getUID();
		$editGroups = array_filter(explode('|', $this->appConfig->getAppValue('edit_groups')));
		if ($updatable && count($editGroups) > 0) {
			$updatable = false;
			foreach($editGroups as $editGroup) {
				$editorGroup = \OC::$server->getGroupManager()->get($editGroup);
				if (sizeof($editorGroup->searchUsers($editorUid)) > 0) {
					\OC::$server->getLogger()->debug("Editor {editor} is in edit group {group}", [
						'app' => $this->appName,
						'editor' => $editorUid,
						'group' => $editGroup
					]);
					$updatable = true;
				}
			}
		}

		// If token is for some versioned file
		if ($version !== '0') {
			\OC::$server->getLogger()->debug('setting updatable to false');
			$updatable = false;
		}

		\OC::$server->getLogger()->debug('File with {fileid} has updatable set to {updatable}', [ 'app' => $this->appName, 'fileid' => $fileId, 'updatable' => $updatable ]);

		$row = new Db\Wopi();
		$token = $row->generateFileToken($fileId, $version, $updatable);

		// Return the token.
		return array(
			'status' => 'success',
			'token' => $token
		);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @PublicPage
	 * Returns general info about a file.
	 */
	public function wopiCheckFileInfo($fileId){
		$token = $this->request->getParam('access_token');

		$arr = explode('_', $fileId, 2);
		$version = '0';
		if (count($arr) == 2) {
			$fileId = $arr[0];
			$version = $arr[1];
		}

		\OC::$server->getLogger()->debug('Getting info about file {fileId}, version {version} by token {token}.', [ 'app' => $this->appName, 'fileId' => $fileId, 'version' => $version, 'token' => $token ]);

		$row = new Db\Wopi();
		$row->loadBy('token', $token);

		$res = $row->getPathForToken($fileId, $version, $token);
		if ($res == false || http_response_code() != 200)
		{
			return false;
		}

		// Login the user to see his mount locations
		$this->loginUser($res['owner']);
		$view = new \OC\Files\View('/' . $res['owner'] . '/files');
		$info = $view->getFileInfo($res['path']);

		$this->logoutUser();

		if (!$info) {
			http_response_code(404);
			return false;
		}

		$editorName = \OC::$server->getUserManager()->get($res['editor'])->getDisplayName();
		return array(
			'BaseFileName' => $info['name'],
			'Size' => $info['size'],
			'Version' => $version,
			'UserId' => $res['editor'],
			'UserFriendlyName' => $editorName,
			'UserCanWrite' => $res['canwrite'] ? 'true' : 'false'
		);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @PublicPage
	 * Given an access token and a fileId, returns the contents of the file.
	 * Expects a valid token in access_token parameter.
	 */
	public function wopiGetFile($fileId){
		$token = $this->request->getParam('access_token');

		$arr = explode('_', $fileId, 2);
		$version = '0';
		if (count($arr) == 2) {
			$fileId = $arr[0];
			$version = $arr[1];
		}

		\OC::$server->getLogger()->debug('Getting contents of file {fileId}, version {version} by token {token}.', [ 'app' => $this->appName, 'fileId' => $fileId, 'version' => $version, 'token' => $token ]);

		$row = new Db\Wopi();
		$row->loadBy('token', $token);

		//TODO: Support X-WOPIMaxExpectedSize header.
		$res = $row->getPathForToken($fileId, $version, $token);
		$ownerid = $res['owner'];

		// Login the user to see his mount locations
		$this->loginUser($ownerid);

		$filename = '';
		// If some previous version is requested, fetch it from Files_Version app
		if ($version !== '0') {
			\OCP\JSON::checkAppEnabled('files_versions');

			list($ownerid, $filename) = \OCA\Files_Versions\Storage::getUidAndFilename($res['path']);
			$filename = '/files_versions/' . $filename . '.v' . $version;

			\OC_Util::tearDownFS();
		} else {
			$filename = '/files' . $res['path'];
		}

		$this->logoutUser();

		return new DownloadResponse($this->request, $ownerid, $filename);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @PublicPage
	 * Given an access token and a fileId, replaces the files with the request body.
	 * Expects a valid token in access_token parameter.
	 */
	public function wopiPutFile($fileId){
		$token = $this->request->getParam('access_token');

		$arr = explode('_', $fileId, 2);
		$version = '0';
		if (count($arr) == 2) {
			$fileId = $arr[0];
			$version = $arr[1];
		}

		\OC::$server->getLogger()->debug('Putting contents of file {fileId}, version {version} by token {token}.', [ 'app' => $this->appName, 'fileId' => $fileId, 'version' => $version, 'token' => $token ]);

		$row = new Db\Wopi();
		$row->loadBy('token', $token);

		$res = $row->getPathForToken($fileId, $version, $token);
		if (!$res['canwrite']) {
			return array(
				'status' => 'error',
				'message' => 'Permission denied'
			);
		}

		// Log-in as the user to regiser the change under her name.
		$editorid = $res['editor'];
		// This call is made from loolwsd, so we need to initialize the
		// session before we can make the user who opened the document
		// login. This is necessary to make activity app register the
		// change made to this file under this user's (editorid) name.
		$this->loginUser($editorid);

		// Set up the filesystem view for the owner (where the file actually is).
		$userid = $res['owner'];
		$root = '/' . $userid . '/files';
		$view = new \OC\Files\View($root);

		// Read the contents of the file from the POST body and store.
		$content = fopen('php://input', 'r');
		\OC::$server->getLogger()->debug('Storing file {fileId} by {editor} owned by {owner}.', [ 'app' => $this->appName, 'fileId' => $fileId, 'editor' => $editorid, 'owner' => $userid ]);

		// Setup the FS which is needed to emit hooks (versioning).
		\OC_Util::tearDownFS();
		\OC_Util::setupFS($userid);

		$view->file_put_contents($res['path'], $content);

		$this->logoutUser();

		return array(
			'status' => 'success'
		);
	}

	/**
	 * @NoAdminRequired
	 * @PublicPage
	 * Process partial/complete file download
	 */
	public function serve($esId){
		$session = new Db\Session();
		$session->load($esId);

		$filename = $session->getGenesisUrl() ? $session->getGenesisUrl() : '';
		return new DownloadResponse($this->request, $session->getOwner(), $filename);
	}

	/**
	 * @NoAdminRequired
	 */
	public function download($path){
		if (!$path){
			$response = new JSONResponse();
			$response->setStatus(Http::STATUS_BAD_REQUEST);
			return $response;
		}

		$fullPath = '/files' . $path;
		$fileInfo = \OC\Files\Filesystem::getFileInfo($path);
		if ($fileInfo){
			$file = new File($fileInfo->getId());
			$genesis = new Genesis($file);
			$fullPath = $genesis->getPath();
		}
		return new DownloadResponse($this->request, $this->uid, $fullPath);
	}


	/**
	 * @NoAdminRequired
	 */
	public function rename($fileId){
		$name = $this->request->post['name'];

		$view = \OC\Files\Filesystem::getView();
		$path = $view->getPath($fileId);

		if ($name && $view->is_file($path) && $view->isUpdatable($path)) {
			$newPath = dirname($path) . '/' . $name;
			if ($view->rename($path, $newPath)) {
						return array('status' => 'success');
			}
		}
		return array(
			'status' => 'error',
			'message' => (string) $this->l10n->t('You don\'t have permission to rename this document')
		);
	}

	/**
	 * @NoAdminRequired
	 * Get file information about single document with fileId
	 */
	public function get($fileId){
		$documents = array();
		$documents[0] = Storage::getDocumentById($fileId);

		return $this->prepareDocuments($documents);
	}


	/**
	 * @NoAdminRequired
	 * lists the documents the user has access to (including shared files, once the code in core has been fixed)
	 * also adds session and member info for these files
	 */
	public function listAll(){
		return $this->prepareDocuments(Storage::getDocuments());
	}
}
