<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2016 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\AppInfo;

use OCA\Files_Sharing\Event\ShareLinkAccessedEvent;
use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Capabilities;
use OCA\Richdocuments\Conversion\ConversionProvider;
use OCA\Richdocuments\Db\WopiMapper;
use OCA\Richdocuments\Listener\AddContentSecurityPolicyListener;
use OCA\Richdocuments\Listener\AddFeaturePolicyListener;
use OCA\Richdocuments\Listener\BeforeFetchPreviewListener;
use OCA\Richdocuments\Listener\BeforeGetTemplatesListener;
use OCA\Richdocuments\Listener\BeforeTemplateRenderedListener;
use OCA\Richdocuments\Listener\FileCreatedFromTemplateListener;
use OCA\Richdocuments\Listener\LoadAdditionalListener;
use OCA\Richdocuments\Listener\LoadViewerListener;
use OCA\Richdocuments\Listener\OverwritePublicSharePropertiesListener;
use OCA\Richdocuments\Listener\ReferenceListener;
use OCA\Richdocuments\Listener\RegisterTemplateFileCreatorListener;
use OCA\Richdocuments\Listener\ShareLinkListener;
use OCA\Richdocuments\Middleware\WOPIMiddleware;
use OCA\Richdocuments\Notification\Notifier;
use OCA\Richdocuments\Preview\EMF;
use OCA\Richdocuments\Preview\MSExcel;
use OCA\Richdocuments\Preview\MSWord;
use OCA\Richdocuments\Preview\OOXML;
use OCA\Richdocuments\Preview\OpenDocument;
use OCA\Richdocuments\Preview\Pdf;
use OCA\Richdocuments\Reference\OfficeTargetReferenceProvider;
use OCA\Richdocuments\Storage\SecureViewWrapper;
use OCA\Richdocuments\TaskProcessing\SlideDeckGenerationProvider;
use OCA\Richdocuments\TaskProcessing\SlideDeckGenerationTaskType;
use OCA\Richdocuments\TaskProcessing\TextToDocumentProvider;
use OCA\Richdocuments\TaskProcessing\TextToDocumentTaskType;
use OCA\Richdocuments\TaskProcessing\TextToSpreadsheetProvider;
use OCA\Richdocuments\TaskProcessing\TextToSpreadsheetTaskType;
use OCA\Richdocuments\Template\CollaboraTemplateProvider;
use OCA\Talk\Events\OverwritePublicSharePropertiesEvent;
use OCA\Viewer\Event\LoadViewer;
use OCP\AppFramework\App;
use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use OCP\AppFramework\Http\Events\BeforeTemplateRenderedEvent;
use OCP\Collaboration\Reference\RenderReferenceEvent;
use OCP\Collaboration\Resources\LoadAdditionalScriptsEvent;
use OCP\Files\Storage\IStorage;
use OCP\Files\Template\BeforeGetTemplatesEvent;
use OCP\Files\Template\FileCreatedFromTemplateEvent;
use OCP\Files\Template\RegisterTemplateCreatorEvent;
use OCP\IAppConfig;
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
		\OCP\Util::connectHook('OC_Filesystem', 'preSetup', $this, 'addStorageWrapper');

		$context->registerTemplateProvider(CollaboraTemplateProvider::class);
		$context->registerCapability(Capabilities::class);
		$context->registerMiddleWare(WOPIMiddleware::class);
		$context->registerEventListener(RegisterTemplateCreatorEvent::class, RegisterTemplateFileCreatorListener::class);
		$context->registerEventListener(FileCreatedFromTemplateEvent::class, FileCreatedFromTemplateListener::class);
		$context->registerEventListener(AddContentSecurityPolicyEvent::class, AddContentSecurityPolicyListener::class);
		$context->registerEventListener(AddFeaturePolicyEvent::class, AddFeaturePolicyListener::class);
		$context->registerEventListener(LoadAdditionalScriptsEvent::class, LoadAdditionalListener::class);
		$context->registerEventListener(LoadViewer::class, LoadViewerListener::class);
		$context->registerEventListener(ShareLinkAccessedEvent::class, ShareLinkListener::class);
		$context->registerEventListener(BeforePreviewFetchedEvent::class, BeforeFetchPreviewListener::class);
		$context->registerEventListener(RenderReferenceEvent::class, ReferenceListener::class);
		$context->registerEventListener(BeforeTemplateRenderedEvent::class, BeforeTemplateRenderedListener::class);
		$context->registerEventListener(BeforeGetTemplatesEvent::class, BeforeGetTemplatesListener::class);
		$context->registerEventListener(OverwritePublicSharePropertiesEvent::class, OverwritePublicSharePropertiesListener::class);
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
		$context->registerFileConversionProvider(ConversionProvider::class);
		$context->registerNotifierService(Notifier::class);

		$context->registerTaskProcessingTaskType(TextToDocumentTaskType::class);
		$context->registerTaskProcessingProvider(TextToDocumentProvider::class);
		$context->registerTaskProcessingTaskType(TextToSpreadsheetTaskType::class);
		$context->registerTaskProcessingProvider(TextToSpreadsheetProvider::class);
		$context->registerTaskProcessingProvider(SlideDeckGenerationProvider::class);
		$context->registerTaskProcessingTaskType(SlideDeckGenerationTaskType::class);
	}

	public function boot(IBootContext $context): void {
	}

	/**
	 * @internal
	 */
	public function addStorageWrapper(): void {
		if (Server::get(IAppConfig::class)->getValueString(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_enabled', 'no') === 'no') {
			return;
		}

		\OC\Files\Filesystem::addStorageWrapper('richdocuments', [$this, 'addStorageWrapperCallback'], -10);
	}

	/**
	 * @param $mountPoint
	 * @param IStorage $storage
	 * @return SecureViewWrapper|IStorage
	 *@internal
	 */
	public function addStorageWrapperCallback($mountPoint, IStorage $storage) {
		if (!\OC::$CLI && $mountPoint !== '/') {
			return new SecureViewWrapper([
				'storage' => $storage,
				'mountPoint' => $mountPoint,
			]);
		}

		return $storage;
	}
}
