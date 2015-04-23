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
use \OCP\AppFramework\Http;
use \OCP\AppFramework\Http\JSONResponse;


use \OCA\Documents\Db;
use \OCA\Documents\File;
use \OCA\Documents\Helper;
use OCA\Documents\Filter;
use \OC\Files\View;

class BadRequestException extends \Exception {

	protected $body = "";

	public function setBody($body){
		$this->body = $body;
	}

	public function getBody(){
		return $this->body;
	}
}

class SessionController extends Controller{
	
	protected $uid;
	protected $logger;

	public function __construct($appName, IRequest $request, $logger, $uid){
		parent::__construct($appName, $request);
		$this->uid = $uid;
		$this->logger = $logger;
	}
	
	/**
	 * @NoAdminRequired
	 * @PublicPage
	 */
	public function joinAsGuest($token, $name){
		$uid = substr($name, 0, 16);
		
		try {
			$file = File::getByShareToken($token);
			if ($file->isPasswordProtected() && !$file->checkPassword('')){
				throw new \Exception('Not authorized');
			}

			$response = array_merge( 
				Db\Session::start($uid, $file),
				array('status'=>'success')
			);
		} catch (\Exception $e){
			$this->logger->warning('Starting a session failed. Reason: ' . $e->getMessage(), array('app' => $this->appName));
			$response = array (
				'status'=>'error'
			);
		}
		
		return $response;
	}
	
	/**
	 * @NoAdminRequired
	 */
	public function joinAsUser($fileId){
		try {
			$view = \OC\Files\Filesystem::getView();
			$path = $view->getPath($fileId);
			
			if ($view->isUpdatable($path)) {
				$file = new File($fileId);
				$response = Db\Session::start($this->uid, $file);
			} else {
				$info = $view->getFileInfo($path);
				$response = array(
					'permissions' => $info['permissions'],
					'id' => $fileId
				);
			}
			$response = array_merge( 
					$response,
					array('status'=>'success')
			);
		} catch (\Exception $e){
			$this->logger->warning('Starting a session failed. Reason: ' . $e->getMessage(), array('app' => $this->appName));
			$response = array (
				'status'=>'error'
			);
		}
		
		return $response;
	}
	
	/**
	 * @NoAdminRequired
	 * @PublicPage
	 */
	public function poll($command, $args){
		$response = new JSONResponse();

		try{
			$esId = isset($args['es_id']) ? $args['es_id'] : null;
	
			$session = new Db\Session();
			$session->load($esId);
	
			$memberId = isset($args['member_id']) ? $args['member_id'] : null;
			$member = new Db\Member();
			$member->load($memberId);
	
			if (!$member->getIsGuest()){
				\OCP\JSON::checkLoggedIn();
			}

			try {
				new File($session->getFileId());
			} catch (\Exception $e){
				$this->logger->warning('Error. Session no longer exists. ' . $e->getMessage(), array('app' => $this->appName));
				$ex = new BadRequestException();
				$ex->setBody(
						implode(',', $this->request->getParams())
				);
				throw $ex;
			}
	
			switch ($command){
				case 'sync_ops':
					$seqHead = (string) isset($args['seq_head']) ? $args['seq_head'] : null;
					if (!is_null($seqHead)){
						$ops = isset($args['client_ops']) ? $args['client_ops'] : array();
						
						$op = new Db\Op();
						$currentHead = $op->getHeadSeq($esId);
				
						try {
							$member->updateActivity($memberId);
						} catch (\Exception $e){
							//Db error. Not critical
						}
						$response->setData(
								$session->syncOps($memberId, $currentHead, $seqHead, $ops)
						);

						$inactiveMembers = $member->updateByTimeout($esId);
						foreach ($inactiveMembers as $inactive){
							$op->removeCursor($esId, $inactive);
							$op->removeMember($esId, $inactive);
						}
					} else {
						// Error - no seq_head passed
						throw new BadRequestException();
					}

					break;
				default:
					$ex = new BadRequestException();
					$ex->setBody(
							implode(',', $this->request->getParams())
					);
					throw $ex;
			}
		} catch (BadRequestException $e){
			$response->setStatus(Http::STATUS_BAD_REQUEST);
			$response->setData(
					array('err' => 'bad request:[' . $e->getBody() . ']')
			);
		}
		return $response;
	}
	
	
	/**
	 * @NoAdminRequired
	 * @PublicPage
	 * Store the document content to its origin
	 */
	public function save(){
		try {
			$esId = $this->request->server['HTTP_WEBODF_SESSION_ID'];
			if (!$esId){
				throw new \Exception('Session id can not be empty');
			}
			
			$memberId = $this->request->server['HTTP_WEBODF_MEMBER_ID'];
			$currentMember = new Db\Member();
			$currentMember->load($memberId);
			
			//check if member belongs to the session
			if ($esId != $currentMember->getEsId()){
				throw new \Exception($memberId . ' does not belong to session ' . $esId);
			}
			
			// Extra info for future usage
			// $sessionRevision = $this->request->server['HTTP_WEBODF_SESSION_REVISION'];
			
			//NB ouch! New document content is passed as an input stream content
			$stream = fopen('php://input','r');
			if (!$stream){
				throw new \Exception('New content missing');
			}
			$content = stream_get_contents($stream);

			$session = new Db\Session();
			$session->load($esId);
			
			if (!$session->getEsId()){
				throw new \Exception('Session does not exist');
			}

			try {
				if ($currentMember->getIsGuest()){
					$file = File::getByShareToken($currentMember->getToken());
				} else {
					$file = new File($session->getFileId());
				}
				
				list($view, $path) = $file->getOwnerViewAndPath(true);
			} catch (\Exception $e){
				//File was deleted or unshared. We need to save content as new file anyway
				//Sorry, but for guests it would be lost :(
				if ($this->uid){
					$view = new View('/' . $this->uid . '/files');
		
					$dir = \OCP\Config::getUserValue($this->uid, 'documents', 'save_path', '');
					$path = Helper::getNewFileName($view, $dir . 'New Document.odt');
				} else {
					throw $e;
				}
			}
			
			$member = new Db\Member();
			$members = $member->getActiveCollection($esId);
			$memberIds = array_map(
				function($x){
					return ($x['member_id']);
				},
				$members
			);
			
			// Active users except current user
			$memberCount = count($memberIds) - 1;
			
			if ($view->file_exists($path)){
				$currentHash = sha1($view->file_get_contents($path));
				
				if (!Helper::isVersionsEnabled() && $currentHash !== $session->getGenesisHash()){
					// Original file was modified externally. Save to a new one
					$path = Helper::getNewFileName($view, $path, '-conflict');
				}
				
				$mimetype = $view->getMimeType($path);
			} else {
				$mimetype = Storage::MIMETYPE_LIBREOFFICE_WORDPROCESSOR;
			}
			
			$data = Filter::write($content, $mimetype);
			
			if ($view->file_put_contents($path, $data['content'])){
				// Not a last user
				if ($memberCount>0){
					// Update genesis hash to prevent conflicts
					$this->logger->debug('Update hash', array('app' => $this->appName));
					$session->updateGenesisHash($esId, sha1($data['content']));
				} else {
					// Last user. Kill session data
					Db\Session::cleanUp($esId);
				}
				
				$view->touch($path);
			}
			$response = array('status'=>'success');
		} catch (\Exception $e){
			$this->logger->warning('Saving failed. Reason:' . $e->getMessage(), array('app' => $this->appName));
			\OC_Response::setStatus(500);
			$response = array();
		}

		return $response;
	}
}
