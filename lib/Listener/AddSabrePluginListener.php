<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Richdocuments\Listener;

use OCA\DAV\Events\SabrePluginAddEvent;
use OCA\Richdocuments\DAV\SecureViewPlugin;
use OCP\BeforeSabrePubliclyLoadedEvent;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use Psr\Container\ContainerInterface;

/** @template-implements IEventListener<SabrePluginAddEvent|BeforeSabrePubliclyLoadedEvent> */
class AddSabrePluginListener implements IEventListener {

	public function __construct(
		protected ContainerInterface $server,
	) {
	}

	public function handle(Event $event): void {
		if (
			!$event instanceof SabrePluginAddEvent
			&& !$event instanceof BeforeSabrePubliclyLoadedEvent
		) {
			return;
		}
		$davServer = $event->getServer();
		$davServer->addPlugin($this->server->get(SecureViewPlugin::class));
	}
}
