<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments\Template;

use OCA\Richdocuments\Template\CollaboraTemplateProvider;
use OCA\Richdocuments\TemplateManager;
use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\IRootFolder;
use OCP\Files\IUserFolder;
use OCP\Files\NotFoundException;
use OCP\Files\Template\ITemplateManager;
use OCP\Files\Template\Template;
use OCP\IURLGenerator;
use PHPUnit\Framework\MockObject\Builder\InvocationMocker;
use Test\TestCase;
use Throwable;

class CollaboraTemplateProviderTest extends TestCase {
	private const DOCUMENT_MIME = 'application/vnd.oasis.opendocument.text';
	private const USER_ID = 'alice';

	/**
	 * The server stores `core/templateDirectory` in whichever shape wrote it:
	 * its own initialisation writes a trailing slash and no leading one, the
	 * files personal settings write a leading slash and no trailing one. Either
	 * way it resolves to the folder the server already serves templates from,
	 * which must therefore not be served a second time here.
	 */
	public static function templateFolders(): array {
		return [
			'server initialised path' => ['Templates/', 42, 42, true],
			'personal settings path' => ['/Templates', 42, 42, true],
			'different folder' => ['/Other', 7, 42, false],
			'unset path' => ['', null, 42, false],
		];
	}

	/**
	 * @test
	 * @dataProvider templateFolders
	 */
	public function userTemplatesAreOmittedWhenTheServerServesTheSameFolder(
		string $serverTemplatePath,
		?int $serverFolderId,
		int $userTemplateDirId,
		bool $expectUserTemplatesOmitted,
	): void {
		$provider = $this->buildProvider($serverTemplatePath, $serverFolderId, $userTemplateDirId);

		self::assertSame(
			$expectUserTemplatesOmitted ? ['1'] : ['1', '2'],
			$this->templateIds($provider->getCustomTemplates(self::DOCUMENT_MIME)),
		);
	}

	/** @test */
	public function userTemplatesAreServedWhenTheServerTemplateFolderIsGone(): void {
		$provider = $this->buildProvider('Templates/', new NotFoundException(), 42);

		self::assertSame(['1', '2'], $this->templateIds($provider->getCustomTemplates(self::DOCUMENT_MIME)));
	}

	/** @test */
	public function userTemplatesAreServedWhenTheUserHasNoTemplateFolder(): void {
		$provider = $this->buildProvider('Templates/', 42, new NotFoundException());

		self::assertSame(['1', '2'], $this->templateIds($provider->getCustomTemplates(self::DOCUMENT_MIME)));
	}

	/** @test */
	public function userTemplatesAreServedWithoutAUser(): void {
		$provider = $this->buildProvider('Templates/', 42, 42, null);

		self::assertSame(['1', '2'], $this->templateIds($provider->getCustomTemplates(self::DOCUMENT_MIME)));
	}

	/** @test */
	public function unsupportedMimetypesHaveNoTemplates(): void {
		$provider = $this->buildProvider('Templates/', 42, 42);

		self::assertSame([], $provider->getCustomTemplates('text/plain'));
	}

	private function buildProvider(
		string $serverTemplatePath,
		int|Throwable|null $serverFolderId,
		int|Throwable $userTemplateDirId,
		?string $userId = self::USER_ID,
	): CollaboraTemplateProvider {
		$systemTemplate = $this->createMock(File::class);
		$systemTemplate->method('getId')->willReturn(1);
		$userTemplate = $this->createMock(File::class);
		$userTemplate->method('getId')->willReturn(2);

		$templateManager = $this->createMock(TemplateManager::class);
		$this->resolveFolder($templateManager->method('getUserTemplateDir'), $userTemplateDirId);
		$templateManager->method('getSystem')->with('document')->willReturn([$systemTemplate]);
		$templateManager->method('getAll')->with('document')->willReturn([$systemTemplate, $userTemplate]);

		$serverTemplateManager = $this->createMock(ITemplateManager::class);
		$serverTemplateManager->method('getTemplatePath')->willReturn($serverTemplatePath);

		$userFolder = $this->createMock(IUserFolder::class);
		if ($serverFolderId === null) {
			$userFolder->expects(self::never())->method('get');
		} else {
			$this->resolveFolder($userFolder->method('get')->with($serverTemplatePath), $serverFolderId);
		}
		$rootFolder = $this->createMock(IRootFolder::class);
		$rootFolder->method('getUserFolder')->with(self::USER_ID)->willReturn($userFolder);

		return new CollaboraTemplateProvider(
			$templateManager,
			$this->createMock(IURLGenerator::class),
			$serverTemplateManager,
			$rootFolder,
			$userId,
		);
	}

	private function resolveFolder(InvocationMocker $call, int|Throwable $folderId): void {
		if ($folderId instanceof Throwable) {
			$call->willThrowException($folderId);
			return;
		}

		$folder = $this->createMock(Folder::class);
		$folder->method('getId')->willReturn($folderId);
		$call->willReturn($folder);
	}

	/**
	 * @param Template[] $templates
	 * @return string[]
	 */
	private function templateIds(array $templates): array {
		return array_values(array_map(
			static fn (Template $template): string => $template->jsonSerialize()['templateId'],
			$templates,
		));
	}
}
