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
use OCA\Richdocuments\Db\WopiMapper;
use OCA\Richdocuments\Listener\AddContentSecurityPolicyListener;
use OCA\Richdocuments\Listener\AddFeaturePolicyListener;
use OCA\Richdocuments\Listener\BeforeFetchPreviewListener;
use OCA\Richdocuments\Listener\BeforeTemplateRenderedListener;
use OCA\Richdocuments\Listener\FileCreatedFromTemplateListener;
use OCA\Richdocuments\Listener\LoadAdditionalListener;
use OCA\Richdocuments\Listener\LoadViewerListener;
use OCA\Richdocuments\Listener\ReferenceListener;
use OCA\Richdocuments\Listener\ShareLinkListener;
use OCA\Richdocuments\Middleware\WOPIMiddleware;
use OCA\Richdocuments\Notification\Notifier;
use OCA\Richdocuments\PermissionManager;
use OCA\Richdocuments\Preview\EMF;
use OCA\Richdocuments\Preview\MSExcel;
use OCA\Richdocuments\Preview\MSWord;
use OCA\Richdocuments\Preview\OOXML;
use OCA\Richdocuments\Preview\OpenDocument;
use OCA\Richdocuments\Preview\Pdf;
use OCA\Richdocuments\Reference\OfficeTargetReferenceProvider;
use OCA\Richdocuments\Service\CapabilitiesService;
use OCA\Richdocuments\Service\DiscoveryService;
use OCA\Richdocuments\Template\CollaboraTemplateProvider;
use OCA\Viewer\Event\LoadViewer;
use OCP\App\IAppManager;
use OCP\AppFramework\App;
use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use OCP\AppFramework\Http\Events\BeforeTemplateRenderedEvent;
use OCP\Collaboration\Reference\RenderReferenceEvent;
use OCP\Collaboration\Resources\LoadAdditionalScriptsEvent;
use OCP\Files\Template\FileCreatedFromTemplateEvent;
use OCP\Files\Template\ITemplateManager;
use OCP\Files\Template\TemplateFileCreator;
use OCP\IConfig;
use OCP\IL10N;
use OCP\Preview\BeforePreviewFetchedEvent;
use OCP\Security\CSP\AddContentSecurityPolicyEvent;
use OCP\Security\FeaturePolicy\AddFeaturePolicyEvent;
use OCP\Server;

class Application extends App implements IBootstrap {
	public const APPNAME = 'richdocuments';

	public function __construct(array $urlParams = []) {
		parent::__construct(self::APPNAME, $urlParams);
	}


	public function register(IRegistrationContext $context): void {
		$context->registerTemplateProvider(CollaboraTemplateProvider::class);
		$context->registerCapability(Capabilities::class);
		$context->registerMiddleWare(WOPIMiddleware::class);
		$context->registerEventListener(FileCreatedFromTemplateEvent::class, FileCreatedFromTemplateListener::class);
		$context->registerEventListener(AddContentSecurityPolicyEvent::class, AddContentSecurityPolicyListener::class);
		$context->registerEventListener(AddFeaturePolicyEvent::class, AddFeaturePolicyListener::class);
		$context->registerEventListener(LoadAdditionalScriptsEvent::class, LoadAdditionalListener::class);
		$context->registerEventListener(LoadViewer::class, LoadViewerListener::class);
		$context->registerEventListener(ShareLinkAccessedEvent::class, ShareLinkListener::class);
		$context->registerEventListener(BeforePreviewFetchedEvent::class, BeforeFetchPreviewListener::class);
		$context->registerEventListener(RenderReferenceEvent::class, ReferenceListener::class);
		$context->registerEventListener(BeforeTemplateRenderedEvent::class, BeforeTemplateRenderedListener::class);
		$context->registerReferenceProvider(OfficeTargetReferenceProvider::class);
		$context->registerSensitiveMethods(WopiMapper::class, [
			'getPathForToken',
			'getWopiForToken',
		]);

		$context->registerPreviewProvider(EMF::class, EMF::MIMETYPE_REGEX);
		$context->registerPreviewProvider(MSExcel::class, MSExcel::MIMETYPE_REGEX);
		$context->registerPreviewProvider(MSWord::class, MSWord::MIMETYPE_REGEX);
		$context->registerPreviewProvider(OOXML::class, OOXML::MIMETYPE_REGEX);
		$context->registerPreviewProvider(OpenDocument::class, OpenDocument::MIMETYPE_REGEX);
		$context->registerPreviewProvider(Pdf::class, Pdf::MIMETYPE_REGEX);
		$context->registerNotifierService(Notifier::class);
	}

