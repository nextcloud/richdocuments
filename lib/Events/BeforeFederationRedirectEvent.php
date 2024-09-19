<?php
/**
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Richdocuments\Events;

use OCP\EventDispatcher\Event;
use OCP\Files\Node;

class BeforeFederationRedirectEvent extends Event {
	/** @var string|null */
	private $redirectUrl = null;

	/**
	 * @param Node $node
	 * @param string $relativePath
	 * @param string $remote
	 */
	public function __construct(
		private $node,
		private $relativePath,
		private $remote,
	) {
		parent::__construct();
	}

	public function getRelativePath() {
		return $this->relativePath;
	}

	public function getNode() {
		return $this->node;
	}

	public function getRemote() {
		return $this->remote;
	}

	public function setRedirectUrl($redirectUrl) {
		$this->redirectUrl = $redirectUrl;
	}

	public function getRedirectUrl() {
		return $this->redirectUrl;
	}
}
