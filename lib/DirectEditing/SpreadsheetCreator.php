<?php
/**
 * @copyright Copyright (c) 2022 Raul Ferreira Fuentes <raul@nextcloud.com>
 *
 * @author Raul Ferreira Fuentes <raul@nextcloud.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Richdocuments\DirectEditing;

use OCA\Richdocuments\AppInfo\Application;
use OCP\DirectEditing\ACreateEmpty;
use OCP\IConfig;
use OCP\IL10N;

class SpreadsheetCreator extends ACreateEmpty {

	/** @var IL10N */
	private $l10n;
	/** @var IConfig */
	private $config;

	public function __construct(IL10N $l10n, IConfig $config) {
		$this->l10n = $l10n;
		$this->config = $config;
	}

	public function getId(): string {
		return 'richdocuments_spreadsheet';
	}

	public function getName(): string {
		return $this->l10n->t('spreadsheet');
	}

	public function getExtension(): string {
		$useOoxml = $this->config->getAppValue(Application::APPNAME, 'doc_format', '') === 'ooxml';
		return $useOoxml ? 'xlsx' : 'ods';
	}

	public function getMimetype(): string {
		return 'application/vnd.oasis.opendocument.spreadsheet';
	}
}
