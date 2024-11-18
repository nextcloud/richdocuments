<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Events;

use OCP\Files\Node;

class DocumentOpenedEvent extends \OCP\EventDispatcher\Event {
	private ?string $userId;
	private Node $node;

	public function __construct(?string $userId, Node $node) {
		$this->userId = $userId;
		$this->node = $node;
	}

	public function getUserId(): ?string {
		return $this->userId;
	}

	public function getNode(): Node {
		return $this->node;
	}
}
