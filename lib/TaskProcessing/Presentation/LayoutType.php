<?php
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\TaskProcessing\Presentation;

enum LayoutType: string {
	case Title = 'AUTOLAYOUT_TITLE';
	case TitleContent = 'AUTOLAYOUT_TITLE_CONTENT';
	case Title2Content = 'AUTOLAYOUT_TITLE_2CONTENT';
}
