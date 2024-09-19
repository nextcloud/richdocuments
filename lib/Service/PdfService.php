<?php

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Service;

use mikehaertl\pdftk\Pdf;
use OCP\Files\Node;
use OCP\Files\Template\FieldFactory;
use OCP\Files\Template\FieldType;
use Psr\Log\LoggerInterface;

class PdfService {
	public function __construct(
		private LoggerInterface $logger,
	) {
	}

	public function extractFields(Node $file): array {
		$filePath = $file->getStorage()->getLocalFile($file->getInternalPath());

		try {
			$pdf = new Pdf($filePath);
			$fields = $pdf->getDataFields() ?: [];
			$templateFields = [];
			$index = 0;
			foreach ($fields as $field) {
				$fieldType = self::matchFieldType($field['FieldType']);

				if ($fieldType === null) {
					continue;
				}

				$templateField = FieldFactory::createField(
					(string)$index,
					$fieldType,
				);
				$templateField->setValue($field['FieldValue']);
				$templateField->alias = $field['FieldName'];

				$templateFields[] = $templateField;
				$index++;
			}
			return $templateFields;
		} catch (\Exception $e) {
			$this->logger->error('Failed to extract fields from PDF: {error}', ['error' => $e->getMessage(), 'exception' => $e]);
			return [];
		}
	}

	public function fillFields(Node $file, array $fieldValues) {
		if (!$file instanceof \OCP\Files\File) {
			return;
		}

		$filePath = $file->getStorage()->getLocalFile($file->getInternalPath());

		try {
			$pdf = new Pdf($filePath);
			$fields = $pdf->getDataFields();
			$fillData = [];
			foreach ($fieldValues as $index => $field) {
				if (!isset($fields[$index])) {
					continue;
				}
				$fieldName = $fields[$index]['FieldName'];
				$fieldData = $field['content'] ?? $fields[$index]['FieldValue'];
				$fillData[$fieldName] = $fieldData;
			}
			unset($pdf);

			$pdf = new Pdf($filePath);
			$pdf->fillForm($fillData);
			$pdf->flatten();
			$pdf->saveAs($filePath);
			return file_get_contents($filePath);
		} catch (\Exception $e) {
			$this->logger->error('Failed to fill fields in PDF: {error}', ['error' => $e->getMessage(), 'exception' => $e]);
			throw $e;
		}
	}

	public static function matchFieldType(string $type): ?FieldType {
		return match ($type) {
			'Text' => FieldType::RichText,
			default => null
		};
	}
}
