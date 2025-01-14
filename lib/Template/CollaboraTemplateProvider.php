<?php
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);


namespace OCA\Richdocuments\Template;

use OCA\Richdocuments\TemplateManager;
use OCP\Files\File;
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
	) {
	}

	public function getTemplateType(): string {
		return CollaboraTemplateProvider::class;
	}

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

	private function isSameUserTemplateFolder(): bool {
		try {
			$userTemplatesFolder = $this->templateManager->getUserTemplateDir();
			$internalPath = $userTemplatesFolder->getInternalPath();
			$userTemplatePath = mb_strpos($internalPath, 'files/') === 0 ? mb_substr($internalPath, 5): $internalPath;
			return $this->coreTemplateManager->getTemplatePath() === $userTemplatePath;
		} catch (NotFoundException) {
		}
		return false;
	}

	public function getCustomTemplate(string $template): File {
		return $this->templateManager->get((int)$template);
	}
}
