<?php
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Service;

use League\CommonMark\GithubFlavoredMarkdownConverter;
use OCA\Richdocuments\AppInfo\Application;
use OCA\Richdocuments\TaskProcessing\TextToDocumentProvider;
use OCA\Richdocuments\TaskProcessing\TextToSpreadsheetProvider;
use OCP\ITempManager;
use OCP\TaskProcessing\Exception\Exception;
use OCP\TaskProcessing\Exception\NotFoundException;
use OCP\TaskProcessing\Exception\PreConditionNotMetException;
use OCP\TaskProcessing\Exception\UnauthorizedException;
use OCP\TaskProcessing\Exception\ValidationException;
use OCP\TaskProcessing\IManager;
use OCP\TaskProcessing\Task;
use OCP\TaskProcessing\TaskTypes\TextToText;
use RuntimeException;

class DocumentGenerationService {
	public const TEXT_PROMPT = <<<EOF
Generate a markdown document with titles, paragraphs, bullet points and tables if needed.
Write the document in the same language as the description.

Here is the document description:
EOF;

	public const SPREADSHEET_PROMPT = <<<EOF
Generate a CSV spreadsheet. Use the semicolon as a column separator.
Write the CSV content in the same language as the description.

Here is the CSV spreadsheet description:
EOF;

	public function __construct(
		private IManager $taskProcessingManager,
		private RemoteService $remoteService,
		private ITempManager $tempManager,
	) {
	}

	public function generateTextDocument(?string $userId, string $description, string $targetFormat = TextToDocumentProvider::DEFAULT_TARGET_FORMAT) {
		$prompt = self::TEXT_PROMPT;
		$taskInput = $prompt . "\n\n" . $description;
		$markdownContent = $this->runTextToTextTask($taskInput, $userId);
		$converter = new GithubFlavoredMarkdownConverter();
		$htmlContent = $converter->convert($markdownContent)->getContent();
		$htmlStream = $this->stringToStream($htmlContent);
		$docxContent = $this->remoteService->convertTo('document.html', $htmlStream, $targetFormat);

		return $docxContent;
	}

	public function generateSpreadSheetDocument(?string $userId, string $description, string $targetFormat = TextToSpreadsheetProvider::DEFAULT_TARGET_FORMAT) {
		$prompt = self::SPREADSHEET_PROMPT;
		$taskInput = $prompt . "\n\n" . $description;
		$csvContent = $this->runTextToTextTask($taskInput, $userId);
		$csvStream = $this->stringToStream($csvContent);
		// TODO understand why this request works with CURL but not with remoteService->convertTo
		$xlsxContent = $this->remoteService->convertTo('document.csv', $csvStream, $targetFormat);

		return $xlsxContent;
	}

	private function runTextToTextTask(string $input, ?string $userId): string {
		$task = new Task(
			TextToText::ID,
			['input' => $input],
			Application::APPNAME,
			$userId,
		);
		try {
			$this->taskProcessingManager->scheduleTask($task);
		} catch (PreConditionNotMetException|UnauthorizedException|ValidationException|Exception $e) {
			throw new RuntimeException($e->getMessage(), $e->getCode(), $e);
		}
		while (true) {
			try {
				$task = $this->taskProcessingManager->getTask($task->getId());
				sleep(2);
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
		if (!isset($output['output'])) {
			throw new RuntimeException('LLM backend Task with id ' . $task->getId() . ' does not have output key');
		}

		/** @var string $taskOutputString */
		$taskOutputString = $output['output'];

		return $taskOutputString;
	}

	private function stringToStream(string $text) {
		// TODO find a way to create a proper stream from a string instead of using a temp file

		//$stream = fopen(sprintf('data://text/plain,%s', $text), 'r');
		//$stream = fopen(sprintf('%s', $text), 'r');

		//$stream = fopen('php://memory', 'r+');
		//fwrite($stream, $text);
		//rewind($stream);

		// works
		//$userStorage = $this->rootFolder->getUserFolder('user1');
		//$file = $userStorage->getFirstNodeById(4971);
		//$fileName = $file->getStorage()->getLocalFile($file->getInternalPath());
		//$stream = fopen($fileName, 'rb');

		// works
		//$userStorage = $this->rootFolder->getUserFolder('user1');
		//$file = $userStorage->newFile('AAA.csv', $text);
		//$fileName = $file->getStorage()->getLocalFile($file->getInternalPath());
		//$stream = fopen($fileName, 'rb');

		// this only works for html content sent to /cool/convert-to/docx
		$tmpFilePath = $this->tempManager->getTemporaryFile();
		file_put_contents($tmpFilePath, $text);
		// 'rb' mode works there as well
		$stream = fopen($tmpFilePath, 'r');
		//$stream = \GuzzleHttp\Psr7\Utils::tryFopen($tmpFilePath, 'rb');
		if ($stream === false) {
			throw new RuntimeException('Failed to generate stream from string');
		}

		//$stream = \GuzzleHttp\Psr7\Utils::streamFor('string data');

		//$stream = fopen('php://temp', 'r+');
		//if ($text !== '') {
		//	fwrite($stream, $text);
		//	fseek($stream, 0);
		//}

		return $stream;
	}
}
