<?php
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Service;

use League\CommonMark\GithubFlavoredMarkdownConverter;
use OCA\Richdocuments\AppInfo\Application;
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
	public const PROMPT = <<<EOF
Generate a markdown document with titles, paragraphs, bullet points and tables if needed.
Write the document in the same language as the description.

Here is the document description:
EOF;

	public function __construct(
		private IManager $taskProcessingManager,
		private RemoteService $remoteService,
		private ITempManager $tempManager,
	) {
	}

	public function generateDocument(?string $userId, string $description) {
		$prompt = self::PROMPT;
		$task = new Task(
			TextToText::ID,
			['input' => $prompt . "\n\n" . $description],
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

		$markdownContent = $output['output'];
		$converter = new GithubFlavoredMarkdownConverter();
		$htmlContent = $converter->convert($markdownContent)->getContent();

		// TODO find a way to create a proper stream from a string instead of using a temp file

		//$htmlStream = fopen(sprintf('data://text/plain,%s', $htmlContent), 'r');
		//$htmlStream = fopen(sprintf('%s', $htmlContent), 'r');

		//$htmlStream = fopen('php://memory', 'r+');
		//fwrite($htmlStream, $htmlContent);
		//rewind($htmlStream);

		//$userStorage = $this->rootFolder->getUserFolder('user1');
		//$file = $userStorage->getFirstNodeById(4830);
		//$fileName = $file->getStorage()->getLocalFile($file->getInternalPath());
		//$htmlStream = fopen($fileName, 'rb');

		$tmpFilePath = $this->tempManager->getTemporaryFile();
		file_put_contents($tmpFilePath, $htmlContent);
		$htmlStream = fopen($tmpFilePath, 'rb');

		$docxContent = $this->remoteService->convertTo('document.html', $htmlStream, 'docx');

		return $docxContent;
	}
}
