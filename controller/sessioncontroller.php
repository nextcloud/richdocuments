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
use \OCP\AppFramework\Http;
use \OCP\AppFramework\Http\JSONResponse;

use \OCA\Richdocuments\Db;
use \OCA\Richdocuments\File;
use \OCA\Richdocuments\Helper;
use OCA\Richdocuments\Filter;
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
	protected $shareToken;

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
				[ 'status'=>'success' ]
			);
		} catch (\Exception $e){
			$this->logger->warning('Starting a session failed. Reason: ' . $e->getMessage(), ['app' => $this->appName]);
			$response = [ 'status'=>'error' ];
		}

		return $response;
	}

	/**
	 * @NoAdminRequired
	 * @PublicPage
	 */
	public function pollAsGuest($command, $args){
		$this->shareToken = $this->request->getParam('token');
		return $this->poll($command, $args);
	}

	/**
	 * Store the document content to its origin
	 * @NoAdminRequired
	 * @PublicPage
	 */
	public function saveAsGuest(){
		$this->shareToken = $this->request->getParam('token');
		return $this->save();
	}

	/**
	 * @NoAdminRequired
	 */
	public function join($fileId){
		try {
			$view = \OC\Files\Filesystem::getView();
			$path = $view->getPath($fileId);

			$file = new File($fileId);
			$response = Db\Session::start($this->uid, $file);

			$response = array_merge(
					$response,
					[ 'status'=>'success' ]
			);
		} catch (\Exception $e){
			$this->logger->warning('Starting a session failed. Reason: ' . $e->getMessage(), [ 'app' => $this->appName ]);
			$response = [ 'status'=>'error' ];
		}

		return $response;
	}

	/**
	 * @NoAdminRequired
	 */
	public function poll($command, $args){
		$response = new JSONResponse();

		try{
			$esId = isset($args['es_id']) ? $args['es_id'] : null;
			$session = $this->loadSession($esId);

			$memberId = isset($args['member_id']) ? $args['member_id'] : null;
			$member = $this->loadMember($memberId);

			$this->validateSession($session);

			switch ($command){
				case 'sync_ops':
					$seqHead = (string) isset($args['seq_head']) ? $args['seq_head'] : null;
					if (!is_null($seqHead)){
						$ops = isset($args['client_ops']) ? $args['client_ops'] : [];

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
					[ 'err' => 'bad request:[' . $e->getBody() . ']' ]
			);
		}
		return $response;
	}

	/**
	 * Store the document content to its origin
	 * @NoAdminRequired
	 */
	public function save(){
		$response = new JSONResponse();
		try {
			$esId = $this->request->server['HTTP_WEBODF_SESSION_ID'];
			$session = $this->loadSession($esId);

			$memberId = $this->request->server['HTTP_WEBODF_MEMBER_ID'];
			$currentMember = $this->loadMember($memberId, $esId);

			// Extra info for future usage
			// $sessionRevision = $this->request->server['HTTP_WEBODF_SESSION_REVISION'];

			//NB ouch! New document content is passed as an input stream content
			$stream = fopen('php://input','r');
			if (!$stream){
				throw new \Exception('New content missing');
			}
			$content = stream_get_contents($stream);

			try {
				if ($currentMember->getIsGuest()){
					$file = File::getByShareToken($currentMember->getToken());
				} else {
					$file = new File($session->getFileId());
				}

				$view = $file->getOwnerView(true);
				$path = $file->getPath(true);
			} catch (\Exception $e){
				//File was deleted or unshared. We need to save content as new file anyway
				//Sorry, but for guests it would be lost :(
				if ($this->uid){
					$view = new View('/' . $this->uid . '/files');

					$dir = '/';
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
				$currentHash = $view->hash('sha1', $path, false);

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
					$this->logger->debug('Update hash', [ 'app' => $this->appName ]);
					$session->updateGenesisHash($esId, sha1($data['content']));
				} else {
					// Last user. Kill session data
					Db\Session::cleanUp($esId);
				}

				$view->touch($path);
			}
			$response->setData(['status'=>'success']);
		} catch (\Exception $e){
			$response->setStatus(Http::STATUS_INTERNAL_SERVER_ERROR);
			$response->setData([]);
			$this->logger->warning('Saving failed. Reason:' . $e->getMessage(), [ 'app' => $this->appName ]);
		}

		return $response;
	}

	protected function validateSession($session){
		try {
			if (is_null($this->shareToken)) {
				new File($session->getFileId());
			} else {
				File::getByShareToken($this->shareToken);
			}
		} catch (\Exception $e){
			$this->logger->warning('Error. Session no longer exists. ' . $e->getMessage(), [ 'app' => $this->appName ]);
			$ex = new BadRequestException();
			$ex->setBody(
					implode(',', $this->request->getParams())
			);
			throw $ex;
		}
	}

	protected function loadSession($esId){
		if (!$esId){
			throw new \Exception('Session id can not be empty');
		}

		$session = new Db\Session();
		$session->load($esId);
		if (!$session->getEsId()){
			throw new \Exception('Session does not exist');
		}
		return $session;
	}

	protected function loadMember($memberId, $expectedEsId = null){
		if (!$memberId){
			throw new \Exception('Member id can not be empty');
		}
		$member = new Db\Member();
		$member->load($memberId);
		//check if member belongs to the session
		if (!is_null($expectedEsId) && $expectedEsId !== $member->getEsId()){
			throw new \Exception($memberId . ' does not belong to session ' . $expectedEsId);
		}
		return $member;
	}
}
