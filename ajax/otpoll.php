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

class BadRequestException extends \Exception {

	protected $body = "";

	public function setBody($body){
		$this->body = $body;
	}

	public function getBody(){
		return $this->body;
	}
}

$response = array();

try{
	$request = new Request();
	$esId = $request->getParam('args/es_id');
	
	$session = new Db_Session();
	$sessionData = $session->load($esId)->getData();

	try {
		$file = new File(@$sessionData['file_id']);
	} catch (\Exception $e){
		Helper::warnLog('Error. Session no longer exists. ' . $e->getMessage());
		$ex = new BadRequestException();
		$ex->setBody("{err:'bad request: [" . $request->getRawRequest() . "]'}");
		throw $ex;
	}
	if (!$file->isPublicShare()){
		Controller::preDispatch(false);
	} else {
		Controller::preDispatchGuest(false);
	}
	
	$command = $request->getParam('command');
	switch ($command){
		case 'query_memberdata_list':
			$ids = $request->getParam('args/member_ids');
			
			$member = new Db_Member();
			$members = $member->getCollectionBy('member_id', $ids);
			
			$response["memberdata_list"] = array_map(
					function($x){
						$x['display_name'] = \OCP\User::getDisplayName($x['uid']);
						
						// Do we have OC_Avatar in out disposal?
						if (!class_exists('\OC_Avatar') || \OC_Config::getValue('enable_avatars', true) !== true){
							//$x['avatar_url'] = \OCP\Util::linkToRoute('documents_user_avatar');
							$x['avatar_url'] = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw==';
						} else {
						// https://github.com/owncloud/documents/issues/51
						// Temporary stub
						
							$x['avatar_url'] = $x['uid'];
							
							/*
							$avatar = new \OC_Avatar($x['uid']);
							$image = $avatar->get(64);
							// User has an avatar 
							if ($image instanceof \OC_Image) {
								$x['avatar_url'] = \OC_Helper::linkToRoute(
										'core_avatar_get',
										array( 'user' => $x['uid'], 'size' => 64)
								) . '?requesttoken=' . \OC::$session->get('requesttoken');
							} else {
								//shortcircuit if it's not an image
								$x['avatar_url'] = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw==';
							}
							 
							 */
						}
						

						return $x;
					}, 
					$members
			);
					
			break;
		case 'sync_ops':
			$seqHead = (string) $request->getParam('args/seq_head');
			if (!is_null($seqHead)){
				$memberId = $request->getParam('args/member_id');
				$ops = $request->getParam('args/client_ops');
				$hasOps = is_array($ops) && count($ops)>0;

				$op = new Db_Op();
				$currentHead = $op->getHeadSeq($esId);
				
				$member = new Db_Member();
				try {
					$member->updateActivity($memberId);
				} catch (\Exception $e){
				}

				// TODO handle the case ($currentHead == "") && ($seqHead != "")
				if ($seqHead == $currentHead) {
					// matching heads
					if ($hasOps) {
						// incoming ops without conflict
						// Add incoming ops, respond with a new head
						$newHead = Db_Op::addOpsArray($esId, $memberId, $ops);
						$response["result"] = 'added';
						$response["head_seq"] = $newHead ? $newHead : $currentHead;
					} else {
						// no incoming ops (just checking for new ops...)
						$response["result"] = 'new_ops';
						$response["ops"] = array();
						$response["head_seq"] = $currentHead;
					}
				} else { // HEADs do not match
					$response["ops"] = $op->getOpsAfterJson($esId, $seqHead);
					$response["head_seq"] = $currentHead;
					$response["result"] = $hasOps ? 'conflict' : 'new_ops';
				}
				
				$inactiveMembers = $member->updateByTimeout($esId);
				foreach ($inactiveMembers as $inactive){
					$op->removeCursor($esId, $inactive);
				}
			
			} else {
				// Error - no seq_head passed
				throw new BadRequestException();
			}

			break;
		default:
			$ex = new BadRequestException();
			$ex->setBody("{err:'bad request: [" . $request->getRawRequest() . "]'}");
			throw $ex;
			break;
	}

	\OCP\JSON::success($response);
} catch (BadRequestException $e){
	header('HTTP/1.1 400: BAD REQUEST');
	print("");
	print($e->getBody());
	print("");
}
exit();
