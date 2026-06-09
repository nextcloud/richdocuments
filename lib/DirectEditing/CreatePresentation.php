<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\DirectEditing;

class CreatePresentation extends AbstractOfficeCreator {

	#[\Override]
	public function getName(): string {
		return $this->l10n->t('New presentation');
	}

	#[\Override]
	protected function getTemplateType(): string {
		return 'presentation';
	}

	#[\Override]
	protected function getOdfExtension(): string {
		return 'odp';
	}

	#[\Override]
	protected function getOdfMimetype(): string {
		return 'application/vnd.oasis.opendocument.presentation';
	}

	#[\Override]
	protected function getOoxmlExtension(): string {
		return 'pptx';
	}

	#[\Override]
	protected function getOoxmlMimetype(): string {
		return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
	}
}
