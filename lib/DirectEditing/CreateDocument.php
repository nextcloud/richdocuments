<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\DirectEditing;

class CreateDocument extends AbstractOfficeCreator {

	#[\Override]
	public function getName(): string {
		return $this->l10n->t('New document');
	}

	#[\Override]
	protected function getTemplateType(): string {
		return 'document';
	}

	#[\Override]
	protected function getOdfExtension(): string {
		return 'odt';
	}

	#[\Override]
	protected function getOdfMimetype(): string {
		return 'application/vnd.oasis.opendocument.text';
	}

	#[\Override]
	protected function getOoxmlExtension(): string {
		return 'docx';
	}

	#[\Override]
	protected function getOoxmlMimetype(): string {
		return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
	}
}
