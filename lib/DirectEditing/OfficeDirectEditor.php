<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\DirectEditing;

use OCA\Richdocuments\AppInfo\Application;
use OCA\Richdocuments\Capabilities;
use OCA\Richdocuments\Service\CapabilitiesService;
use OCA\Richdocuments\Service\DirectEditingViewService;
use OCP\AppFramework\Http\NotFoundResponse;
use OCP\AppFramework\Http\Response;
use OCP\DirectEditing\IEditor;
use OCP\DirectEditing\IToken;
use OCP\Files\NotFoundException;
use Psr\Log\LoggerInterface;

class OfficeDirectEditor implements IEditor {

	public function __construct(
		private CapabilitiesService $capabilitiesService,
		private Capabilities $capabilities,
		private CreateDocument $createDocument,
		private CreateSpreadsheet $createSpreadsheet,
		private CreatePresentation $createPresentation,
		private CreateDrawing $createDrawing,
		private DirectEditingViewService $viewService,
		private LoggerInterface $logger,
	) {
	}

	#[\Override]
	public function getId(): string {
		return Application::APPNAME;
	}

	#[\Override]
	public function getName(): string {
		return $this->capabilitiesService->getProductName();
	}

	#[\Override]
	public function getMimetypes(): array {
		return $this->capabilities->getDefaultMimetypes();
	}

	#[\Override]
	public function getMimetypesOptional(): array {
		return $this->capabilities->getOptionalMimetypes();
	}

	#[\Override]
	public function getCreators(): array {
		return [
			$this->createDocument,
			$this->createSpreadsheet,
			$this->createPresentation,
			$this->createDrawing,
		];
	}

	#[\Override]
	public function isSecure(): bool {
		return true;
	}

	#[\Override]
	public function open(IToken $token): Response {
		$token->useTokenScope();

		try {
			$file = $token->getFile();
			return $this->viewService->render($file, $token->getUser());
		} catch (NotFoundException $e) {
			$this->logger->error('Failed to open direct editing token: file not found', ['exception' => $e]);
			return new NotFoundResponse();
		} catch (\Throwable $e) {
			$this->logger->error('Failed to open direct editing token', ['exception' => $e]);
			return new NotFoundResponse();
		}
	}
}
