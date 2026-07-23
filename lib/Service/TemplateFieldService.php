<?php

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Service;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Capabilities;
use OCP\Files\File;
use OCP\Files\IRootFolder;
use OCP\Files\Node;
use OCP\Files\NotFoundException;
use OCP\Files\Template\Field;
use OCP\Files\Template\FieldFactory;
use OCP\Files\Template\FieldType;
use OCP\Files\Template\InvalidFieldTypeException;
use OCP\Http\Client\IClientService;
use OCP\ICacheFactory;
use OCP\ITempManager;
use Psr\Log\LoggerInterface;

class TemplateFieldService {
	public function __construct(
		private IClientService $clientService,
		private CapabilitiesService $capabilitiesService,
		private AppConfig $appConfig,
		private IRootFolder $rootFolder,
		private LoggerInterface $logger,
		private ICacheFactory $cacheFactory,
		private RemoteService $remoteService,
		private ITempManager $tempManager,
		private PdfService $pdfService,
		private ?string $userId,
	) {
	}

	/**
	 * @param Node|int $file
	 * @return Field[]
	 * @throws NotFoundException
	 */
	public function extractFields(Node|int $file): array {
		if (is_int($file)) {
			$file = $this->rootFolder->getFirstNodeById($file);
		}

		try {
			if (!$file || !$file instanceof File) {
				throw new NotFoundException();
			}

			$localCache = $this->cacheFactory->createLocal('richdocuments_templates/');
			$cacheName = $file->getId() . '/' . $file->getEtag();
			$cachedResponse = $localCache->get($cacheName);

			if ($cachedResponse !== null) {
				return $cachedResponse;
			}

			if ($file->getMimeType() === 'application/pdf') {
				$fields = $this->pdfService->extractFields($file);
				$localCache->set($cacheName, $fields, 3600);
				return $fields;
			}

			if (!in_array($file->getMimetype(), Capabilities::MIMETYPES)) {
				return [];
			}

			$documentStructure = $this->remoteService->extractDocumentStructure(
				$file->getName(),
				$file->getStorage()->fopen($file->getInternalPath(), 'r'),
				'contentcontrol'
			);

			$fields = [];

			foreach ($documentStructure as $index => $attr) {
				$fieldType = FieldType::tryFrom($attr['type'] ?? '') ?? null;
				if ($fieldType === null) {
					continue;
				}

				try {
					$field = FieldFactory::createField($index, $fieldType);
				} catch (InvalidFieldTypeException) {
					continue;
				}
				$field->id = $attr['id'];
				$field->tag = $attr['tag'];
				$field->alias = $attr['alias'];

				switch ($fieldType) {
					case FieldType::RichText:
						$field->setValue($attr['content']);
						break;
					case FieldType::CheckBox:
						$field->setValue($attr['Checked'] === 'true');
						break;
					default:
						break;
				}

				$fields[] = [$field];
			}

			$fields = array_merge([], ...$fields);
			$localCache->set($cacheName, $fields, 3600);

			return $fields;
		} catch (\Exception $e) {
			$this->logger->error($e->getMessage());
			return [];
		}
	}

	/**
	 * @param Node|int $file
	 * @param array<string, array{content: string}> $fields
	 * @return string|resource
	 */
	public function fillFields(Node|int $file, array $fields = [], ?string $destination = null, ?string $format = null) {
		if (is_int($file)) {
			$file = $this->rootFolder->getFirstNodeById($file);
		}

		if (!$file || !$file instanceof File) {
			$e = new NotFoundException();
			$this->logger->error($e->getMessage());

			throw $e;
		}

		if ($file->getMimeType() === 'application/pdf') {
			$content = $this->pdfService->fillFields($file, $fields);
			if ($destination !== null) {
				$this->writeToDestination($destination, $content);
			}
			return $content;
		}

		try {
			$content = $this->remoteService->transformDocumentStructure(
				$file->getName(),
				$file->getStorage()->fopen($file->getInternalPath(), 'r'),
				$fields,
				$format === null ? $file->getExtension() : $format
			);

			if ($destination !== null) {
				$this->writeToDestination($destination, $content);
			}

			return $content;
		} catch (\Exception $e) {
			$this->logger->error($e->getMessage());
			throw $e;
		}
	}

	private function writeToDestination(string $destination, $data): void {
		$userFolder = $this->rootFolder->getUserFolder($this->userId);
		$userFolder->newFile($destination, $data);
	}
}
