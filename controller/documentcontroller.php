<?php
/**
 * ownCloud - Documents App
 *
 * @author Victor Dubiniuk
 * @copyright 2014 Victor Dubiniuk victor.dubiniuk@gmail.com
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later.
 */

namespace OCA\Documents\Controller;

use \OCP\AppFramework\Controller;
use \OCP\IRequest;
use \OCP\IConfig;
use \OCP\IL10N;
use \OCP\AppFramework\Http\JSONResponse;

use \OCA\Documents\Db;
use \OCA\Documents\Helper;
use \OCA\Documents\Storage;
use \OCA\Documents\Download;
use \OCA\Documents\DownloadResponse;
use \OCA\Documents\File;
use OCA\Documents\Genesis;
use \OC\Files\View;

class DocumentController extends Controller{
	
	private $uid;
	private $l10n;
	private $settings;
	
	const ODT_TEMPLATE_PATH = '/assets/new.odt';
	
	public function __construct($appName, IRequest $request, IConfig $settings, IL10N $l10n, $uid){
		parent::__construct($appName, $request);
		$this->uid = $uid;
		$this->l10n = $l10n;
		$this->settings = $settings;
	}
	
	/**
	 * @NoAdminRequired
	 */
	public function create(){
		$view = new View('/' . $this->uid . '/files');
		$dir = $this->settings->getUserValue($this->uid, $this->appName, 'save_path', '/');
		if (!$view->is_dir($dir)){
			$dir = '/';
		}
		$path = Helper::getNewFileName($view, $dir . '/New Document.odt');
		
		$content = '';
		if (class_exists('\OC\Files\Type\TemplateManager')){
			$manager = \OC_Helper::getFileTemplateManager();
			$content = $manager->getTemplate(Storage::MIMETYPE_LIBREOFFICE_WORDPROCESSOR);
		}
		
		if (!$content){
			$content = file_get_contents(dirname(__DIR__) . self::ODT_TEMPLATE_PATH);
		}
		
		if ($content && $view->file_put_contents($path, $content)){
			$info = $view->getFileInfo($path);
			$response =  array(
				'status' => 'success',
				'fileid' => $info['fileid']
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
			if($fileInfo->getMimeType() !== \OCA\Documents\Filter\Office::NATIVE_MIMETYPE){
				$file = new File($fileInfo->getId());
				$genesis = new Genesis($file);
				$fullPath = $genesis->getPath();
			}
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
	 * lists the documents the user has access to (including shared files, once the code in core has been fixed)
	 * also adds session and member info for these files
	 */
	public function listAll(){
		$found = Storage::getDocuments();

		$fileIds = array();
		$documents = array();
		foreach ($found as $key=>$document) {
			if (is_object($document)){
				$documents[] = $document->getData();
			} else {
				$documents[$key] = $document;
			}
			$documents[$key]['icon'] = preg_replace('/\.png$/', '.svg', \OC_Helper::mimetypeIcon($document['mimetype']));
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
	
}
