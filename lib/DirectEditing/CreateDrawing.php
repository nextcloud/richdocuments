<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\DirectEditing;

class CreateDrawing extends AbstractOfficeCreator {

	#[\Override]
	public function getName(): string {
		return $this->l10n->t('New diagram');
	}

	#[\Override]
	protected function getTemplateType(): string {
		return 'drawing';
	}

	#[\Override]
	protected function getOdfExtension(): string {
		return 'odg';
	}

	#[\Override]
	protected function getOdfMimetype(): string {
		return 'application/vnd.oasis.opendocument.graphics';
	}

	#[\Override]
	protected function getOoxmlExtension(): string {
		return 'odg';
	}

	#[\Override]
	protected function getOoxmlMimetype(): string {
		return 'application/vnd.oasis.opendocument.graphics';
	}
}
