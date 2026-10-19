<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments\Controller;

use OCA\Richdocuments\Controller\TemplatesController;
use OCA\Richdocuments\TemplateManager;
use OCP\AppFramework\Http;
use OCP\Files\IMimeTypeDetector;
use OCP\IL10N;
use OCP\IPreview;
use OCP\IRequest;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class TemplatesControllerTest extends TestCase {
	private IRequest $request;
	private IL10N $l10n;
	private TemplateManager $manager;
	private IMimeTypeDetector $mimeTypeDetector;
	private LoggerInterface $logger;

	protected function setUp(): void {
		parent::setUp();

		$this->request = $this->createMock(IRequest::class);
		$this->l10n = $this->createMock(IL10N::class);
		$this->manager = $this->createMock(TemplateManager::class);
		$this->mimeTypeDetector = $this->createMock(IMimeTypeDetector::class);
		$this->logger = $this->createMock(LoggerInterface::class);

		$this->l10n->method('t')->willReturnArgument(0);
	}

	private function makeController(): TemplatesController {
		return new TemplatesController(
			'richdocuments',
			$this->request,
			$this->l10n,
			$this->manager,
			$this->createMock(IPreview::class),
			$this->mimeTypeDetector,
			$this->logger,
		);
	}

	private function givenUploadedFile(?array $file): void {
		$this->request->method('getUploadedFile')->with('files')->willReturn($file);
	}

	private function getMessage(Http\Response $response): ?string {
		return $response->getData()['data']['message'] ?? null;
	}

	public static function uploadErrorProvider(): array {
		return [
			'exceeds upload_max_filesize' => [UPLOAD_ERR_INI_SIZE, 'File is too big'],
			'exceeds MAX_FILE_SIZE' => [UPLOAD_ERR_FORM_SIZE, 'File is too big'],
			'no file submitted' => [UPLOAD_ERR_NO_FILE, 'No file was uploaded'],
			'partial upload' => [UPLOAD_ERR_PARTIAL, 'Failed to upload the file'],
			'missing temp dir' => [UPLOAD_ERR_NO_TMP_DIR, 'Failed to upload the file'],
			'write failed' => [UPLOAD_ERR_CANT_WRITE, 'Failed to upload the file'],
			'stopped by extension' => [UPLOAD_ERR_EXTENSION, 'Failed to upload the file'],
		];
	}

	/**
	 * @dataProvider uploadErrorProvider
	 */
	public function testAddReportsUploadErrors(int $error, string $expectedMessage): void {
		$this->givenUploadedFile([
			'name' => 'template.otp',
			'type' => '',
			'tmp_name' => '',
			'error' => $error,
			'size' => 0,
		]);
		$this->logger->expects($this->once())->method('error');

		$response = $this->makeController()->add();

		$this->assertSame(Http::STATUS_BAD_REQUEST, $response->getStatus());
		$this->assertSame($expectedMessage, $this->getMessage($response));
	}

	/**
	 * A failed upload leaves tmp_name empty, and detecting the mime type of an empty path
	 * raises a ValueError that surfaces as a 500 instead of the upload error.
	 *
	 * @dataProvider uploadErrorProvider
	 */
	public function testAddDoesNotDetectMimeTypeOfAFailedUpload(int $error): void {
		$this->givenUploadedFile([
			'name' => 'template.otp',
			'type' => '',
			'tmp_name' => '',
			'error' => $error,
			'size' => 0,
		]);
		$this->mimeTypeDetector->expects($this->never())->method('detect');

		$this->makeController()->add();
	}

	public function testAddRejectsAMissingUpload(): void {
		$this->givenUploadedFile(null);
		$this->mimeTypeDetector->expects($this->never())->method('detect');
		$this->manager->expects($this->never())->method('add');

		$response = $this->makeController()->add();

		$this->assertSame(Http::STATUS_BAD_REQUEST, $response->getStatus());
		$this->assertSame('Invalid file provided', $this->getMessage($response));
	}

	public function testAddRejectsAFileThatWasNotUploaded(): void {
		$this->givenUploadedFile([
			'name' => 'template.otp',
			'type' => 'application/vnd.oasis.opendocument.presentation-template',
			'tmp_name' => '/etc/passwd',
			'error' => UPLOAD_ERR_OK,
			'size' => 1024,
		]);
		$this->manager->expects($this->never())->method('add');

		$response = $this->makeController()->add();

		$this->assertSame(Http::STATUS_BAD_REQUEST, $response->getStatus());
		$this->assertSame('Invalid file provided', $this->getMessage($response));
	}
}
