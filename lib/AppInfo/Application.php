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

use OC\EventDispatcher\SymfonyAdapter;
use OC\Files\Type\Detection;
use OC\Security\CSP\ContentSecurityPolicy;
use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Capabilities;
use OCA\Richdocuments\Middleware\WOPIMiddleware;
use OCA\Richdocuments\PermissionManager;
use OCA\Richdocuments\Preview\MSExcel;
use OCA\Richdocuments\Preview\MSWord;
use OCA\Richdocuments\Preview\OOXML;
use OCA\Richdocuments\Preview\OpenDocument;
use OCA\Richdocuments\Preview\Pdf;
use OCA\Richdocuments\Service\CapabilitiesService;
use OCA\Richdocuments\Service\FederationService;
use OCA\Richdocuments\Template\CollaboraTemplateProvider;
use OCA\Richdocuments\WOPI\DiscoveryManager;
use OCA\Viewer\Event\LoadViewer;
use OCP\AppFramework\App;
use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\Files\Template\ITemplateManager;
use OCP\Files\Template\TemplateFileCreator;
use OCP\IConfig;
use OCP\IL10N;
use OCP\IPreview;

class Application extends App implements IBootstrap {

	public const APPNAME = 'richdocuments';

	public function __construct(array $urlParams = array()) {
		parent::__construct(self::APPNAME, $urlParams);
		$this->getContainer()->registerCapability(Capabilities::class);
	}


	public function register(IRegistrationContext $context): void {
		$context->registerTemplateProvider(CollaboraTemplateProvider::class);
		$context->registerCapability(Capabilities::class);
		$context->registerMiddleWare(WOPIMiddleware::class);
	}

