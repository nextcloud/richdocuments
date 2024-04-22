<?php

declare(strict_types=1);
/**
 * @copyright Copyright (c) 2022 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
namespace OCA\Richdocuments\Listener;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\AppInfo\Application;
use OCA\Richdocuments\PermissionManager;
use OCA\Richdocuments\Service\CapabilitiesService;
use OCP\App\IAppManager;
use OCP\AppFramework\Http\FeaturePolicy;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Files\Template\RegisterTemplateCreatorEvent;
use OCP\Files\Template\TemplateFileCreator;
use OCP\IConfig;
use OCP\IL10N;
use OCP\IRequest;
use OCP\Security\FeaturePolicy\AddFeaturePolicyEvent;

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

		if (!$this->permissionManager->isEnabledForUser() || empty($this->capabilitiesService->getCapabilities())) {
			return;
		}

		$templateManager = $event->getTemplateManager();
		$ooxml = $this->config->getAppValue(Application::APPNAME, 'doc_format', '') === 'ooxml';
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
