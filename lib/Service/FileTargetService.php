<?php
/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Richdocuments\Service;

use OCP\Files\File;
use OCP\Files\IRootFolder;
use OCP\ICacheFactory;
use OCP\IL10N;
use OCP\IURLGenerator;
use Psr\Log\LoggerInterface;

class FileTargetService {

	public function __construct(
		private RemoteService $remoteService,
		private ICacheFactory $cacheFactory,
		private IRootFolder $rootFolder,
		private LoggerInterface $logger,
		private IL10N $l10n,
		private IURLGenerator $urlGenerator,
		private ?string $userId,
	) {
	}

	public function getFileTargets(File $file): array {
		$cache = $this->cacheFactory->createDistributed('richdocuments-filetarget');
		$cacheKey = $file->getId() . '_' . $file->getMTime();
		if ($cached = $cache->get($cacheKey)) {
			return $cached;
		}

		$result = $this->remoteService->fetchTargets($file);

		$categories = [];

		$targets = $result['Targets'];

		$filePath = $this->rootFolder->getUserFolder($this->userId)->getRelativePath($file->getPath());

		// Limit what we support to display
		if (isset($targets['Headings'])) {
			$categories['headings'] = [
				'label' => $this->l10n->t('Headings'),
				'entries' => $this->mapTargets($filePath, $targets['Headings'])
			];
		}

		if (isset($targets['Sections'])) {
			$categories['sections'] = [
				'label' => $this->l10n->t('Sections'),
				'entries' => $this->mapTargets($filePath, $targets['Sections'])
			];
		}

		if (isset($targets['Images'])) {
			$categories['images'] = [
				'label' => $this->l10n->t('Images'),
				'entries' => $this->mapTargets($filePath, $targets['Images'])
			];
		}

		if (isset($targets['Sheets'])) {
			$categories['sheets'] = [
				'label' => $this->l10n->t('Sheets'),
				'entries' => $this->mapTargets($filePath, $targets['Sheets'])
			];
		}

		if (isset($targets['Slide'])) {
			$categories['slides'] = [
				'label' => $this->l10n->t('Slides'),
				'entries' => $this->mapTargets($filePath, $targets['Slide'], true)
			];
		}

		$cache->set($cacheKey, $categories);

		return $categories;
	}

	public function getTargetPreview($file, $target) {
		return $this->remoteService->fetchTargetThumbnail($file, $target);
	}

	private function mapTargets(string $filePath, array $targets, bool $showPreview = false): array {
		$result = [];
		foreach ($targets as $name => $identifier) {
			$targetData = [
				'id' => $identifier,
				'name' => $name,
			];

			if ($showPreview) {
				$targetData['preview'] = $this->urlGenerator->linkToOCSRouteAbsolute('richdocuments.Target.getPreview', [
					'path' => $filePath,
					'target' => $identifier,
				]);
			}

			$result[] = $targetData;

		}
		return $result;
	}
}