	public function boot(IBootContext $context): void {
		$currentUser = \OC::$server->getUserSession()->getUser();
		if($currentUser !== null) {
			/** @var PermissionManager $permissionManager */
			$permissionManager = \OC::$server->query(PermissionManager::class);
			if(!$permissionManager->isEnabledForUser($currentUser)) {
				return;
			}
		}

		/** @var IEventDispatcher $eventDispatcher */
		$eventDispatcher = $this->getContainer()->getServer()->query(IEventDispatcher::class);
		$eventDispatcher->addListener(LoadViewer::class, function () {
			\OCP\Util::addScript('richdocuments', 'richdocuments-viewer');
		});

		$context->injectFn(function(ITemplateManager $templateManager, IL10N $l10n, IConfig $config) {
			$ooxml = $config->getAppValue(self::APPNAME, 'doc_format', '') === 'ooxml';
			$templateManager->registerTemplateFileCreator(function () use ($l10n, $ooxml) {
				$odtType = new TemplateFileCreator('richdocuments', $l10n->t('New document'), ($ooxml ? '.docx' : '.odt'));
				if ($ooxml) {
					$odtType->addMimetype('application/msword');
					$odtType->addMimetype('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
				} else {
					$odtType->addMimetype('application/vnd.oasis.opendocument.text');
					$odtType->addMimetype('application/vnd.oasis.opendocument.text-template');
				}
				$odtType->setIconClass('icon-filetype-document');
				$odtType->setRatio(21/29.7);
				return $odtType;
			});
			$templateManager->registerTemplateFileCreator(function () use ($l10n, $ooxml) {
				$odsType = new TemplateFileCreator('richdocuments', $l10n->t('New spreadsheet'), ($ooxml ? '.xlsx' : '.ods'));
				if ($ooxml) {
					$odsType->addMimetype('application/vnd.ms-excel');
					$odsType->addMimetype('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
				} else {
					$odsType->addMimetype('application/vnd.oasis.opendocument.spreadsheet');
					$odsType->addMimetype('application/vnd.oasis.opendocument.spreadsheet-template');
				}
				$odsType->setIconClass('icon-filetype-spreadsheet');
				$odsType->setRatio(16/9);
				return $odsType;
			});
			$templateManager->registerTemplateFileCreator(function () use ($l10n, $ooxml) {
				$odpType = new TemplateFileCreator('richdocuments', $l10n->t('New presentation'), ($ooxml ? '.pptx' : '.odp'));
				if ($ooxml) {
					$odpType->addMimetype('application/vnd.ms-powerpoint');
					$odpType->addMimetype('application/vnd.openxmlformats-officedocument.presentationml.presentation');
				} else {
					$odpType->addMimetype('application/vnd.oasis.opendocument.presentation');
					$odpType->addMimetype('application/vnd.oasis.opendocument.presentation-template');
				}
				$odpType->setIconClass('icon-filetype-presentation');
				$odpType->setRatio(16/9);
				return $odpType;
			});
		});

		$context->injectFn(function (SymfonyAdapter $eventDispatcher) {
			$eventDispatcher->addListener('OCA\Files::loadAdditionalScripts',
				function() {
					\OCP\Util::addScript('richdocuments', 'richdocuments-files');
				}
			);
			$eventDispatcher->addListener('OCA\Files_Sharing::loadAdditionalScripts',
				function() {
					\OCP\Util::addScript('richdocuments', 'richdocuments-files');
				}
			);

			if (class_exists('\OC\Files\Type\TemplateManager')) {
				$manager = \OC_Helper::getFileTemplateManager();

				$manager->registerTemplate('application/vnd.openxmlformats-officedocument.wordprocessingml.document', dirname(__DIR__) . '/assets/docxtemplate.docx');
				$manager->registerTemplate('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', dirname(__DIR__) . '/assets/xlsxtemplate.xlsx');
				$manager->registerTemplate('application/vnd.openxmlformats-officedocument.presentationml.presentation', dirname(__DIR__) . '/assets/pptxtemplate.pptx');
				$manager->registerTemplate('application/vnd.oasis.opendocument.presentation', dirname(__DIR__) . '/assets/template.odp');
				$manager->registerTemplate('application/vnd.oasis.opendocument.text', dirname(__DIR__) . '/assets/template.odt');
				$manager->registerTemplate('application/vnd.oasis.opendocument.spreadsheet', dirname(__DIR__) . '/assets/template.ods');
			}

			$this->registerProvider();
			$this->updateCSP();
			$this->checkAndEnableCODEServer();
		});
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
		if ((strpos($path, '/apps/files/') === 0 || strpos($path, '/s/') === 0) && $container->getServer()->getAppManager()->isEnabledForUser('federation')) {
			/** @var FederationService $federationService */
			$federationService = \OC::$server->query(FederationService::class);

			// Always add trusted servers on global scale
			/** @var \OCP\GlobalScale\IConfig $globalScale */
			$globalScale = $container->query(\OCP\GlobalScale\IConfig::class);
			if ($globalScale->isGlobalScaleEnabled()) {
				$trustedList = \OC::$server->getConfig()->getSystemValue('gs.trustedHosts', []);
				foreach ($trustedList as $server) {
					$this->addTrustedRemote($policy, $server);
				}
			}
			$remoteAccess = $container->getServer()->getRequest()->getParam('richdocuments_remote_access');

			if ($remoteAccess && $federationService->isTrustedRemote($remoteAccess)) {
				$this->addTrustedRemote($policy, $remoteAccess);
			}
		}

		$cspManager->addDefaultPolicy($policy);
	}

	private function addTrustedRemote($policy, $url) {
		/** @var FederationService $federationService */
		$federationService = \OC::$server->query(FederationService::class);
		try {
			$remoteCollabora = $federationService->getRemoteCollaboraURL($url);
			$policy->addAllowedFrameDomain($url);
			$policy->addAllowedFrameDomain($remoteCollabora);
		} catch (\Exception $e) {
			// We can ignore this exception for adding predefined domains to the CSP as it it would then just
			// reload the page to set a proper allowed frame domain if we don't have a fixed list of trusted
			// remotes in a global scale scenario
		}
	}

	public function checkAndEnableCODEServer() {
		// Supported only on Linux OS, and x86_64 & ARM64 platforms
		$supportedArchs = array('x86_64', 'aarch64');
		$osFamily = PHP_VERSION_ID >= 70200 ? PHP_OS_FAMILY : PHP_OS;
		if ($osFamily !== 'Linux' || !in_array(php_uname('m'), $supportedArchs))
			return;

		$CODEAppID = (php_uname('m') === 'x86_64') ? 'richdocumentscode' : 'richdocumentscode_arm64';

		if ($this->getContainer()->getServer()->getAppManager()->isEnabledForUser($CODEAppID)) {
			$appConfig = $this->getContainer()->query(AppConfig::class);
			$wopi_url = $appConfig->getAppValue('wopi_url');
			$isCODEEnabled = strpos($wopi_url, 'proxy.php?req=') !== false;

			// Check if we have the wopi_url set to custom currently
			if ($wopi_url !== null && $wopi_url !== '' && $isCODEEnabled === false) {
				return;
			}

			$urlGenerator = \OC::$server->getURLGenerator();
			$relativeUrl = $urlGenerator->linkTo($CODEAppID, '') . 'proxy.php';
			$absoluteUrl = $urlGenerator->getAbsoluteURL($relativeUrl);
			$new_wopi_url = $absoluteUrl . '?req=';

			// Check if the wopi url needs to be updated
			if ($isCODEEnabled && $wopi_url === $new_wopi_url) {
				return;
			}

			$appConfig->setAppValue('wopi_url', $new_wopi_url);
			$appConfig->setAppValue('disable_certificate_verification', 'yes');

			$discoveryManager = $this->getContainer()->query(DiscoveryManager::class);
			$capabilitiesService = $this->getContainer()->query(CapabilitiesService::class);

			$discoveryManager->refetch();
			$capabilitiesService->clear();
			$capabilitiesService->refetch();
		}
	}

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
}
