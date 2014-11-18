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
use \OCP\AppFramework\Http\JSONResponse;

use \OCA\Documents\Db;

class UserController extends Controller {
	
	public function __construct($appName, IRequest $request){
		parent::__construct($appName, $request);
	}
	
	/**
	 * @NoAdminRequired
	 */
	public function disconnectUser($memberId, $esId){
		return $this->disconnect($memberId, $esId);
	}
	
	/**
	 * @NoAdminRequired
	 * @PublicPage
	 */
	public function disconnectGuest($memberId, $esId){
		return $this->disconnect($memberId, $esId);
	}
	
	private function disconnect($memberId, $esId){
		$member = new Db\Member();
		$member->loadBy('member_id', $memberId);
		if ($esId && $member->hasData()){
			if ($member->getEsId() === $esId && $member->getStatus() == Db\Member::MEMBER_STATUS_ACTIVE){
				$member->deactivate(array($memberId));
				$op = new Db\Op();
				$op->removeMember($esId, $memberId);
			}
		}
		
		return array('status'=>'success');
	}
	
	/**
	 * @NoAdminRequired
	 * @PublicPage
	 * @param int $memberId
	 * @param string $name
	 */
	public function rename($memberId, $name){
		$member = new Db\Member();
		$member->load($memberId);

		if ($member->getEsId()
				&& $member->getStatus() == Db\Member::MEMBER_STATUS_ACTIVE 
				&& $member->getIsGuest()
		){
			$guestMark = Db\Member::getGuestPostfix();
			if (substr($name, -strlen($guestMark)) !== $guestMark){
				$name = $name . ' ' . $guestMark;
			}
			
			$op = new Db\Op();
			$op->changeNick($member->getEsId(), $memberId, $name);
		}
		
		return array('status'=>'success');
	}
}
