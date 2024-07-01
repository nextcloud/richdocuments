<?php

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Service;

use mikehaertl\pdftk\Pdf;
use OCP\Files\Node;
use OCP\IConfig;
use Psr\Log\LoggerInterface;

class PdfService {
	public function __construct(
		private IConfig $config,
		private LoggerInterface $logger
	) {
	}

	public function extractFields(Node $file): array {
		$dataDir = $this->config->getSystemValue('datadirectory');
		$filePath = $dataDir . $file->getPath();

		try {
			$pdf = new Pdf($filePath);
			$fields = $pdf->getDataFields();
			$templateFields = [];
			foreach ($fields as $field) {
				$templateFields[] = [
					'name' => $field['FieldName'],
					'type' => $field['FieldType'],
					'default' => $field['FieldValueDefault'] ?? '',
					'options' => $field['FieldStateOption'] ?? [],
				];
			}
			return $templateFields;
		} catch (\Exception $e) {
			// Log
			$this->logger->debug('Failed to extract fields from PDF: {error}', ['error' => $e->getMessage()]);
			return [];
		}
	}

	public function fillFields(Node $file, array $fieldValues): void {
		$dataDir = $this->config->getSystemValue('datadirectory');
		$filePath = $dataDir . $file->getPath();

		try {
			$pdf = new Pdf($filePath);
			$pdf->fillForm($fieldValues);
			$pdf->flatten();
			$pdf->saveAs($filePath);
		} catch (\Exception $e) {
			$this->logger->debug('Failed to fill fields in PDF: {error}', ['error' => $e->getMessage()]);
			throw $e;
		}
	}
}
