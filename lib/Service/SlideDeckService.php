<?php
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Service;

use OCA\Richdocuments\AppInfo\Application;
use OCA\Richdocuments\TemplateManager;
use OCP\IConfig;
use OCP\TaskProcessing\IManager;
use OCP\TaskProcessing\Task;
use OCP\TaskProcessing\TaskTypes\TextToText;
use RuntimeException;

class SlideDeckService {
	public const PROMPT = <<<EOF
Draft a presentation slide deck with headlines and a maximum of 5 bullet points per headline.
Use the following JSON structure for your whole output and output only the JSON array:

```
[{"headline": "Headline 1", "points": ["Bullet point 1", "Bullet point 2"]}, {"headline": "Headline 2", "points": ["Bullet point 1", "Bullet point 2"]}]
```

Only output the JSON array. Do not wrap it with spaces, new lines or backticks (`).

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

		$ooxml = $this->config->getAppValue(Application::APPNAME, 'doc_format', 'ooxml') === 'ooxml';
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
		$jsonString = trim($jsonString, "` \n\r\t\v\0");
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

		$task = $this->taskProcessingManager->runTask($task);
		$taskOutput = $task->getOutput();
		if ($taskOutput === null) {
			throw new RuntimeException('Task with id ' . $task->getId() . ' does not have any output');
		}

		/** @var string $taskOutputString */
		$taskOutputString = $taskOutput['output'];

		return $taskOutputString;
	}
}
