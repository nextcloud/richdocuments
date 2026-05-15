<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\DirectEditing;

class CreateSpreadsheet extends AbstractOfficeCreator {

	#[\Override]
	public function getName(): string {
		return $this->l10n->t('New spreadsheet');
	}

	#[\Override]
	protected function getTemplateType(): string {
		return 'spreadsheet';
	}

	#[\Override]
	protected function getOdfExtension(): string {
		return 'ods';
	}

	#[\Override]
	protected function getOdfMimetype(): string {
		return 'application/vnd.oasis.opendocument.spreadsheet';
	}

	#[\Override]
	protected function getOoxmlExtension(): string {
		return 'xlsx';
	}

	#[\Override]
	protected function getOoxmlMimetype(): string {
		return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
	}
}
