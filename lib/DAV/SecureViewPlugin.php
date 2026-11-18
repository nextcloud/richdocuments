<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\DAV;

use OCA\DAV\Connector\Sabre\FilesPlugin;
use OCA\DAV\Connector\Sabre\Node;
use OCA\Richdocuments\Middleware\WOPIMiddleware;
use OCA\Richdocuments\Service\SecureViewService;
use OCA\Richdocuments\Storage\SecureViewWrapper;
use OCP\Files\Folder;
use OCP\Files\ForbiddenException;
use OCP\Files\NotFoundException;
use OCP\Files\StorageNotAvailableException;
use OCP\IAppConfig;
use Psr\Log\LoggerInterface;
use Sabre\DAV\Exception\Forbidden;
use Sabre\DAV\INode;
use Sabre\DAV\PropFind;
use Sabre\DAV\Server;
use Sabre\DAV\ServerPlugin;

class SecureViewPlugin extends ServerPlugin {
	private ?Server $server = null;

	public function __construct(
		protected WOPIMiddleware $wopiMiddleware,
		protected IAppConfig $appConfig,
		protected SecureViewService $secureViewService,
		protected LoggerInterface $logger,
	) {
	}

	public function initialize(Server $server) {
		if (!$this->secureViewService->isEnabled()) {
			return;
		}
		$this->server = $server;
		$server->on('propFind', $this->handleGetProperties(...));
		$server->on('beforeCopy', fn (string $source, string $target) => $this->checkTarget($source, $target, false));
		$server->on('beforeMove', fn (string $source, string $target) => $this->checkTarget($source, $target, true));
	}

	/**
	 * @throws Forbidden
	 */
	private function checkTarget(string $source, string $target, bool $isMove): void {
		[$sourceParentPath] = \Sabre\Uri\split($source);
		[$targetParentPath] = \Sabre\Uri\split($target);
		if ($isMove && $sourceParentPath === $targetParentPath) {
			return;
		}

		$sourceNode = $this->server->tree->getNodeForPath($source);
		$targetParent = $this->server->tree->getNodeForPath($targetParentPath ?? '');
		if (!$sourceNode instanceof Node || !$targetParent instanceof Node || !$targetParent->getNode() instanceof Folder) {
			return;
		}

		try {
			$allowed = $this->secureViewService->staysSecuredIn($sourceNode->getNode(), $targetParent->getNode(), $isMove);
		} catch (\Throwable $e) {
			$this->logger->warning('Could not check secure view for the target, denying it', ['exception' => $e]);
			$allowed = false;
		}

		if (!$allowed) {
			throw new Forbidden('The target does not offer the secure view the source requires');
		}
	}

	private function handleGetProperties(PropFind $propFind, INode $node): void {
		if (!$node instanceof Node) {
			return;
		}

		$requestedProperties = $propFind->getRequestedProperties();
		if (!in_array(FilesPlugin::SHARE_HIDE_DOWNLOAD_PROPERTYNAME, $requestedProperties, true)) {
			return;
		}
		$currentValue = $propFind->get(FilesPlugin::SHARE_HIDE_DOWNLOAD_PROPERTYNAME);
		if ($currentValue === 'true') {
			// We won't unhide, hence can return early
			return;
		}

		if (!$this->isDownloadable($node->getNode())) {
			// FIXME: coordinate with Files how a better solution looks like. Maybe by setting it only to 'true' by any provider? To avoid overwriting. Or throwing a dedicated event in just this case?
			$propFind->set(FilesPlugin::SHARE_HIDE_DOWNLOAD_PROPERTYNAME, 'true');
			// avoid potential race condition with FilesPlugin that may set it to "false"
			$propFind->handle(FilesPlugin::SHARE_HIDE_DOWNLOAD_PROPERTYNAME, 'true');
		}
	}

	private function isDownloadable(\OCP\Files\Node $node): bool {
		$storage = $node->getStorage();
		if ($this->wopiMiddleware->isWOPIRequest()
			|| $storage === null
			|| !$storage->instanceOfStorage(SecureViewWrapper::class)
		) {
			return true;
		}

		try {
			return !$this->secureViewService->shouldSecure($node->getInternalPath(), $storage);
		} catch (StorageNotAvailableException|ForbiddenException|NotFoundException $e) {
			// Exceptions cannot be nicely inferred.
			return false;
		} catch (\Throwable $e) {
			$this->logger->warning('SecureViewPlugin caught an exception that likely is ignorable. Still preventing download.',
				['exception' => $e,]
			);
			return false;
		}
	}
}
