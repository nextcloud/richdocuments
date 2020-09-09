<?php
/**
 * @copyright Copyright (c) 2016 Lukas Reschke <lukas@statuscode.ch>
 *
 * @author Lukas Reschke <lukas@statuscode.ch>
 * @author Roeland Jago Douma <roeland@famdouma.nl>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Richdocuments\AppInfo;

use OC\Files\Type\Detection;
use OC\Security\CSP\ContentSecurityPolicy;
use OCA\Federation\TrustedServers;
use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Capabilities;
use OCA\Richdocuments\Preview\MSExcel;
use OCA\Richdocuments\Preview\MSWord;
use OCA\Richdocuments\Preview\OOXML;
use OCA\Richdocuments\Preview\OpenDocument;
use OCA\Richdocuments\Preview\Pdf;
use OCA\Richdocuments\Service\CapabilitiesService;
use OCA\Richdocuments\Service\FederationService;
use OCA\Richdocuments\WOPI\DiscoveryManager;
use OCA\Viewer\Event\LoadViewer;
use OCP\AppFramework\App;
use OCP\AppFramework\QueryException;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\IPreview;

class Application extends App {

	const APPNAME = 'richdocuments';

	/**
	 * Strips the path and query parameters from the URL.
	 *
	 * @param string $url
	 * @return string
	 */
	private function domainOnly($url) {
		$parsed_url = parse_url($url);
		$scheme = isset($parsed_url['scheme']) ? $parsed_url['scheme'] . '://' : '';
		$host	= isset($parsed_url['host']) ? $parsed_url['host'] : '';
		$port	= isset($parsed_url['port']) ? ':' . $parsed_url['port'] : '';
		return "$scheme$host$port";
	}

	public function __construct(array $urlParams = array()) {
		parent::__construct(self::APPNAME, $urlParams);

		try {
			/** @var IEventDispatcher $eventDispatcher */
			$eventDispatcher = $this->getContainer()->getServer()->query(IEventDispatcher::class);
			if (class_exists(LoadViewer::class)) {
				$eventDispatcher->addListener(LoadViewer::class, function () {
					\OCP\Util::addScript('richdocuments', 'viewer');
				});
			}
		} catch (QueryException $e) {
		}

		$this->getContainer()->registerCapability(Capabilities::class);
	}

	public function registerProvider() {
		$container = $this->getContainer();

		// Register mimetypes
		/** @var Detection $detector */
		$detector = $container->query(\OCP\Files\IMimeTypeDetector::class);
		$detector->getAllMappings();
		$detector->registerType('ott','application/vnd.oasis.opendocument.text-template');
		$detector->registerType('ots', 'application/vnd.oasis.opendocument.spreadsheet-template');
		$detector->registerType('otp', 'application/vnd.oasis.opendocument.presentation-template');

		/** @var IPreview $previewManager */
		$previewManager = $container->query(IPreview::class);

		$previewManager->registerProvider('/application\/vnd.ms-excel/', function() use ($container) {
			return $container->query(MSExcel::class);
		});

		$previewManager->registerProvider('/application\/msword/', function() use ($container) {
			return $container->query(MSWord::class);
		});

		$previewManager->registerProvider('/application\/vnd.openxmlformats-officedocument.*/', function() use ($container) {
			return $container->query(OOXML::class);
		});

		// \OC::$server->getLogger()->debug('==== Richdocuments Application registerProvider: calling manager registerProvider:');
		$previewManager->registerProvider('/application\/vnd.oasis.opendocument.*/', function() use ($container) {
			// \OC::$server->getLogger()->debug('==== Richdocuments Application registerProvider lambda. OpenDocument::class=' . OpenDocument::class);
			return $container->query(OpenDocument::class);
		});

		$previewManager->registerProvider('/application\/pdf/', function() use ($container) {
			return $container->query(Pdf::class);
		});

	}

	public function updateCSP() {
		$container = $this->getContainer();

		$publicWopiUrl = $container->getServer()->getConfig()->getAppValue('richdocuments', 'public_wopi_url', '');
		$publicWopiUrl = $publicWopiUrl === '' ? \OC::$server->getConfig()->getAppValue('richdocuments', 'wopi_url') : $publicWopiUrl;
		$cspManager = $container->getServer()->getContentSecurityPolicyManager();
		$policy = new ContentSecurityPolicy();
		if ($publicWopiUrl !== '') {
			$policy->addAllowedFrameDomain('\'self\'');
			$policy->addAllowedFrameDomain($this->domainOnly($publicWopiUrl));
			if (method_exists($policy, 'addAllowedFormActionDomain')) {
				$policy->addAllowedFormActionDomain($this->domainOnly($publicWopiUrl));
			}
		}

		/**
		 * Dynamically add CSP for federated editing
		 */
		$path = '';
		try {
			$path = $container->getServer()->getRequest()->getPathInfo();
		} catch (\Exception $e) {}
		if (strpos($path, '/apps/files') === 0 && $container->getServer()->getAppManager()->isEnabledForUser('federation')) {
			/** @var TrustedServers $trustedServers */
			$trustedServers = $container->query(TrustedServers::class);
			/** @var FederationService $federationService */
			$federationService = $container->query(FederationService::class);
			$remoteAccess = $container->getServer()->getRequest()->getParam('richdocuments_remote_access');

			if ($remoteAccess && $trustedServers->isTrustedServer($remoteAccess)) {
				$remoteCollabora = $federationService->getRemoteCollaboraURL($remoteAccess);
				$policy->addAllowedFrameDomain($remoteAccess);
				$policy->addAllowedFrameDomain($remoteCollabora);
			}
		}

		$cspManager->addDefaultPolicy($policy);
	}

	public function checkAndEnableCODEServer() {
		// Supported only on Linux OS, and x86_64 & ARM64 platforms
		$supportedArchs = array('x86_64', 'aarch64');
		if (PHP_OS_FAMILY !== 'Linux' || !in_array(php_uname('m'), $supportedArchs))
			return;

		$CODEAppID = (php_uname('m') === 'x86_64') ? 'richdocumentscode' : 'richdocumentscode_arm64';

		if ($this->getContainer()->getServer()->getAppManager()->isEnabledForUser($CODEAppID)) {
			$appConfig = $this->getContainer()->query(AppConfig::class);
			$wopi_url = $appConfig->getAppValue('wopi_url');

			// Check if we have the wopi_url set currently
			if ($wopi_url !== null && $wopi_url !== '') {
				return;
			}

			$urlGenerator = \OC::$server->getURLGenerator();
			$relativeUrl = $urlGenerator->linkTo($CODEAppID, '') . 'proxy.php';
			$absoluteUrl = $urlGenerator->getAbsoluteURL($relativeUrl);
			$wopi_url = $absoluteUrl . '?req=';

			$appConfig->setAppValue('wopi_url', $wopi_url);
			$appConfig->setAppValue('disable_certificate_verification', 'yes');

			$discoveryManager = $this->getContainer()->query(DiscoveryManager::class);
			$capabilitiesService = $this->getContainer()->query(CapabilitiesService::class);

			$discoveryManager->refretch();
			$capabilitiesService->clear();
			$capabilitiesService->refretch();
		}
	}
}
