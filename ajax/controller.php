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

class Controller {

	/**
	 * Do security precheck
	 * @param bool callcheck - whether security token check is needed
	 * @return string userId of the currently logged in user
	 */
	public static function preDispatch($callcheck = true){
		if ($callcheck){
			\OCP\JSON::callCheck();
		}
		\OCP\JSON::checkAppEnabled('documents');
		\OCP\JSON::checkLoggedIn();
		return \OCP\User::getUser();
	}
	
	/**
	 * Do security precheck for not logged in users
	 * @param bool callcheck - whether security token check is needed
	 */
	public static function preDispatchGuest($callcheck = true){
		if ($callcheck){
			\OCP\JSON::callCheck();
		}
		\OCP\JSON::checkAppEnabled('documents');
	}

}
