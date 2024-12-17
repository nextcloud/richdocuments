<?php
/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\Richdocuments;

use OCP\App\IAppManager;
use OCP\IUserSession;
use OCP\TaskProcessing\IManager;

class TaskProcessingManager {
	public const SUPPORTED_TASK_TYPES = [
		'core:text2text',
		'core:text2image',
	];

	public function __construct(
		private IManager $taskProcessing,
		private IAppManager $appManager,
		private IUserSession $userSession,
	) {
	}

	public function isTaskProcessingEnabled(): bool {
		// Check if task processing should be considered enabled
		// if any of our supported task types are available
		$availableTaskTypes = array_intersect_key(
			$this->taskProcessing->getAvailableTaskTypes(),
			array_flip(self::SUPPORTED_TASK_TYPES)
		);

		// Check if the Assistant is actually enabled for the user
		$isAssistantEnabled = $this->appManager->isEnabledForUser('assistant', $this->userSession->getUser());

		return !empty($availableTaskTypes) && $isAssistantEnabled;
	}
}
