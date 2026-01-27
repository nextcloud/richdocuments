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

class SlideDeckGenerationTaskType implements ITaskType {
	public const ID = Application::APPNAME . ':slide_deck_generation';

	public function __construct(
		private IL10N $l,
	) {
	}

	/**
	 * @inheritDoc
	 */
	#[\Override]
	public function getName(): string {
		return $this->l->t('Generate Slide Deck');
	}

	/**
	 * @inheritDoc
	 */
	#[\Override]
	public function getDescription(): string {
		return $this->l->t('Generate a slide deck from a presentation script');
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
				$this->l->t('Presentation script'),
				$this->l->t('Write the text for your presentation here'),
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
			'slide_deck' => new ShapeDescriptor(
				$this->l->t('Generated slide deck'),
				$this->l->t('The slide deck generated'),
				EShapeType::File,
			),
		];
	}
}
