<?php
/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Richdocuments\Reference;

use Exception;
use OCA\Richdocuments\AppInfo\Application;
use OCA\Richdocuments\Service\FileTargetService;
use OCP\Collaboration\Reference\ADiscoverableReferenceProvider;
use OCP\Collaboration\Reference\IReference;
use OCP\Collaboration\Reference\Reference;
use OCP\Files\IMimeTypeDetector;
use OCP\Files\IRootFolder;
use OCP\IL10N;
use OCP\IPreview;
use OCP\IURLGenerator;
use Psr\Log\LoggerInterface;

class OfficeTargetReferenceProvider extends ADiscoverableReferenceProvider {

	public function __construct(
		private FileTargetService $fileTargetService,
		private IURLGenerator $urlGenerator,
		private IL10N $l10n,
		private IPreview $previewManager,
		private IMimeTypeDetector $mimeTypeDetector,
		private IRootFolder $rootFolder,
		private LoggerInterface $logger,
		private ?string $userId,
	) {
	}

	/**
	 * @inheritDoc
	 */
	public function matchReference(string $referenceText): bool {
		$start = $this->urlGenerator->getAbsoluteURL('/apps/' . Application::APPNAME);
		$startIndex = $this->urlGenerator->getAbsoluteURL('/index.php/apps/' . Application::APPNAME);

		$noIndexMatch = preg_match('/^' . preg_quote($start, '/') . '\/editonline\/([0-9]+)\/(.*)$/', $referenceText) === 1;
		$indexMatch = preg_match('/^' . preg_quote($startIndex, '/') . '\/editonline\/([0-9]+)\/(.*)$/', $referenceText) === 1;

		return $noIndexMatch || $indexMatch;
	}

	/**
	 * @inheritDoc
	 */
	public function resolveReference(string $referenceText): ?IReference {
		$start = $this->urlGenerator->getAbsoluteURL('/apps/' . Application::APPNAME);
		$startIndex = $this->urlGenerator->getAbsoluteURL('/index.php/apps/' . Application::APPNAME);

		$matched = preg_match('/^' . preg_quote($start, '/') . '\/editonline\/([0-9]+)\/(.*)$/', $referenceText, $matches) === 1;
		if (!$matched) {
			$matched = preg_match('/^' . preg_quote($startIndex, '/') . '\/editonline\/([0-9]+)\/(.*)$/', $referenceText, $matches) === 1;
		}

		if (!$matched) {
			return null;
		}

		$fileId = (int)$matches[1];
		$target = urldecode($matches[2]);

		try {
			$userFolder = $this->rootFolder->getUserFolder($this->userId);
			$file = $userFolder->getFirstNodeById($fileId);
		} catch (Exception $e) {
			$this->logger->info('Failed to get file for office target reference: ' . $fileId, ['exception' => $e]);
			return null;
		}

		if ($file === null) {
			return null;
		}

		$label = null;
		if ($this->previewManager->isMimeSupported($file->getMimeType())) {
			$preview = $this->urlGenerator->linkToRouteAbsolute('core.Preview.getPreviewByFileId', ['x' => 1600, 'y' => 630, 'fileId' => $fileId]);
		} else {
			$fileTypeIconUrl = $this->mimeTypeDetector->mimeTypeIcon($file->getMimeType());
			$preview = $fileTypeIconUrl;
		}
		$targets = $this->fileTargetService->getFileTargets($file);
		foreach ($targets as $value) {
			$entries = $value['entries'];
			foreach ($entries as $entry) {
				if ($entry['id'] === $target) {
					$label = $entry['name'];
					$preview = $entry['preview'] ?? $preview;
					break 2;
				}
			}
		}
		$reference = new Reference($referenceText);
		$reference->setTitle($label ?? $file->getName());
		$reference->setDescription($label ? $file->getName(): null);
		$reference->setUrl($referenceText);

		$reference->setImageUrl($preview);

		/*
		FIXME: THis requires a change in the file provider to properly open the target link still
		$reference->setRichObject('file', [
			'id' => $file->getId(),
			'name' => $file->getName() . ' · ' . $label,
			'size' => $file->getSize(),
			'path' => $userFolder->getRelativePath($file->getPath()),
			'link' => $reference->getUrl(),
			'mimetype' => $file->getMimetype(),
			'mtime' => $file->getMTime(),
			'preview-available' => $this->previewManager->isAvailable($file)
		]);
		*/

		return $reference;
	}

	/**
	 * @inheritDoc
	 */
	public function getCachePrefix(string $referenceId): string {
		return $referenceId;
	}

	/**
	 * @inheritDoc
	 */
	public function getCacheKey(string $referenceId): ?string {
		return $this->userId ?? '';
	}

	public function getId(): string {
		return 'office-target';
	}

	public function getTitle(): string {
		return $this->l10n->t('Link to office document section');
	}

	public function getOrder(): int {
		return 90;
	}

	public function getIconUrl(): string {
		return $this->urlGenerator->getAbsoluteURL($this->urlGenerator->imagePath(Application::APPNAME, 'app-dark.svg'));
	}
}
