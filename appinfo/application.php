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

namespace OCA\Documents\AppInfo;

use \OCP\AppFramework\App;

use \OCA\Documents\Controller\UserController;
use \OCA\Documents\Controller\SessionController;
use \OCA\Documents\Controller\DocumentController;
use \OCA\Documents\Controller\SettingsController;

class Application extends App {
	public function __construct (array $urlParams = array()) {
		parent::__construct('documents', $urlParams);
		
		$container = $this->getContainer();
		
		/**
		 * Controllers
		 */
		$container->registerService('UserController', function($c) {
			return new UserController(
				$c->query('AppName'), 
				$c->query('Request')
			);
		});
		$container->registerService('SessionController', function($c) {
			return new SessionController(
				$c->query('AppName'), 
				$c->query('Request'),
				$c->query('Logger'),
				$c->query('UserId')
			);
		});
		$container->registerService('DocumentController', function($c) {
			return new DocumentController(
				$c->query('AppName'), 
				$c->query('Request'),
				$c->query('CoreConfig'),
				$c->query('L10N'),
				$c->query('UserId')
			);
		});
		$container->registerService('SettingsController', function($c) {
			return new SettingsController(
				$c->query('AppName'), 
				$c->query('Request'),
				$c->query('CoreConfig'),
				$c->query('Logger'),
				$c->query('L10N'),
				$c->query('UserId')
			);
		});
		
		/**
		 * Core
		 */
		$container->registerService('Logger', function($c) {
			return $c->query('ServerContainer')->getLogger();
		});
        $container->registerService('CoreConfig', function($c) {
            return $c->query('ServerContainer')->getConfig();
        });
        $container->registerService('L10N', function($c) {
            return $c->query('ServerContainer')->getL10N($c->query('AppName'));
        });
        $container->registerService('UserId', function() {
            return \OCP\User::getUser();
        });
	}
}
