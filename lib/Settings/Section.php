<?php
/**
 * SPDX-FileCopyrightText: 2016 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Settings;

use OCA\Richdocuments\Service\CapabilitiesService;
use OCP\IL10N;
use OCP\IURLGenerator;
use OCP\Settings\IIconSection;

class Section implements IIconSection {
	/** @var IURLGenerator */
	private $url;
	/** @var CapabilitiesService */
	private $capabilitites;
	/** @var IL10N */
	private $l10n;

	public function __construct(IURLGenerator $url, CapabilitiesService $capabilities, IL10N $l10n) {
		$this->url = $url;
		$this->capabilitites = $capabilities;
		$this->l10n = $l10n;
	}

	public function getID() {
		return 'richdocuments';
	}

	public function getName() {
		if ($this->capabilitites->hasNextcloudBranding()) {
			return $this->l10n->t('Office');
		}
		return $this->capabilitites->getProductName();
	}

	public function getPriority() {
		return 75;
	}

	public function getIcon() {
		return $this->url->imagePath('richdocuments', 'app-dark.svg');
	}
}
