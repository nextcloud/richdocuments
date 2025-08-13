<?php
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Service;

use OCA\Richdocuments\AppInfo\Application;
use OCA\Richdocuments\TaskProcessing\Presentation\LayoutType;
use OCA\Richdocuments\TaskProcessing\Presentation\Presentation;
use OCA\Richdocuments\TaskProcessing\Presentation\Slides\TitleContentSlide;
use OCA\Richdocuments\TaskProcessing\Presentation\Slides\TitleSlide;
use OCA\Richdocuments\TemplateManager;
use OCP\IConfig;
use OCP\TaskProcessing\Exception\Exception;
use OCP\TaskProcessing\Exception\PreConditionNotMetException;
use OCP\TaskProcessing\Exception\UnauthorizedException;
use OCP\TaskProcessing\Exception\ValidationException;
use OCP\TaskProcessing\IManager;
use OCP\TaskProcessing\Task;
use OCP\TaskProcessing\TaskTypes\TextToText;
use RuntimeException;

class SlideDeckService {
	public const PROMPT = <<<EOF
Draft a presentation with slides based on the following JSON.
Replace the title, subtitle, and content with your own.
If the content is an array of bullet point strings, replace them as necessary and always use at least four of them. Do not place any dot (.) or hyphen (-) before the bullet points.
Use the following JSON structure for your entire output.
Output 5 or more of the JSON objects, and use each of them at least once.
Output only the JSON array:

```
[
    {
        "layout": 0,
        "title": "Presentation title",
        "subtitle": "Presentation subtitle"
    },
	{
		"layout": 1,
		"title": "Slide title",
		"content": "Paragraph or other longer text"
	},
	{
		"layout": 1,
		"title": "Slide title",
		"content": [
			"Bullet point one",
			"Bullet point two",
			"Bullet point three",
			"Bullet point four"
		]
	}
]
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

		$layoutTypes = array_column(LayoutType::cases(), 'value');
		$presentation = new Presentation();

		foreach ($modelJSON as $index => $slideJSON) {
			$validLayout = array_key_exists($slideJSON['layout'], $layoutTypes);

			if (!$validLayout) {
				continue;
			}

			$slideLayout = LayoutType::from($layoutTypes[$slideJSON['layout']]);

			$slide = match ($slideLayout) {
				LayoutType::Title => new TitleSlide($index, $slideJSON['title'], $slideJSON['subtitle']),

				LayoutType::TitleContent => new TitleContentSlide($index, $slideJSON['title'], $slideJSON['content']),

				default => null,
			};

			if (is_null($slide)) {
				continue;
			}

			$presentation->addSlide($slide);
		}

		return $presentation->getSlideCommands();
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
			$task = $this->taskProcessingManager->runTask($task);
		} catch (PreConditionNotMetException|UnauthorizedException|ValidationException|Exception $e) {
			throw new RuntimeException($e->getMessage(), $e->getCode(), $e);
		}
		$taskOutput = $task->getOutput();
		if ($taskOutput === null) {
			throw new RuntimeException('Task with id ' . $task->getId() . ' does not have any output');
		}

		/** @var string $taskOutputString */
		$taskOutputString = $taskOutput['output'];

		return $taskOutputString;
	}
}
