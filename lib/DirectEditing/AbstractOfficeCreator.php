<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\DirectEditing;

use OCA\Richdocuments\AppInfo\Application;
use OCA\Richdocuments\TemplateManager;
use OCP\DirectEditing\ACreateFromTemplate;
use OCP\DirectEditing\ATemplate;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\Files\File;
use OCP\Files\Template\FileCreatedFromTemplateEvent;
use OCP\IConfig;
use OCP\IL10N;
use OCP\IURLGenerator;

abstract class AbstractOfficeCreator extends ACreateFromTemplate {

	public function __construct(
		protected IL10N $l10n,
		protected IConfig $config,
		protected IURLGenerator $urlGenerator,
		protected TemplateManager $templateManager,
		protected IEventDispatcher $eventDispatcher,
	) {
	}

	/**
	 * The richdocuments {@see TemplateManager} type key (document/spreadsheet/...).
	 */
	abstract protected function getTemplateType(): string;

	abstract protected function getOdfExtension(): string;

	abstract protected function getOdfMimetype(): string;

	abstract protected function getOoxmlExtension(): string;

	abstract protected function getOoxmlMimetype(): string;

	#[\Override]
	public function getId(): string {
		return $this->getTemplateType();
	}

	#[\Override]
	public function getExtension(): string {
		return $this->isOoxml() ? $this->getOoxmlExtension() : $this->getOdfExtension();
	}

	#[\Override]
	public function getMimetype(): string {
		return $this->isOoxml() ? $this->getOoxmlMimetype() : $this->getOdfMimetype();
	}

	#[\Override]
	public function getTemplates(): array {
		$templates = $this->templateManager->getAllFormatted($this->getTemplateType());

		return array_map(
			fn (array $template): ATemplate => new OfficeTemplate(
				(string)$template['id'],
				$template['name'],
				$template['preview'] ?? '',
			),
			$templates,
		);
	}

	#[\Override]
	public function create(File $file, ?string $creatorId = null, ?string $templateId = null): void {
		$templateFile = null;
		if ($templateId !== null && $templateId !== '' && $templateId !== 'empty' && ctype_digit($templateId)) {
			try {
				$templateFile = $this->templateManager->get((int)$templateId);
			} catch (\Throwable) {
				$templateFile = null;
			}
		}

		$this->eventDispatcher->dispatchTyped(new FileCreatedFromTemplateEvent($templateFile, $file, []));
	}

	protected function isOoxml(): bool {
		return $this->config->getAppValue(Application::APPNAME, 'doc_format', 'ooxml') === 'ooxml';
	}
}
