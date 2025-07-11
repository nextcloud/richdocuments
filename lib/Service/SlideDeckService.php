<?php
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Service;

use OCA\Richdocuments\AppInfo\Application;
use OCA\Richdocuments\TemplateManager;
use OCP\IConfig;
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
[{"headline": "Headline 1", "points": ["Bullet point 1", "Bullet point 2"]}, {"headline": "Headline 2", "points": ["Bullet point 1", "Bullet point 2"]}]
```

Here is the presentation text:
EOF;

	public function __construct(
		private IManager $taskProcessingManager,
		private TemplateManager $templateManager,
		private RemoteService $remoteService,
		private IConfig $config,
	) {
	}

	public function generateSlideDeck(?string $userId, string $presentationText) {
		$rawModelOutput = $this->runLLMQuery($userId, $presentationText);

		$ooxml = $this->config->getAppValue(Application::APPNAME, 'doc_format', '') === 'ooxml';
		$format = $ooxml ? 'pptx' : 'odp';
		$emptyPresentation = $this->getBlankPresentation($format);

		try {
			$parsedStructure = $this->parseModelJSON($rawModelOutput);
		} catch (\JsonException) {
			throw new RuntimeException('LLM generated faulty JSON data');
		}

		try {
			$transformedPresentation = $this->remoteService->transformDocumentStructure(
				'presentation.' . $format,
				$emptyPresentation,
				$parsedStructure
			);

			return $transformedPresentation;
		} catch (\Exception) {
			throw new RuntimeException('Unable to apply transformations to presentation file');
		}
	}

	/**
	 * Parses the JSON output from the LLM into
	 * JSON that Collabora expects
	 *
	 * @param string $jsonString
	 * @return array
	 */
	private function parseModelJSON(string $jsonString): array {
		$modelJSON = json_decode(
			$jsonString,
			associative: true,
			flags: JSON_THROW_ON_ERROR
		);

		$slideCommands = [];
		foreach ($modelJSON as $index => $slide) {
			if (count($slideCommands) > 0) {
				$slideCommands[] = [ 'JumpToSlide' => 'last' ];
				$slideCommands[] = [ 'InsertMasterSlide' => 0 ];
			} else {
				$slideCommands[] = [ 'JumpToSlide' => $index];
			}

			$slideCommands[] = [ 'ChangeLayoutByName' => 'AUTOLAYOUT_TITLE_CONTENT' ];
			$slideCommands[] = [ 'SetText.0' => $slide['headline'] ];

			$editTextObjectCommands = [
				[ 'SelectParagraph' => 0 ],
				[ 'InsertText' => implode(PHP_EOL, $slide['points']) ],
			];

			$slideCommands[] = [ 'EditTextObject.1' => $editTextObjectCommands ];
		}

		return [ 'SlideCommands' => $slideCommands ];
	}

	/**
	 * Creates a blank presentation file in memory
	 *
	 * @param string $format
	 * @return resource
	 */
	private function getBlankPresentation(string $format) {
		$emptyPresentationContent = $this->templateManager->getEmptyFileContent($format);
		$memoryStream = fopen('php://memory', 'r+');

		if (!$memoryStream) {
			throw new RuntimeException('Unable to open file stream');
		}

		fwrite($memoryStream, $emptyPresentationContent);
		rewind($memoryStream);

		return $memoryStream;
	}

	private function runLLMQuery(?string $userId, string $presentationText) {
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

		return $task->getOutput()['output'];
	}
}
