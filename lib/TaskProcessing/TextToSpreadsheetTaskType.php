<?php

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\Richdocuments\TaskProcessing;

use OCA\Richdocuments\AppInfo\Application;
use OCP\IL10N;
use OCP\TaskProcessing\EShapeType;
use OCP\TaskProcessing\ITaskType;
use OCP\TaskProcessing\ShapeDescriptor;

class TextToSpreadsheetTaskType implements ITaskType {
	public const ID = Application::APPNAME . ':text_to_spreadsheet_document';

	public function __construct(
		private IL10N $l,
	) {
	}

	/**
	 * @inheritDoc
	 */
	#[\Override]
	public function getName(): string {
		return $this->l->t('Generate Office spreadsheet document');
	}

	/**
	 * @inheritDoc
	 */
	#[\Override]
	public function getDescription(): string {
		return $this->l->t('Generate an Office spreadsheet document from a prompt');
	}

	/**
	 * @return string
	 */
	#[\Override]
	public function getId(): string {
		return self::ID;
	}

	/**
	 * @return ShapeDescriptor[]
	 */
	#[\Override]
	public function getInputShape(): array {
		return [
			'text' => new ShapeDescriptor(
				$this->l->t('Instructions'),
				$this->l->t('Describe the document you want the assistant to generate'),
				EShapeType::Text,
			),
		];
	}

	/**
	 * @return ShapeDescriptor[]
	 */
	#[\Override]
	public function getOutputShape(): array {
		return [
			'file' => new ShapeDescriptor(
				$this->l->t('Generated Office document'),
				$this->l->t('The Office document that was generated from the description'),
				EShapeType::File,
			),
		];
	}
}
