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
use OCP\Files\ForbiddenException;
use OCP\Files\NotFoundException;
use OCP\Files\StorageNotAvailableException;
use OCP\IAppConfig;
use Psr\Log\LoggerInterface;
use Sabre\DAV\INode;
use Sabre\DAV\PropFind;
use Sabre\DAV\Server;
use Sabre\DAV\ServerPlugin;

class SecureViewPlugin extends ServerPlugin {
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
		$server->on('propFind', $this->handleGetProperties(...));
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
