<?php

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\Richdocuments\TaskProcessing;

use OCA\Richdocuments\AppInfo\Application;
use OCA\Richdocuments\Service\SlideDeckService;
use OCP\IL10N;
use OCP\TaskProcessing\ISynchronousProvider;

class SlideDeckGenerationProvider implements ISynchronousProvider {

	public function __construct(
		private SlideDeckService $slideDeckService,
		private IL10N $l10n,
	) {
	}

	#[\Override]
	public function getId(): string {
		return Application::APPNAME . '-slide_deck_generator';
	}

	#[\Override]
	public function getName(): string {
		return $this->l10n->t('Nextcloud Assistant Slide Deck Generator');
	}

	#[\Override]
	public function getTaskTypeId(): string {
		return SlideDeckGenerationTaskType::ID;
	}

	#[\Override]
	public function getExpectedRuntime(): int {
		return 120;
	}

	#[\Override]
	public function getInputShapeEnumValues(): array {
		return [];
	}

	#[\Override]
	public function getInputShapeDefaults(): array {
		return [];
	}

	#[\Override]
	public function getOptionalInputShape(): array {
		return [];
	}

	#[\Override]
	public function getOptionalInputShapeEnumValues(): array {
		return [];
	}

	#[\Override]
	public function getOptionalInputShapeDefaults(): array {
		return [];
	}

	#[\Override]
	public function getOutputShapeEnumValues(): array {
		return [];
	}

	#[\Override]
	public function getOptionalOutputShape(): array {
		return [];
	}

	#[\Override]
	public function getOptionalOutputShapeEnumValues(): array {
		return [];
	}
	/**
	 * @inheritDoc
	 */
	#[\Override]
	public function process(?string $userId, array $input, callable $reportProgress): array {
		if ($userId === null) {
			throw new \RuntimeException('User ID is required to process the prompt.');
		}

		if (!isset($input['text']) || !is_string($input['text'])) {
			throw new \RuntimeException('Invalid input, expected "text" key with string value');
		}

		$response = $this->withRetry(function () use ($userId, $input) {
			return $this->slideDeckService->generateSlideDeck(
				$userId,
				$input['text'],
			);
		});

		return ['slide_deck' => $response];
	}

	private function withRetry(callable $action, $maxAttempts = 2) {
		$attempt = 0;

		while ($attempt < $maxAttempts) {
			try {
				$attempt += 1;
				return $action();
			} catch (\Exception $e) {
				if ($attempt === $maxAttempts) {
					throw $e;
				}
			}
		}
	}
}