	public function boot(IBootContext $context): void {
		$context->injectFn(function (ITemplateManager $templateManager, IL10N $l10n, IConfig $config, CapabilitiesService $capabilitiesService, PermissionManager $permissionManager, IAppManager $appManager) {
			if (!$permissionManager->isEnabledForUser() || empty($capabilitiesService->getCapabilities())) {
				return;
			}
			$ooxml = $config->getAppValue(self::APPNAME, 'doc_format', '') === 'ooxml';
			$templateManager->registerTemplateFileCreator(function () use ($l10n, $ooxml, $appManager) {
				$odtType = new TemplateFileCreator('richdocuments', $l10n->t('New document'), ($ooxml ? '.docx' : '.odt'));
				if ($ooxml) {
					$odtType->addMimetype('application/msword');
					$odtType->addMimetype('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
				} else {
					$odtType->addMimetype('application/vnd.oasis.opendocument.text');
					$odtType->addMimetype('application/vnd.oasis.opendocument.text-template');
				}
				$odtType->setIconSvgInline(file_get_contents($appManager->getAppPath('richdocuments') . '/img/x-office-document.svg'));
				$odtType->setRatio(21 / 29.7);
				return $odtType;
			});
			$templateManager->registerTemplateFileCreator(function () use ($l10n, $ooxml, $appManager) {
				$odsType = new TemplateFileCreator('richdocuments', $l10n->t('New spreadsheet'), ($ooxml ? '.xlsx' : '.ods'));
				if ($ooxml) {
					$odsType->addMimetype('application/vnd.ms-excel');
					$odsType->addMimetype('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
				} else {
					$odsType->addMimetype('application/vnd.oasis.opendocument.spreadsheet');
					$odsType->addMimetype('application/vnd.oasis.opendocument.spreadsheet-template');
				}
				$odsType->setIconSvgInline(file_get_contents($appManager->getAppPath('richdocuments') . '/img/x-office-spreadsheet.svg'));
				$odsType->setRatio(16 / 9);
				return $odsType;
			});
			$templateManager->registerTemplateFileCreator(function () use ($l10n, $ooxml, $appManager) {
				$odpType = new TemplateFileCreator('richdocuments', $l10n->t('New presentation'), ($ooxml ? '.pptx' : '.odp'));
				if ($ooxml) {
					$odpType->addMimetype('application/vnd.ms-powerpoint');
					$odpType->addMimetype('application/vnd.openxmlformats-officedocument.presentationml.presentation');
				} else {
					$odpType->addMimetype('application/vnd.oasis.opendocument.presentation');
					$odpType->addMimetype('application/vnd.oasis.opendocument.presentation-template');
				}
				$odpType->setIconSvgInline(file_get_contents($appManager->getAppPath('richdocuments') . '/img/x-office-presentation.svg'));
				$odpType->setRatio(16 / 9);
				return $odpType;
			});

			if (!$capabilitiesService->hasDrawSupport()) {
				return;
			}
			$templateManager->registerTemplateFileCreator(function () use ($l10n, $ooxml, $appManager) {
				$odpType = new TemplateFileCreator('richdocuments', $l10n->t('New diagram'), '.odg');
				$odpType->addMimetype('application/vnd.oasis.opendocument.graphics');
				$odpType->addMimetype('application/vnd.oasis.opendocument.graphics-template');
				$odpType->setIconSvgInline(file_get_contents($appManager->getAppPath('richdocuments') . '/img/x-office-drawing.svg'));
				$odpType->setRatio(1);
				return $odpType;
			});
		});

		$this->checkAndEnableCODEServer();
	}

	public function checkAndEnableCODEServer() {
		// Supported only on Linux OS, and x86_64 & ARM64 platforms
		$supportedArchs = ['x86_64', 'aarch64'];
		$osFamily = PHP_VERSION_ID >= 70200 ? PHP_OS_FAMILY : PHP_OS;
		if ($osFamily !== 'Linux' || !in_array(php_uname('m'), $supportedArchs)) {
			return;
		}

		$CODEAppID = (php_uname('m') === 'x86_64') ? 'richdocumentscode' : 'richdocumentscode_arm64';

		if (Server::get(IAppManager::class)->isEnabledForUser($CODEAppID)) {
			$appConfig = $this->getContainer()->get(AppConfig::class);
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

			/** @var DiscoveryService $discoveryService */
			$discoveryService = $this->getContainer()->get(DiscoveryService::class);
			/** @var CapabilitiesService $capabilitiesService */
			$capabilitiesService = $this->getContainer()->get(CapabilitiesService::class);

			$discoveryService->resetCache();
			$capabilitiesService->resetCache();
			try {
				$capabilitiesService->fetch();
				$discoveryService->fetch();
			} catch (\Exception $e) {
			}
		}
	}
}
