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
	$session->load($esId);
	
	$memberId = $request->getParam('args/member_id');
	$member = new Db_Member();
	$member->load($memberId);
	
	if ($member->getIsGuest() || is_null($member->getIsGuest())){
		Controller::preDispatchGuest(false);
	} else {
		Controller::preDispatch(false);
	}

	try {
		$file = new File($session->getFileId());
	} catch (\Exception $e){
		Helper::warnLog('Error. Session no longer exists. ' . $e->getMessage());
		$ex = new BadRequestException();
		$ex->setBody($request->getRawRequest());
		throw $ex;
	}
	
	$command = $request->getParam('command');
	switch ($command){
		case 'sync_ops':
			$seqHead = (string) $request->getParam('args/seq_head');
			if (!is_null($seqHead)){
				$ops = $request->getParam('args/client_ops');
				$hasOps = is_array($ops) && count($ops)>0;

				$op = new Db_Op();
				$currentHead = $op->getHeadSeq($esId);
				
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
					$op->removeMember($esId, $inactive);
				}
			
			} else {
				// Error - no seq_head passed
				throw new BadRequestException();
			}

			break;
		default:
			$ex = new BadRequestException();
			$ex->setBody($request->getRawRequest());
			throw $ex;
			break;
	}

	\OCP\JSON::success($response);
} catch (BadRequestException $e){
	header('HTTP/1.1 400: BAD REQUEST');
	\OCP\JSON::error( array(
		'err' => 'bad request:[' . $e->getBody() . ']',
	));
}
exit();
