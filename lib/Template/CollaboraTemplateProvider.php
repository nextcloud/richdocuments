<?php
/*
 * @copyright Copyright (c) 2021 Julius Härtl <jus@bitgrid.net>
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

declare(strict_types=1);


namespace OCA\Richdocuments\Template;


use OCA\Richdocuments\TemplateManager;
use OCP\Files\File;
use OCP\Files\Template\ICustomTemplateProvider;
use OCP\Files\Template\Template;
use OCP\Files\Template\TemplateFileCreator;
use OCP\IURLGenerator;

class CollaboraTemplateProvider implements ICustomTemplateProvider {

	/** @var TemplateManager */
	private $templateManager;
	/** @var IURLGenerator */
	private $urlGenerator;

	public function __construct(TemplateManager $templateManager, IURLGenerator $urlGenerator) {
		$this->templateManager = $templateManager;
		$this->urlGenerator = $urlGenerator;
	}

	public function getTemplateType(): string {
		return CollaboraTemplateProvider::class;
	}

	public function getCustomTemplates(string $mimetype): array {
		if (in_array($mimetype, TemplateManager::MIMES_DOCUMENTS)) {
			$type = 'document';
		} else if (in_array($mimetype, TemplateManager::MIMES_SHEETS)) {
			$type = 'spreadsheet';
		} else if (in_array($mimetype, TemplateManager::MIMES_PRESENTATIONS)) {
			$type = 'presentation';
		} else {
			return [];
		}

		return array_map(function(File $file) {
			$template = new Template(CollaboraTemplateProvider::class, (string)$file->getId(), $file);
			$template->setCustomPreviewUrl($this->urlGenerator->linkToRouteAbsolute('richdocuments.templates.getPreview', ['fileId' => $file->getId()]));
			return $template;
		}, $this->templateManager->getAll($type));
	}

	public function getCustomTemplate(string $template): File {
		return $this->templateManager->get((int)$template);
	}

	public function createFromTemplate(File $template, File $target): void {
		// TODO: Implement createFromTemplate() method.
	}
}
