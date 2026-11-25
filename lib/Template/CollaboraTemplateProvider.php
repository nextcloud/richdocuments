<?php
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);


namespace OCA\Richdocuments\Template;

use OCA\Richdocuments\TemplateManager;
use OCP\Files\File;
use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException;
use OCP\Files\Template\ICustomTemplateProvider;
use OCP\Files\Template\ITemplateManager;
use OCP\Files\Template\Template;
use OCP\IURLGenerator;

class CollaboraTemplateProvider implements ICustomTemplateProvider {
	public function __construct(
		private TemplateManager $templateManager,
		private IURLGenerator $urlGenerator,
		private ITemplateManager $coreTemplateManager,
		private IRootFolder $rootFolder,
		private ?string $userId,
	) {
	}

	public function getTemplateType(): string {
		return CollaboraTemplateProvider::class;
	}

	#[\Override]
	public function getCustomTemplates(string $mimetype): array {
		if (in_array($mimetype, TemplateManager::MIMES_DOCUMENTS)) {
			$type = 'document';
		} elseif (in_array($mimetype, TemplateManager::MIMES_SHEETS)) {
			$type = 'spreadsheet';
		} elseif (in_array($mimetype, TemplateManager::MIMES_PRESENTATIONS)) {
			$type = 'presentation';
		} elseif (in_array($mimetype, TemplateManager::MIMES_DRAWINGS)) {
			$type = 'drawing';
		} else {
			return [];
		}

		$collaboraTemplates = $this->isSameUserTemplateFolder() ? $this->templateManager->getSystem($type) : $this->templateManager->getAll($type);

		return array_map(function (File $file) {
			$template = new Template(CollaboraTemplateProvider::class, (string)$file->getId(), $file);
			$template->setCustomPreviewUrl($this->urlGenerator->linkToRouteAbsolute('richdocuments.templates.getPreview', ['fileId' => $file->getId(), 'a' => true]));
			return $template;
		}, $collaboraTemplates);
	}

	/**
	 * Whether the server already serves templates from the same folder. Its
	 * template path is stored in varying shapes, so the folders themselves are
	 * compared rather than their paths.
	 */
	private function isSameUserTemplateFolder(): bool {
		$serverTemplatePath = $this->coreTemplateManager->getTemplatePath();
		if ($serverTemplatePath === '' || $this->userId === null) {
			return false;
		}

		try {
			$serverTemplatesFolder = $this->rootFolder->getUserFolder($this->userId)->get($serverTemplatePath);

			return $serverTemplatesFolder->getId() === $this->templateManager->getUserTemplateDir()->getId();
		} catch (NotFoundException) {
		}
		return false;
	}

	#[\Override]
	public function getCustomTemplate(string $template): File {
		return $this->templateManager->get((int)$template);
	}
}
