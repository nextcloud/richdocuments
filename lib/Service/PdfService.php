<?php

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Service;

use mikehaertl\pdftk\Pdf;
use OCP\Files\Node;
use OCP\Files\Template\Field;
use OCP\Files\Template\FieldType;
use Psr\Log\LoggerInterface;

class PdfService {
	public function __construct(
		private LoggerInterface $logger
	) {
	}

	public function extractFields(Node $file): array {
		$filePath = $file->getStorage()->getLocalFile($file->getInternalPath());

		try {
			$pdf = new Pdf($filePath);
			$fields = $pdf->getDataFields();
			$templateFields = [];
			$index = 0;
			foreach ($fields as $field) {
				$fieldType = FieldType::tryFrom($field['FieldType']) ?? null;

				if ($fieldType === null) {
					continue;
				}

				$templateFields[] = new Field(
					$index,
					$field['FieldName'],
					$fieldType,
				);
				$index++;
			}
			return $templateFields;
		} catch (\Exception $e) {
			$this->logger->error('Failed to extract fields from PDF: {error}', ['error' => $e->getMessage(), 'exception' => $e]);
			return [];
		}
	}

	public function fillFields(Node $file, array $fieldValues): void {
		$filePath = $file->getStorage()->getLocalFile($file->getInternalPath());

		try {
			$pdf = new Pdf($filePath);
			$pdf->fillForm($fieldValues);
			$pdf->flatten();
			$pdf->saveAs($filePath);
		} catch (\Exception $e) {
			$this->logger->error('Failed to fill fields in PDF: {error}', ['error' => $e->getMessage(), 'exception' => $e]);
			throw $e;
		}
	}
}
