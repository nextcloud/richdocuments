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

use OCA\Files_Sharing\Event\ShareLinkAccessedEvent;
use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Capabilities;
use OCA\Richdocuments\Listener\BeforeFetchPreviewListener;
use OCA\Richdocuments\Listener\CSPListener;
use OCA\Richdocuments\Listener\LoadViewerListener;
use OCA\Richdocuments\Listener\ShareLinkListener;
use OCA\Richdocuments\Middleware\WOPIMiddleware;
use OCA\Richdocuments\Listener\FileCreatedFromTemplateListener;
use OCA\Richdocuments\PermissionManager;
use OCA\Richdocuments\Preview\MSExcel;
use OCA\Richdocuments\Preview\MSWord;
use OCA\Richdocuments\Preview\OOXML;
use OCA\Richdocuments\Preview\OpenDocument;
use OCA\Richdocuments\Preview\Pdf;
use OCA\Richdocuments\Service\CapabilitiesService;
use OCA\Richdocuments\Template\CollaboraTemplateProvider;
use OCA\Richdocuments\WOPI\DiscoveryManager;
use OCA\Viewer\Event\LoadViewer;
use OCP\AppFramework\App;
use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use OCP\Files\Template\FileCreatedFromTemplateEvent;
use OCP\Files\Template\ITemplateManager;
use OCP\Files\Template\TemplateFileCreator;
use OCP\IConfig;
use OCP\IL10N;
use OCP\IPreview;
use OCP\Preview\BeforePreviewFetchedEvent;
use OCP\Security\CSP\AddContentSecurityPolicyEvent;

class Application extends App implements IBootstrap {

	public const APPNAME = 'richdocuments';

	public function __construct(array $urlParams = array()) {
		parent::__construct(self::APPNAME, $urlParams);
	}


	public function register(IRegistrationContext $context): void {
		$context->registerTemplateProvider(CollaboraTemplateProvider::class);
		$context->registerCapability(Capabilities::class);
		$context->registerMiddleWare(WOPIMiddleware::class);
		$context->registerEventListener(FileCreatedFromTemplateEvent::class, FileCreatedFromTemplateListener::class);
		$context->registerEventListener(AddContentSecurityPolicyEvent::class, CSPListener::class);
		$context->registerEventListener(LoadViewer::class, LoadViewerListener::class);
		$context->registerEventListener(ShareLinkAccessedEvent::class, ShareLinkListener::class);
		$context->registerEventListener(BeforePreviewFetchedEvent::class, BeforeFetchPreviewListener::class);
	}

	public function boot(IBootContext $context): void {


		$context->injectFn(function (ITemplateManager $templateManager, IL10N $l10n, IConfig $config, CapabilitiesService $capabilitiesService, PermissionManager $permissionManager) {
			if (!$permissionManager->isEnabledForUser() || empty($capabilitiesService->getCapabilities())) {
				return;
			}
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

			if (!$capabilitiesService->hasDrawSupport()) {
				return;
			}
			$templateManager->registerTemplateFileCreator(function () use ($l10n, $ooxml) {
				$odpType = new TemplateFileCreator('richdocuments', $l10n->t('New diagram'), '.odg');
				$odpType->addMimetype('application/vnd.oasis.opendocument.graphics');
				$odpType->addMimetype('application/vnd.oasis.opendocument.graphics-template');
				$odpType->setIconClass('icon-filetype-draw');
				$odpType->setRatio(1);
				return $odpType;
			});
		});

		if (class_exists('\OC\Files\Type\TemplateManager')) {
			$manager = \OC_Helper::getFileTemplateManager();

			$manager->registerTemplate('application/vnd.openxmlformats-officedocument.wordprocessingml.document', dirname(__DIR__) . '/emptyTemplates/docxtemplate.docx');
			$manager->registerTemplate('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', dirname(__DIR__) . '/emptyTemplates/xlsxtemplate.xlsx');
			$manager->registerTemplate('application/vnd.openxmlformats-officedocument.presentationml.presentation', dirname(__DIR__) . '/emptyTemplates/pptxtemplate.pptx');
			$manager->registerTemplate('application/vnd.oasis.opendocument.presentation', dirname(__DIR__) . '/emptyTemplates/template.odp');
			$manager->registerTemplate('application/vnd.oasis.opendocument.text', dirname(__DIR__) . '/emptyTemplates/template.odt');
			$manager->registerTemplate('application/vnd.oasis.opendocument.spreadsheet', dirname(__DIR__) . '/emptyTemplates/template.ods');
		}

		$this->registerProvider();
		$this->checkAndEnableCODEServer();
	}

	public function registerProvider() {
		$container = $this->getContainer();

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

		$previewManager->registerProvider('/application\/vnd.oasis.opendocument.*/', function() use ($container) {
			return $container->query(OpenDocument::class);
		});

		$previewManager->registerProvider('/application\/pdf/', function() use ($container) {
			return $container->query(Pdf::class);
		});
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
}
