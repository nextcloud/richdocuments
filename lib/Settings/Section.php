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
	public function __construct(
		private IURLGenerator $url,
		private CapabilitiesService $capabilitites,
		private IL10N $l10n,
	) {
	}

	#[\Override]
	public function getID() {
		return 'richdocuments';
	}

	#[\Override]
	public function getName() {
		if ($this->capabilitites->hasNextcloudBranding()) {
			return $this->l10n->t('Office');
		}
		return $this->capabilitites->getProductName();
	}

	#[\Override]
	public function getPriority() {
		return 75;
	}

	#[\Override]
	public function getIcon() {
		return $this->url->imagePath('richdocuments', 'app-dark.svg');
	}
}
