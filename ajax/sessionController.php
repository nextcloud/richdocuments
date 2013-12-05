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

namespace OCA\Documents;

class SessionController extends Controller{
	
	public static function joinAsGuest($args){
		$uid = self::preDispatchGuest();
		$uid = substr(@$_POST['name'], 0, 16) .' '. $uid;
		$token = @$args['token'];
		$file = File::getByShareToken($token);
		self::join($uid, $file);
	}

	public static function renameDocument($args){
		$fileId = intval(@$args['file_id']);
		$name = @$_POST['name'];
		$file = new File($fileId);
		$l = new \OC_L10n('documents');

		if (isset($name) && $file->getPermissions() & \OCP\PERMISSION_UPDATE) {
			if ($file->renameTo($name)) {
				// TODO: propagate to other clients
				\OCP\JSON::success();
				return;
			}
		}
		\OCP\JSON::error(array(
			'message' => $l->t('You don\'t have permission to rename this document')
		));
	}

	public static function joinAsUser($args){
		$uid = self::preDispatch();
		$fileId = intval(@$args['file_id']);
		$file = new File($fileId);
		
		if ($file->getPermissions() & \OCP\PERMISSION_UPDATE) {
			self::join($uid, $file);	
		} else {
			\OCP\JSON::success(array(
				'permissions' => $file->getPermissions(),
				'id' => $fileId
			));
		}
		
		exit();
	}
	
	protected static function join($uid, $file){
		try{
			$session = Db_Session::start($uid, $file);
			\OCP\JSON::success($session);
			exit();
		} catch (\Exception $e){
			Helper::warnLog('Starting a session failed. Reason: ' . $e->getMessage());
			\OCP\JSON::error();
			exit();
		}
	}

	/**
	 * Store the document content to its origin
	 */
	public static function save(){
		try {
			$esId = @$_SERVER['HTTP_WEBODF_SESSION_ID'];
			if (!$esId){
				throw new \Exception('Session id can not be empty');
			}
			
			$memberId = @$_SERVER['HTTP_WEBODF_MEMBER_ID'];
			$sessionRevision = @$_SERVER['HTTP_WEBODF_SESSION_REVISION'];
			
			$stream = fopen('php://input','r');
			if (!$stream){
				throw new \Exception('New content missing');
			}
			$content = stream_get_contents($stream);

			$session = new Db_Session();
			$session->load($esId);
			
			if (!$session->hasData()){
				throw new \Exception('Session does not exist');
			}
			$sessionData = $session->getData();
			$file = new File($sessionData['file_id']);
			if (!$file->isPublicShare()){
				self::preDispatch();
			} else {
				self::preDispatchGuest();
			}
			
			
			list($view, $path) = $file->getOwnerViewAndPath();

			$isWritable = ($view->file_exists($path) && $view->isUpdatable($path)) || $view->isCreatable($path);
			if (!$isWritable){
				throw new \Exception($path . ' does not exist or is not writable for user ' . $uid);
			}
			
			$member = new Db_Member();
			$members = $member->getActiveCollection($esId);
			$memberIds = array_map(
				function($x){
					return ($x['member_id']);
				},
				$members
			);
				
			//check if member belongs to the session
			if (!in_array($memberId, $memberIds)){
				throw new \Exception($memberId . ' does not belong to session ' . $esId);
			}
			
			// Active users except current user
			$memberCount = count($memberIds) - 1;
			
			if ($view->file_exists($path)){
				
				
				$proxyStatus = \OC_FileProxy::$enabled;
				\OC_FileProxy::$enabled = false;	
				$currentHash = sha1($view->file_get_contents($path));
				\OC_FileProxy::$enabled = $proxyStatus;
				
				if (!Helper::isVersionsEnabled() && $currentHash !== $sessionData['genesis_hash']){
					// Original file was modified externally. Save to a new one
					$path = Helper::getNewFileName($view, $path, '-conflict');
				}
			}
			
			if ($view->file_put_contents($path, $content)){
				// Not a last user
				if ($memberCount>0){
					// Update genesis hash to prevent conflicts
					Helper::debugLog('Update hash');
					$session->updateGenesisHash($esId, sha1($content));
				} else {
					// Last user. Kill session data
					Db_Session::cleanUp($esId);
				}
				
				$view->touch($path);
			}
			\OCP\JSON::success();
			exit();
		} catch (\Exception $e){
			Helper::warnLog('Saving failed. Reason:' . $e->getMessage());
			\OCP\JSON::error(array('message'=>$e->getMessage()));
			exit();
		}
	}
	
	public static function info(){
		self::preDispatch();
		$items = @$_POST['items'];
		$info = array();

		if (is_array($items)){
			$session = new Db_Session();
			$info = $session->getInfoByFileId($items);
		}

		\OCP\JSON::success(array(
			"info" => $info
		));
	}
	
	public static function listAll(){
		self::preDispatch();
		$session = new Db_Session();
		$sessions = $session->getCollection();

		$preparedSessions = array_map(
				function($x){
					return ($x['es_id']);
				}, $sessions
		);
		\OCP\JSON::success(array(
			"session_list" => $preparedSessions
		));
	}

	public static function listAllHtml(){
		self::preDispatch();
		$session = new Db_Session();
		$sessions = $session->getCollection();

		$preparedSessions = array_map(
				function($x){
					return ($x['es_id']);
				}, $sessions
		);

		$invites = Invite::getAllInvites();
		if (!is_array($invites)){
			$invites = array();
		}

		$tmpl = new \OCP\Template('documents', 'part.sessions', '');
		$tmpl->assign('invites', $invites);
		$tmpl->assign('sessions', $sessions);
		echo $tmpl->fetchPage();
	}
}
