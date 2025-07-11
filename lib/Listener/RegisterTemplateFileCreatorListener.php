<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Richdocuments\Listener;

use OCA\Richdocuments\AppInfo\Application;
use OCA\Richdocuments\PermissionManager;
use OCA\Richdocuments\Service\CapabilitiesService;
use OCP\App\IAppManager;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Files\Template\RegisterTemplateCreatorEvent;
use OCP\Files\Template\TemplateFileCreator;
use OCP\IConfig;
use OCP\IL10N;

/** @template-implements IEventListener<Event|RegisterTemplateCreatorEvent> */
class RegisterTemplateFileCreatorListener implements IEventListener {
	public function __construct(
		private IL10N $l10n,
		private IConfig $config,
		private IAppManager $appManager,
		private CapabilitiesService $capabilitiesService,
		private PermissionManager $permissionManager,
	) {
	}

	public function handle(Event $event): void {
		if (!$event instanceof RegisterTemplateCreatorEvent) {
			return;
		}

		if (!$this->permissionManager->isEnabledForUser() || !$this->permissionManager->userCanEdit() || empty($this->capabilitiesService->getCapabilities())) {
			return;
		}

		$templateManager = $event->getTemplateManager();
		$ooxml = $this->config->getAppValue(Application::APPNAME, 'doc_format', 'ooxml') === 'ooxml';
		$appPath = $this->appManager->getAppPath('richdocuments');

		$templateManager->registerTemplateFileCreator(function () use ($ooxml, $appPath) {
			$odtType = new TemplateFileCreator('richdocuments', $this->l10n->t('New document'), ($ooxml ? '.docx' : '.odt'));
			if ($ooxml) {
				$odtType->addMimetype('application/msword');
				$odtType->addMimetype('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
			} else {
				$odtType->addMimetype('application/vnd.oasis.opendocument.text');
				$odtType->addMimetype('application/vnd.oasis.opendocument.text-template');
			}
			$odtType->setIconSvgInline(file_get_contents($appPath . '/img/x-office-document.svg'));
			$odtType->setRatio(21 / 29.7);
			return $odtType;
		});
		$templateManager->registerTemplateFileCreator(function () use ($ooxml, $appPath) {
			$odsType = new TemplateFileCreator('richdocuments', $this->l10n->t('New spreadsheet'), ($ooxml ? '.xlsx' : '.ods'));
			if ($ooxml) {
				$odsType->addMimetype('application/vnd.ms-excel');
				$odsType->addMimetype('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
			} else {
				$odsType->addMimetype('application/vnd.oasis.opendocument.spreadsheet');
				$odsType->addMimetype('application/vnd.oasis.opendocument.spreadsheet-template');
			}
			$odsType->setIconSvgInline(file_get_contents($appPath . '/img/x-office-spreadsheet.svg'));
			$odsType->setRatio(16 / 9);
			return $odsType;
		});
		$templateManager->registerTemplateFileCreator(function () use ($ooxml, $appPath) {
			$odpType = new TemplateFileCreator('richdocuments', $this->l10n->t('New presentation'), ($ooxml ? '.pptx' : '.odp'));
			if ($ooxml) {
				$odpType->addMimetype('application/vnd.ms-powerpoint');
				$odpType->addMimetype('application/vnd.openxmlformats-officedocument.presentationml.presentation');
			} else {
				$odpType->addMimetype('application/vnd.oasis.opendocument.presentation');
				$odpType->addMimetype('application/vnd.oasis.opendocument.presentation-template');
			}
			$odpType->setIconSvgInline(file_get_contents($appPath . '/img/x-office-presentation.svg'));
			$odpType->setRatio(16 / 9);
			return $odpType;
		});

		if (!$this->capabilitiesService->hasDrawSupport()) {
			return;
		}
		$templateManager->registerTemplateFileCreator(function () use ($ooxml, $appPath) {
			$odpType = new TemplateFileCreator('richdocuments', $this->l10n->t('New diagram'), '.odg');
			$odpType->addMimetype('application/vnd.oasis.opendocument.graphics');
			$odpType->addMimetype('application/vnd.oasis.opendocument.graphics-template');
			$odpType->setIconSvgInline(file_get_contents($appPath . '/img/x-office-drawing.svg'));
			$odpType->setRatio(1);
			return $odpType;
		});
	}
}
