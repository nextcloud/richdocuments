<?php
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Service;

use OCA\Richdocuments\AppInfo\Application;
use OCP\TaskProcessing\Exception\Exception;
use OCP\TaskProcessing\Exception\NotFoundException;
use OCP\TaskProcessing\Exception\PreConditionNotMetException;
use OCP\TaskProcessing\Exception\UnauthorizedException;
use OCP\TaskProcessing\Exception\ValidationException;
use OCP\TaskProcessing\IManager;
use OCP\TaskProcessing\Task;
use OCP\TaskProcessing\TaskTypes\TextToText;
use RuntimeException;

class SlideDeckService {
	public const PROMPT = <<<EOF
Draft a presentation slide deck with headlines and a maximum of 5 bullet points per headline. Use the following JSON structure for your whole output and output only the JSON array, no introductory text:

```
[{"headline": "Headline 1", points: ["Bullet point 1", "Bullet point 2"]}, {"headline": "Headline 2", points: ["Bullet point 1", "Bullet point 2"]}]
```

Here is the presentation text:
EOF;

	public function __construct(
		private IManager $taskProcessingManager,
	) {
	}

	public function generateSlideDeck(?string $userId, string $presentationText) {
		$prompt = self::PROMPT;
		$task = new Task(
			TextToText::ID,
			['input' => $prompt . "\n\n" . $presentationText],
			Application::APPNAME,
			$userId
		);
		try {
			$this->taskProcessingManager->scheduleTask($task);
		} catch (PreConditionNotMetException|UnauthorizedException|ValidationException|Exception $e) {
			throw new RuntimeException($e->getMessage(), $e->getCode(), $e);
		}
		while (true) {
			try {
				$task = $this->taskProcessingManager->getTask($task->getId());
			} catch (NotFoundException|Exception $e) {
				throw new RuntimeException($e->getMessage(), $e->getCode(), $e);
			}
			if (in_array($task->getStatus(), [Task::STATUS_SUCCESSFUL, Task::STATUS_FAILED, Task::STATUS_CANCELLED])) {
				break;
			}
		}
		if ($task->getStatus() !== Task::STATUS_SUCCESSFUL) {
			throw new RuntimeException('LLM backend Task with id ' . $task->getId() . ' failed or was cancelled');
		}

		$output = $task->getOutput();
		if (isset($output['output'])) {
			throw new RuntimeException('LLM backend Task with id ' . $task->getId() . ' does not have output key');
		}

		$headlines = json_decode($output['output'], associative: true);

		return $output['output'];
	}
}
